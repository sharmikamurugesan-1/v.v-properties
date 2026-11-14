import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const uploadType = body.type || "general";
    const propId = body.propertyId || "property_temp";
    const filename = body.filename || `img_${crypto.randomBytes(4).toString("hex")}.png`;
    let base64Data = body.data || "";

    if (base64Data.includes(",")) {
      base64Data = base64Data.split(",")[1];
    }

    if (!base64Data) {
      return NextResponse.json({ error: "No image data received" }, { status: 400 });
    }

    const buffer = Buffer.from(base64Data, "base64");

    let targetRel = "";
    if (uploadType === "avatar") {
      targetRel = path.join("avatars", `admin_avatar_${crypto.randomBytes(3).toString("hex")}.png`);
    } else if (uploadType === "cover") {
      targetRel = path.join("properties", propId, "cover", filename);
    } else if (uploadType === "gallery") {
      targetRel = path.join("properties", propId, "gallery", filename);
    } else {
      targetRel = path.join("properties", propId, filename);
    }

    const publicUploads = path.join(process.cwd(), "public", "uploads", targetRel);
    const localUploads = path.join(process.cwd(), "uploads", targetRel);

    for (const dest of [publicUploads, localUploads]) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, buffer);
    }

    const urlPath = `/uploads/${targetRel.replace(/\\/g, "/")}`;
    return NextResponse.json({ success: true, url: urlPath });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
