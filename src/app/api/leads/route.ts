import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  phone: z.string().regex(/^[0-9+() -]{10,15}$/, "Valid phone number required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  project: z.string().min(1, "Please select a project"),
  budget: z.string().optional(),
  visitDate: z.string().optional(),
  notes: z.string().max(500).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted regarding this enquiry" }),
  }),
  honeypot: z.string().max(0, "Bot detected"),
  renderedAt: z.number().refine((time) => Date.now() - time >= 3000, {
    message: "Submission was too fast. Please take your time.",
  }),
});

// In-memory rate limiter for serverless instance
const ipRateLimit = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRateLimit.get(ip);
  if (!record || record.expiresAt < now) {
    ipRateLimit.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return false;
  }
  if (record.count >= 5) {
    return true;
  }
  record.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many enquiries sent from this address. Please try again in 10 minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const leadData = result.data;

    // Log in development / server stdout
    console.log("[LEAD RECEIVED]", {
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,
      project: leadData.project,
      budget: leadData.budget,
      visitDate: leadData.visitDate,
      ip,
      timestamp: new Date().toISOString(),
    });

    // Optional webhook forwarder
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...leadData, ip }),
        });
      } catch (err) {
        console.error("[LEAD WEBHOOK ERROR]", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry received. A representative will contact you shortly.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
