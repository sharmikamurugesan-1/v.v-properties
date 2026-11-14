import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "admin_profile.json");

function getAdmin() {
  if (fs.existsSync(DATA_PATH)) {
    try {
      const raw = fs.readFileSync(DATA_PATH, "utf-8");
      return JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
  }
  return {};
}

function saveAdmin(admin: unknown) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(admin, null, 2), "utf-8");
}

export async function GET() {
  const admin = getAdmin();
  return NextResponse.json({ success: true, admin });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updates = body.admin || {};
    const admin = getAdmin();
    Object.assign(admin, updates);
    saveAdmin(admin);
    return NextResponse.json({ success: true, admin });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
