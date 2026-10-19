import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { store } from "@/lib/store";
import { z } from "zod";

const updatePlotSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["available", "booked", "hold"]),
});

export async function GET() {
  try {
    const plots = await store.getPlots();
    return NextResponse.json({ plots });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch plots" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const result = updatePlotSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid plot status update" }, { status: 400 });
    }

    const { id, status } = result.data;
    const updated = await store.updatePlot(id, status);

    if (!updated) {
      return NextResponse.json({ error: "Plot not found" }, { status: 404 });
    }

    revalidatePath("/plot-explorer");
    return NextResponse.json({ success: true, plot: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update plot" }, { status: 500 });
  }
}
