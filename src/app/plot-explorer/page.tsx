import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import LivePlotExplorer from "@/components/plot-explorer/LivePlotExplorer";

export const metadata = {
  title: "Interactive Master Plot Explorer | V.V Properties",
  description: "Inspect plot boundaries, frontage dimensions, and orientations across V.V Properties developments.",
};

export default function PlotExplorerPage() {
  return (
    <div className="py-24 md:py-32 bg-ivory min-h-screen text-left">
      <Container>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted mb-4">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Plot Explorer</span>
        </div>

        <div className="max-w-3xl mb-10">
          <Eyebrow>Cadastral Intelligence</Eyebrow>
          <Heading level={1} className="mt-2">
            Interactive Plot Explorer
          </Heading>
          <p className="text-sm md:text-base text-muted mt-3 font-light leading-relaxed">
            Examine plot dimensions, road frontage widths, and compass orientations across our verified Coimbatore developments before scheduling a private site visit.
          </p>
        </div>

        <div className="bg-paper rounded-3xl p-6 md:p-8 border border-stone/40 shadow-sm">
          <LivePlotExplorer />
        </div>
      </Container>
    </div>
  );
}
