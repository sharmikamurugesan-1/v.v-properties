# V.V PROPERTIES — PRODUCTION DEPLOYMENT & OPERATIONS MANUAL

## 1. Quick Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local
# Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in .env.local

# 3. Verification check
npm run check:content
npx tsc --noEmit
npm run lint

# 4. Production build & start
npm run build
npm run start
```

---

## 2. Environment Variables

Configure the following environment variables in your deployment dashboard (e.g. Vercel, Railway, Render, Docker):

| Variable | Required | Description | Example / Note |
|---|---|---|---|
| `ADMIN_PASSWORD` | **Yes** | Master password for `/admin` portal login | High-entropy passphrase (e.g. 16+ chars) |
| `ADMIN_SESSION_SECRET` | **Yes** | HMAC-SHA256 signature key for 8-hour admin session cookies | 32+ character random hex or base64 string |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | Client direct WhatsApp hotline | Digits only with country code (e.g. `919876543210`) |
| `LEAD_WEBHOOK_URL` | Optional | Outbound webhook for real-time lead capture | CRM / Zapier / Make / Zoho endpoint |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical production URL for SEO & OpenGraph | Default: `https://vvpropertiescbe.com` |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 Measurement ID | Gated behind user cookie consent |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | Meta Pixel ID | Gated behind user cookie consent |

---

## 3. Persistence & Hosting Architecture

### Local & Node.js Server / Docker / VPS Deployment
- Out of the box, V.V Properties utilizes an **atomic JSON file adapter** located in `src/lib/store-json.ts` that writes directly to `/data/leads.json`, `/data/settings.json`, `/data/plots.json`, and `/data/rate-limits.json`.
- Files are updated using unique temporary files and atomic rename operations (`fs.promises.rename`) to prevent corruption or partial writes.
- For Docker or persistent VM deployments (e.g. AWS EC2, DigitalOcean, Railway with persistent volume), mount `/data` as a persistent volume.

### Ephemeral / Serverless Deployment (Vercel, AWS Lambda)
- **Important**: Ephemeral serverless containers possess a read-only or temporary ephemeral filesystem (`/tmp`) that resets between cold starts.
- For production hosting on purely serverless providers (e.g. Vercel standard tier without external database), replace `JsonStoreAdapter` in `src/lib/store.ts` with a cloud database adapter implementing `IStoreAdapter`:
  - **Option A (Supabase / PostgreSQL)**: Connect via `@supabase/supabase-js` or Prisma.
  - **Option B (Firestore / MongoDB)**: Store documents in collections matching the `Lead`, `SiteSettings`, and `PlotRecord` schemas.
  - **Shared Rate Limiting**: For distributed serverless rate limiting across edge instances, swap `src/lib/rate-limit.ts` with an Upstash Redis or Redis adapter (`@upstash/ratelimit`).

---

## 4. Health Checks & Smoke Testing

- **Health Endpoint**: `GET /api/health`
  - Returns HTTP 200:
    ```json
    {
      "status": "ok",
      "uptime": 124.5,
      "timestamp": "2026-10-19T06:40:00.000Z",
      "service": "vv-properties-api"
    }
    ```
  - Zero PII, secrets, or internal stack traces exposed.

### Production Smoke Test Protocol
1. **Homepage Load**: Open `/` and verify hero Ken-Burns photography, 4-stage isometric SVG construction time-lapse, and footer.
2. **Inquiry Submission**: Submit a test inquiry on `/contact` or the homepage form. Check response code HTTP 200 and lead ID returned.
3. **Admin Verification**:
   - Navigate to `/admin/login`.
   - Enter invalid password &rarr; Verify HTTP 401 with remaining attempts.
   - Enter correct password &rarr; Verify redirect to `/admin` dashboard.
   - Check that the test lead is displayed in the pipeline table.
   - Click "Secure CSV Export" &rarr; Verify sanitized CSV downloads without formula injection.
   - Update a DTCP/RERA number or plot availability &rarr; Verify changes persist and public cache is revalidated.
4. **Logout**: Click "Sign Out" &rarr; Verify session cookie is cleared and redirected back to `/admin/login`.

---

## 5. Rollback Procedures

If an unexpected production defect occurs:
```bash
# 1. Inspect recent git revisions
git log --oneline -5

# 2. Revert to previous verified release tag/commit
git checkout <previous-commit-hash>

# 3. Clean and rebuild
rm -rf .next
npm run build
npm run start
```
On Vercel / Cloud providers, navigate to Deployments &rarr; select the previous successful deployment &rarr; click **Instant Rollback**.
