import crypto from "crypto";

const SESSION_COOKIE_NAME = "vv_admin_session";
const SESSION_DURATION_HOURS = 8;

export function getAdminSecrets() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!password || !secret) {
    return {
      configured: false,
      password: "",
      secret: "",
    };
  }

  return {
    configured: true,
    password,
    secret,
  };
}

export function createSessionToken(secret: string): string {
  const expiresAt = Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000;
  const payload = `admin:${expiresAt}`;
  const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  // token: payload.signature
  const token = Buffer.from(`${payload}.${hmac}`).toString("base64url");
  return token;
}

export function verifySessionToken(token: string, secret: string): boolean {
  try {
    if (!token || !secret) return false;
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const lastDotIndex = decoded.lastIndexOf(".");
    if (lastDotIndex === -1) return false;

    const payload = decoded.substring(0, lastDotIndex);
    const signature = decoded.substring(lastDotIndex + 1);

    const expectedHmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");

    // Timing-safe comparison to prevent timing side-channel attacks
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedHmac);

    if (sigBuffer.length !== expectedBuffer.length) {
      return false;
    }

    if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return false;
    }

    // Check expiration
    const parts = payload.split(":");
    if (parts.length !== 2) return false;
    const expiresAt = parseInt(parts[1], 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function verifyAdminPassword(inputPassword: string, correctPassword: string): boolean {
  if (!inputPassword || !correctPassword) return false;
  const inputBuffer = Buffer.from(inputPassword);
  const correctBuffer = Buffer.from(correctPassword);

  if (inputBuffer.length !== correctBuffer.length) {
    // Constant-time execution even when lengths differ
    crypto.timingSafeEqual(inputBuffer, inputBuffer);
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, correctBuffer);
}

export { SESSION_COOKIE_NAME, SESSION_DURATION_HOURS };
