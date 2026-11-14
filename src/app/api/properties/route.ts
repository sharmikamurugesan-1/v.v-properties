import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "properties.json");

function getProperties() {
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

function saveProperties(props: unknown) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(props, null, 2), "utf-8");
}

export async function GET() {
  const properties = getProperties();
  return NextResponse.json({ success: true, properties });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const propData = body.property;
    if (!propData) {
      return NextResponse.json({ error: "Missing property data" }, { status: 400 });
    }
    const properties = getProperties();
    const existingIndex = properties.findIndex((p: { id?: string }) => p.id === propData.id);
    const nowIso = new Date().toISOString();

    if (existingIndex >= 0) {
      propData.updatedAt = nowIso;
      properties[existingIndex] = propData;
    } else {
      if (!propData.id) {
        propData.id = `prop_${String(properties.length + 1).padStart(3, "0")}`;
      }
      propData.createdAt = nowIso;
      propData.updatedAt = nowIso;
      properties.unshift(propData);
    }

    saveProperties(properties);
    return NextResponse.json({ success: true, property: propData, properties });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Property ID required" }, { status: 400 });
  }
  let properties = getProperties();
  properties = properties.filter((p: { id?: string }) => p.id !== id);
  saveProperties(properties);
  return NextResponse.json({ success: true, properties });
}
