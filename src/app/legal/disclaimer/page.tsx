import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { TNRERA } from "@/config/compliance";

export const metadata = {
  title: "Statutory Disclaimer | V.V Properties",
  description: "Statutory TNRERA disclaimer and legal disclosures for V.V Properties plotted developments.",
};

export default function DisclaimerPage() {
  return (
    <div className="py-20 md:py-28 bg-ivory min-h-screen">
      <Container className="max-w-3xl">
        <Eyebrow>Legal & Compliance</Eyebrow>
        <Heading level={1} className="mt-2 mb-8">
          Statutory Disclaimer
        </Heading>

        <div className="prose prose-stone text-sm leading-relaxed text-muted space-y-6">
          <p className="font-medium text-ink">
            Last updated: October 2026. Applicable to all marketing communications, digital platforms, and brochures published by V.V Properties.
          </p>

          <h3 className="font-serif text-xl text-ink font-normal pt-4">1. Information Only &bull; Non-Binding</h3>
          <p>
            The content, imagery, layouts, dimensions, and descriptions contained on this website are presented purely for informational and orientation purposes. Nothing on this website constitutes an offer, an invitation to offer, a solicitation, or a legally binding contract between V.V Properties and any visitor or prospective purchaser.
          </p>

          <h3 className="font-serif text-xl text-ink font-normal pt-4">2. Statutory Approvals & TNRERA Registration</h3>
          <p>
            All residential layouts and plotted developments presented by V.V Properties are developed in accordance with applicable planning permissions from the Directorate of Town and Country Planning (DTCP) and registered under the Real Estate (Regulation and Development) Act (TNRERA) where mandated by law.
          </p>
          <p>
            Interested parties are advised to independently verify all project registration particulars, layout approvals, and Form-C documentation directly on the official Tamil Nadu Real Estate Regulatory Authority portal at{" "}
            <a
              href={TNRERA.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-4 hover:text-accent font-medium"
            >
              rera.tn.gov.in
            </a>
            .
          </p>

          <h3 className="font-serif text-xl text-ink font-normal pt-4">3. Artistic Renderings & Imagery</h3>
          <p>
            All 3D architectural renderings, perspective illustrations, landscaping sketches, and simulated walkthroughs are artist&apos;s impressions intended solely to convey design concepts. Actual development specifications, finished finishes, roadway dimensions, tree species, and external lighting may vary based on structural engineering requirements and competent authority sanctions.
          </p>

          <h3 className="font-serif text-xl text-ink font-normal pt-4">4. Independent Legal & Cadastral Scrutiny</h3>
          <p>
            V.V Properties encourages all prospective purchasers to conduct independent title searches, verify parent documents, examine FMB (Field Measurement Book) sketches, and consult certified advocates before entering into any reservation agreement or executing sale deeds.
          </p>

          <h3 className="font-serif text-xl text-ink font-normal pt-4">5. Absence of Speculative Claims</h3>
          <p>
            V.V Properties does not guarantee appreciation rates, rental yields, capital growth, or future municipal re-zoning. Property values in Coimbatore fluctuate according to broader macroeconomic conditions.
          </p>
        </div>
      </Container>
    </div>
  );
}
