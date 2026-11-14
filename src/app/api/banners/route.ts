import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "banners.json");

function getBanners() {
  if (fs.existsSync(DATA_PATH)) {
    try {
      const raw = fs.readFileSync(DATA_PATH, "utf-8");
      return JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
  }
  return [];
}

function saveBanners(banners: unknown) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(banners, null, 2), "utf-8");
}

export async function GET() {
  const banners = getBanners();
  return NextResponse.json({ success: true, banners });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const banners = body.banners || [];
    saveBanners(banners);
    return NextResponse.json({ success: true, banners });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
