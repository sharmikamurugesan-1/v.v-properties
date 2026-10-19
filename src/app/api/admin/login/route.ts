import { NextRequest, NextResponse } from "next/server";
import {
  getAdminSecrets,
  createSessionToken,
  verifyAdminPassword,
  SESSION_COOKIE_NAME,
  SESSION_DURATION_HOURS,
} from "@/lib/auth";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    // Rate-limit login: 5 attempts per 10 minutes per IP
    const rateLimit = checkRateLimit(`login_${ip}`, 5, 10);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Please wait ${rateLimit.resetInMinutes} minute(s) before trying again.`,
        },
        { status: 429 }
      );
    }

    const { configured, password: correctPassword, secret } = getAdminSecrets();

    // Fail closed if secrets are missing (Task 3 requirement)
    if (!configured) {
      return NextResponse.json(
        {
          error: "Admin credentials are not configured on this server. Please set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in your environment variables.",
          setupRequired: true,
        },
        { status: 503 }
      );
    }

    const body = await req.json();
    const inputPassword = body?.password || "";

    const isMatch = verifyAdminPassword(inputPassword, correctPassword);

    if (!isMatch) {
      return NextResponse.json(
        {
          error: `Invalid credentials. ${rateLimit.remaining} attempt(s) remaining.`,
        },
        { status: 401 }
      );
    }

    // Reset rate-limit upon successful login
    resetRateLimit(`login_${ip}`);

    // Generate signed HMAC session token
    const token = createSessionToken(secret);
    const isProduction = process.env.NODE_ENV === "production";

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
    });

    // 8-hour HttpOnly, SameSite=Lax, Secure in production
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: isProduction,
      maxAge: SESSION_DURATION_HOURS * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
