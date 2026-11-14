import http.server
import socketserver
import json
import os
import urllib.parse
import mimetypes
import uuid
import base64
import datetime

PORT = 3000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
PUBLIC_UPLOADS = os.path.join(BASE_DIR, 'public', 'uploads')
UPLOADS_DIR = os.path.join(BASE_DIR, 'uploads')

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(os.path.join(PUBLIC_UPLOADS, 'properties'), exist_ok=True)
os.makedirs(os.path.join(PUBLIC_UPLOADS, 'avatars'), exist_ok=True)
os.makedirs(os.path.join(UPLOADS_DIR, 'properties'), exist_ok=True)
os.makedirs(os.path.join(UPLOADS_DIR, 'avatars'), exist_ok=True)

def read_json(filename, default):
    path = os.path.join(DATA_DIR, filename)
    if os.path.exists(path):
        try:
            with open(path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error reading {filename}: {e}")
    return default

def write_json(filename, data):
    path = os.path.join(DATA_DIR, filename)
    try:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error writing {filename}: {e}")

class VVPropertiesHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, data, status=200):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def parse_body(self):
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length > 0:
            raw = self.rfile.read(content_length).decode('utf-8')
            try:
                return json.loads(raw)
            except Exception:
                return {"raw": raw}
        return {}

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        # 1. Properties API
        if path == '/api/properties':
            props = read_json('properties.json', [])
            return self.send_json({"success": True, "properties": props})

        # 2. Leads / Enquiries API
        if path == '/api/leads':
            leads = read_json('leads.json', [])
            return self.send_json({"success": True, "leads": leads})

        # 3. Banners API
        if path == '/api/banners':
            banners = read_json('banners.json', [])
            return self.send_json({"success": True, "banners": banners})

        # 4. Activity Logs API
        if path == '/api/activity-logs':
            logs = read_json('activity_logs.json', [])
            return self.send_json({"success": True, "logs": logs})

        # 5. Admin Profile API
        if path == '/api/admin/profile':
            admin = read_json('admin_profile.json', {})
            return self.send_json({"success": True, "admin": admin})

        # 6. Website Traffic Analytics API
        if path == '/api/analytics/traffic':
            range_val = query.get('range', ['1W'])[0].upper()
            traffic_all = read_json('traffic.json', [])
            if not traffic_all:
                return self.send_json({"success": True, "range": range_val, "points": [], "labels": [], "startDate": "", "endDate": ""})

            # Calculate start and end dates based on ending at 14/11/2026 (or last date)
            end_date = datetime.date(2026, 11, 14)
            if range_val == '1W':
                start_date = end_date - datetime.timedelta(days=7)
            elif range_val == '1M':
                start_date = end_date - datetime.timedelta(days=30)
            elif range_val == '3M':
                start_date = end_date - datetime.timedelta(days=90)
            elif range_val == '6M':
                start_date = end_date - datetime.timedelta(days=180)
            elif range_val == '1Y':
                start_date = end_date - datetime.timedelta(days=365)
            elif range_val == 'MAX':
                start_date = datetime.date(2025, 1, 1)
            else:
                start_date = end_date - datetime.timedelta(days=7)

            # Filter records in range
            start_str = start_date.strftime('%Y-%m-%d')
            end_str = end_date.strftime('%Y-%m-%d')
            filtered = [t for t in traffic_all if start_str <= t['date'] <= end_str]

            if not filtered:
                filtered = traffic_all[-7:]

            # Pick evenly distributed sample points (13 data points for smooth line curve)
            n_points = min(13, len(filtered))
            step = (len(filtered) - 1) / max(1, (n_points - 1))
            sampled = [filtered[int(round(i * step))] for i in range(n_points)]
            pts = [s['visits'] for s in sampled]

            # Generate EXACTLY FIVE calendar date labels evenly distributed
            label_dates = []
            for k in range(5):
                idx = int(round(k * (len(filtered) - 1) / 4.0))
                rec = filtered[idx]
                d_obj = datetime.datetime.strptime(rec['date'], '%Y-%m-%d').date()
                label_dates.append(d_obj.strftime('%d/%m/%Y'))

            start_display = start_date.strftime('%d/%m/%Y')
            end_display = end_date.strftime('%d/%m/%Y')

            return self.send_json({
                "success": True,
                "range": range_val,
                "startDate": start_display,
                "endDate": end_display,
                "displayRange": f"{start_display} – {end_display}",
                "pts": pts,
                "labels": label_dates,
                "totalVisits": sum(t['visits'] for t in filtered)
            })

        # Static file handling fallback
        # If accessing /uploads/..., resolve from public/uploads or uploads
        if path.startswith('/uploads/'):
            subpath = path[len('/uploads/'):].replace('/', os.sep)
            pub_path = os.path.join(PUBLIC_UPLOADS, subpath)
            if os.path.exists(pub_path) and os.path.isfile(pub_path):
                return self.serve_file(pub_path)
            loc_path = os.path.join(UPLOADS_DIR, subpath)
            if os.path.exists(loc_path) and os.path.isfile(loc_path):
                return self.serve_file(loc_path)

        # Default static file handling
        return super().do_GET()

    def serve_file(self, file_path):
        mime_type, _ = mimetypes.guess_type(file_path)
        if not mime_type:
            mime_type = 'application/octet-stream'
        with open(file_path, 'rb') as f:
            content = f.read()
        self.send_response(200)
        self.send_header('Content-Type', mime_type)
        self.send_header('Content-Length', str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        body = self.parse_body()

        # 1. Upload API (Cover/Gallery images or Admin Avatar)
        if path == '/api/upload':
            upload_type = body.get('type', 'general') # 'cover', 'gallery', 'avatar'
            prop_id = body.get('propertyId', 'property_temp')
            filename = body.get('filename', f"img_{uuid.uuid4().hex[:8]}.png")
            base64_data = body.get('data', '')

            if ',' in base64_data:
                base64_data = base64_data.split(',', 1)[1]

            if not base64_data:
                return self.send_json({"error": "No image data received"}, 400)

            try:
                img_bytes = base64.b64decode(base64_data)
            except Exception as e:
                return self.send_json({"error": "Invalid base64 payload"}, 400)

            # Determine storage subfolder
            if upload_type == 'avatar':
                target_rel = os.path.join('avatars', f"admin_avatar_{uuid.uuid4().hex[:6]}.png")
            elif upload_type == 'cover':
                target_rel = os.path.join('properties', prop_id, 'cover', filename)
            elif upload_type == 'gallery':
                target_rel = os.path.join('properties', prop_id, 'gallery', filename)
            else:
                target_rel = os.path.join('properties', prop_id, filename)

            # Save in both public/uploads and uploads
            for root_dir in [PUBLIC_UPLOADS, UPLOADS_DIR]:
                full_dest = os.path.join(root_dir, target_rel)
                os.makedirs(os.path.dirname(full_dest), exist_ok=True)
                with open(full_dest, 'wb') as f:
                    f.write(img_bytes)

            url_path = '/uploads/' + target_rel.replace('\\', '/')
            return self.send_json({"success": True, "url": url_path})

        # 2. Add / Update Property
        if path == '/api/properties':
            props = read_json('properties.json', [])
            prop_data = body.get('property')
            if not prop_data:
                return self.send_json({"error": "Missing property payload"}, 400)

            # Check if updating or creating
            existing_idx = next((idx for idx, p in enumerate(props) if p.get('id') == prop_data.get('id')), -1)
            now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
            if existing_idx >= 0:
                prop_data['updatedAt'] = now_iso
                props[existing_idx] = prop_data
            else:
                if not prop_data.get('id'):
                    prop_data['id'] = f"prop_{len(props) + 1:03d}"
                prop_data['createdAt'] = now_iso
                prop_data['updatedAt'] = now_iso
                props.insert(0, prop_data)

            write_json('properties.json', props)
            return self.send_json({"success": True, "property": prop_data, "properties": props})

        # 3. Add Lead
        if path == '/api/leads':
            leads = read_json('leads.json', [])
            lead_data = body.get('lead')
            if lead_data:
                lead_data['id'] = len(leads) + 1
                leads.insert(0, lead_data)
                write_json('leads.json', leads)
            return self.send_json({"success": True, "leads": leads})

        # 4. Save Activity Log
        if path == '/api/activity-logs':
            logs = read_json('activity_logs.json', [])
            log_item = body.get('log')
            if log_item:
                if not log_item.get('id'):
                    log_item['id'] = f"log_{uuid.uuid4().hex[:8]}"
                if not log_item.get('timestamp'):
                    log_item['timestamp'] = int(datetime.datetime.now().timestamp() * 1000)
                logs.insert(0, log_item)
                # Keep up to 200 logs
                logs = logs[:200]
                write_json('activity_logs.json', logs)
            return self.send_json({"success": True, "logs": logs})

        # 5. Save Admin Profile
        if path == '/api/admin/profile':
            admin = read_json('admin_profile.json', {})
            updates = body.get('admin', {})
            admin.update(updates)
            write_json('admin_profile.json', admin)
            return self.send_json({"success": True, "admin": admin})

        # 6. Save Banners
        if path == '/api/banners':
            banners = body.get('banners', [])
            if banners:
                write_json('banners.json', banners)
            return self.send_json({"success": True, "banners": banners})

        return self.send_json({"error": "Unknown API endpoint"}, 404)

    def do_PUT(self):
        return self.do_POST()

    def do_PATCH(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        body = self.parse_body()

        if path.startswith('/api/leads'):
            lead_id = body.get('id')
            new_status = body.get('status')
            leads = read_json('leads.json', [])
            for l in leads:
                if str(l.get('id')) == str(lead_id) or l.get('name') == body.get('name'):
                    if new_status:
                        l['status'] = new_status
            write_json('leads.json', leads)
            return self.send_json({"success": True, "leads": leads})

        return self.send_json({"error": "Unsupported PATCH"}, 404)

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        if path.startswith('/api/properties'):
            prop_id = query.get('id', [''])[0]
            props = read_json('properties.json', [])
            props = [p for p in props if p.get('id') != prop_id]
            write_json('properties.json', props)
            return self.send_json({"success": True, "properties": props})

        return self.send_json({"error": "Unsupported DELETE"}, 404)

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), VVPropertiesHandler) as httpd:
        print(f"VV Properties Backend & Admin Server running at http://localhost:{PORT}")
        httpd.serve_forever()
