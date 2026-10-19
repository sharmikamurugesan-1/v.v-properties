import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { store } from "@/lib/store";
import { z } from "zod";

const settingsSchema = z.object({
  company: z
    .object({
      phone: z.string().nullable().optional(),
      whatsapp: z.string().nullable().optional(),
      email: z.string().nullable().optional(),
      officeAddress: z.string().nullable().optional(),
      verified: z.boolean().optional(),
    })
    .optional(),
  projects: z
    .record(
      z.object({
        slug: z.string(),
        dtcpNumber: z.string().nullable().optional(),
        reraNumber: z.string().nullable().optional(),
        startingPriceInLakhs: z.number().nullable().optional(),
        plotSizesCent: z.string().nullable().optional(),
        verified: z.object({
          dtcp: z.boolean(),
          rera: z.boolean(),
          pricing: z.boolean(),
        }),
      })
    )
    .optional(),
});

export async function GET() {
  try {
    const settings = await store.getSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = settingsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const saved = await store.saveSettings(result.data);

    // Revalidate public routes (Task 3 requirement)
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/projects/[slug]", "page");
    revalidatePath("/contact");

    return NextResponse.json({ success: true, settings: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
