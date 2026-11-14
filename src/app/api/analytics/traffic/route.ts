import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "traffic.json");

function getTraffic() {
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rangeVal = (searchParams.get("range") || "1W").toUpperCase();
  const trafficAll = getTraffic();

  if (!trafficAll || trafficAll.length === 0) {
    return NextResponse.json({
      success: true,
      range: rangeVal,
      pts: [],
      labels: [],
      startDate: "",
      endDate: "",
      displayRange: "",
    });
  }

  // End date is fixed to current anchor date 2026-11-14
  const endDate = new Date(2026, 10, 14); // Nov is month index 10
  const startDate = new Date(endDate);

  if (rangeVal === "1W") {
    startDate.setDate(endDate.getDate() - 7);
  } else if (rangeVal === "1M") {
    startDate.setDate(endDate.getDate() - 30);
  } else if (rangeVal === "3M") {
    startDate.setDate(endDate.getDate() - 90);
  } else if (rangeVal === "6M") {
    startDate.setDate(endDate.getDate() - 180);
  } else if (rangeVal === "1Y") {
    startDate.setDate(endDate.getDate() - 365);
  } else if (rangeVal === "MAX") {
    startDate.setFullYear(2025, 0, 1);
  } else {
    startDate.setDate(endDate.getDate() - 7);
  }

  const startIso = startDate.toISOString().split("T")[0];
  const endIso = endDate.toISOString().split("T")[0];

  let filtered = trafficAll.filter(
    (t: { date: string }) => t.date >= startIso && t.date <= endIso
  );

  if (filtered.length === 0) {
    filtered = trafficAll.slice(-7);
  }

  const nPoints = Math.min(13, filtered.length);
  const step = (filtered.length - 1) / Math.max(1, nPoints - 1);
  const sampled = [];
  for (let i = 0; i < nPoints; i++) {
    const idx = Math.round(i * step);
    sampled.push(filtered[idx]);
  }
  const pts = sampled.map((s: { visits: number }) => s.visits);

  // EXACTLY 5 Calendar date labels evenly distributed (DD/MM/YYYY)
  const labels: string[] = [];
  for (let k = 0; k < 5; k++) {
    const idx = Math.round((k * (filtered.length - 1)) / 4.0);
    const rec = filtered[idx];
    const [y, m, d] = rec.date.split("-");
    labels.push(`${d}/${m}/${y}`);
  }

  const formatDateStr = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const startDisplay = formatDateStr(startDate);
  const endDisplay = formatDateStr(endDate);

  return NextResponse.json({
    success: true,
    range: rangeVal,
    startDate: startDisplay,
    endDate: endDisplay,
    displayRange: `${startDisplay} – ${endDisplay}`,
    pts,
    labels,
    totalVisits: filtered.reduce((acc: number, cur: { visits: number }) => acc + cur.visits, 0),
  });
}
