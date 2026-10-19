import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

export const metadata = {
  title: "Privacy Policy | V.V Properties",
  description: "Privacy policy and data governance practices of V.V Properties Coimbatore.",
};

export default function PrivacyPage() {
  return (
    <div className="py-20 md:py-28 bg-ivory min-h-screen">
      <Container className="max-w-3xl">
        <Eyebrow>Data Governance</Eyebrow>
        <Heading level={1} className="mt-2 mb-8">
          Privacy Policy
        </Heading>

        <div className="prose prose-stone text-sm leading-relaxed text-muted space-y-6">
          <p className="font-medium text-ink">
            Effective Date: October 2026. This policy governs how V.V Properties collects, processes, and protects personal information submitted through our digital channels.
          </p>

          <h3 className="font-serif text-xl text-ink font-normal pt-4">1. Information We Collect</h3>
          <p>
            When you request a project dossier, schedule a site visit, or submit an enquiry, we collect only the information you explicitly provide: your name, telephone number, email address, preferred project, and any notes relevant to your property inquiry.
          </p>

          <h3 className="font-serif text-xl text-ink font-normal pt-4">2. Purpose of Processing</h3>
          <p>
            Your information is used strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Coordinate site visits and convey directions to our Coimbatore locations.</li>
            <li>Transmit statutory project dossiers, approved layout plans, and RERA registration documents.</li>
            <li>Respond to your direct communications via telephone or WhatsApp.</li>
          </ul>

          <h3 className="font-serif text-xl text-ink font-normal pt-4">3. Zero Third-Party Brokerage or Sale of Data</h3>
          <p>
            We do not sell, rent, lease, trade, or share your contact information with external marketing brokers, lead aggregators, or unauthorized third parties. All enquiries are handled directly by V.V Properties personnel.
          </p>

          <h3 className="font-serif text-xl text-ink font-normal pt-4">4. Telemetry & Analytics</h3>
          <p>
            With your consent, our website uses basic, anonymized web telemetry to understand user navigation patterns and optimize load times. You may decline non-essential cookies via our consent prompt at any time without restricting your access to property details.
          </p>

          <h3 className="font-serif text-xl text-ink font-normal pt-4">5. Contact & Erasure Requests</h3>
          <p>
            If you wish to update your contact details or request the deletion of your enquiry record from our communication registers, please contact us directly via WhatsApp or email.
          </p>
        </div>
      </Container>
    </div>
  );
}
