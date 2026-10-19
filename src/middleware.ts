import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "vv_admin_session";

async function verifyToken(token: string, secret: string): Promise<boolean> {
  try {
    if (!token || !secret) return false;

    // Decode base64url
    const base64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
    const decoded = atob(padded);

    const lastDot = decoded.lastIndexOf(".");
    if (lastDot === -1) return false;

    const payload = decoded.substring(0, lastDot);
    const signature = decoded.substring(lastDot + 1);

    const parts = payload.split(":");
    if (parts.length !== 2) return false;
    const expiresAt = parseInt(parts[1], 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

    // Web Crypto HMAC-SHA256
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      encoder.encode(payload)
    );

    const expectedHex = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return expectedHex === signature;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin and /api/admin routes
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next();
  }

  // Allow login routes
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  const isValid = secret && token ? await verifyToken(token, secret) : false;

  if (!isValid) {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
