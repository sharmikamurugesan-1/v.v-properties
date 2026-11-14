import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "activity_logs.json");

function getLogs() {
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

function saveLogs(logs: unknown) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(logs, null, 2), "utf-8");
}

export async function GET() {
  const logs = getLogs();
  return NextResponse.json({ success: true, logs });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const logItem = body.log;
    if (!logItem) {
      return NextResponse.json({ error: "Missing log payload" }, { status: 400 });
    }
    const logs = getLogs();
    if (!logItem.id) {
      logItem.id = `log_${Date.now()}`;
    }
    if (!logItem.timestamp) {
      logItem.timestamp = Date.now();
    }
    logs.unshift(logItem);
    const trimmed = logs.slice(0, 200);
    saveLogs(trimmed);
    return NextResponse.json({ success: true, logs: trimmed });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
