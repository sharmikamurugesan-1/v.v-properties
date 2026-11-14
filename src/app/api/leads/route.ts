import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { store } from "@/lib/store";
import { checkRateLimit } from "@/lib/rate-limit";

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

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    // Durable rate limit check
    const rateLimit = checkRateLimit(`lead_${ip}`, 5, 10);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many submissions. Please wait ${rateLimit.resetInMinutes} minute(s) before trying again.`,
        },
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

    const data = result.data;

    // 1. Durably persist lead before reporting success (Task 3 requirement)
    let savedLead;
    try {
      savedLead = await store.addLead({
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email?.trim() || undefined,
        project: data.project,
        budget: data.budget,
        visitDate: data.visitDate,
        notes: data.notes?.trim() || undefined,
        source: "Website Direct Form",
        ip,
      });
    } catch (storeError) {
      console.error("[LEAD STORAGE FAILURE]", storeError);
      return NextResponse.json(
        { error: "Failed to persist lead record. Please retry or contact us directly on WhatsApp." },
        { status: 500 }
      );
    }

    // 2. Safe, non-PII operational logging
    console.log(`[LEAD RECEIVED] ID: ${savedLead.id} | Project: ${savedLead.project}`);

    // 3. Optional webhook dispatch
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: savedLead.id,
            name: savedLead.name,
            phone: savedLead.phone,
            email: savedLead.email,
            project: savedLead.project,
            budget: savedLead.budget,
            visitDate: savedLead.visitDate,
            notes: savedLead.notes,
            timestamp: savedLead.createdAt,
          }),
        });
      } catch (webhookErr) {
        // Log webhook failure without failing the lead since it is safely stored in store
        console.error("[LEAD WEBHOOK ERROR]", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      leadId: savedLead.id,
      message: "Enquiry received. A representative will contact you shortly.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET() {
  const fs = await import('fs');
  const path = await import('path');
  const leadsFile = path.join(process.cwd(), 'data', 'leads.json');
  if (fs.existsSync(leadsFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'));
      return NextResponse.json({ success: true, leads: data });
    } catch (e) {
      console.error(e);
    }
  }
  const leads = await store.getLeads();
  return NextResponse.json({ success: true, leads });
}
