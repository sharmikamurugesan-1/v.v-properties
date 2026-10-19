import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { z } from "zod";

const updateLeadSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "contacted", "site_visit", "converted", "archived"]).optional(),
  adminNotes: z.string().max(1000).optional(),
});

export async function GET() {
  try {
    const leads = await store.getLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const result = updateLeadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid updates", details: result.error.format() }, { status: 400 });
    }

    const { id, ...updates } = result.data;
    const updated = await store.updateLead(id, updates);

    if (!updated) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
    }

    const deleted = await store.deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Lead removed" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
