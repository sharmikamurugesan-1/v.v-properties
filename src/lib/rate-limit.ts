import fs from "fs";
import path from "path";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const DATA_DIR = path.join(process.cwd(), "data");
const RATE_LIMIT_FILE = path.join(DATA_DIR, "rate-limits.json");

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readRecords(): Record<string, RateLimitRecord> {
  try {
    ensureDirectory();
    if (fs.existsSync(RATE_LIMIT_FILE)) {
      const content = fs.readFileSync(RATE_LIMIT_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch {
    // fallback
  }
  return {};
}

function writeRecords(records: Record<string, RateLimitRecord>) {
  try {
    ensureDirectory();
    const tempFile = `${RATE_LIMIT_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(records, null, 2), "utf-8");
    fs.renameSync(tempFile, RATE_LIMIT_FILE);
  } catch {
    // fallback
  }
}

/**
 * Checks if the given key (IP) has exceeded max attempts.
 * Returns { allowed: boolean, remaining: number, resetInMinutes: number }
 */
export function checkRateLimit(
  key: string,
  maxAttempts = 5,
  windowMinutes = 10
): { allowed: boolean; remaining: number; resetInMinutes: number } {
  const records = readRecords();
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;

  const current = records[key];

  if (!current || now > current.resetAt) {
    // Window expired or new key
    records[key] = {
      count: 1,
      resetAt: now + windowMs,
    };
    writeRecords(records);
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetInMinutes: windowMinutes,
    };
  }

  if (current.count >= maxAttempts) {
    const remainingMs = Math.max(0, current.resetAt - now);
    const resetInMinutes = Math.ceil(remainingMs / (60 * 1000));
    return {
      allowed: false,
      remaining: 0,
      resetInMinutes,
    };
  }

  current.count += 1;
  records[key] = current;
  writeRecords(records);

  const remainingMs = Math.max(0, current.resetAt - now);
  const resetInMinutes = Math.ceil(remainingMs / (60 * 1000));

  return {
    allowed: true,
    remaining: maxAttempts - current.count,
    resetInMinutes,
  };
}

export function resetRateLimit(key: string): void {
  const records = readRecords();
  if (records[key]) {
    delete records[key];
    writeRecords(records);
  }
}
