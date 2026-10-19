import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { COMPANY } from "@/config/company";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact & Advisory Desk | V.V Properties Coimbatore",
  description: "Schedule a site visit or connect with property advisors at V.V Properties Coimbatore.",
};

export default function ContactPage() {
  const waUrl = getWhatsAppUrl("Hello V.V Properties, I would like to enquire about your plotted layouts.");

  return (
    <div className="py-24 md:py-32 bg-ivory min-h-screen text-left">
      <Container>
        {/* Breadcrumb & Header */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted mb-4">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Contact</span>
        </div>

        <div className="max-w-3xl mb-12">
          <Eyebrow>Direct Engagement</Eyebrow>
          <Heading level={1} className="mt-2">
            Connect with V.V Properties
          </Heading>
          <p className="text-sm md:text-base text-muted mt-3 font-light leading-relaxed">
            Schedule a private layout inspection or request title dossiers directly from our team in Coimbatore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-paper p-8 rounded-3xl border border-stone/40 space-y-6 shadow-sm">
              <h2 className="font-serif text-2xl text-ink font-light">
                Office & Direct Channels
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-muted block uppercase tracking-wider text-[10px]">Office Address</span>
                  <p className="text-ink font-medium mt-1 leading-relaxed">
                    {COMPANY.officeAddress ?? "Coimbatore, Tamil Nadu (Registered office address pending client confirmation)"}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone/30">
                  <span className="text-muted block uppercase tracking-wider text-[10px]">Telephone Desk</span>
                  <p className="text-ink font-medium mt-1">
                    {COMPANY.phone ?? "Official phone number pending verification"}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone/30">
                  <span className="text-muted block uppercase tracking-wider text-[10px]">Official Email</span>
                  <p className="text-ink font-medium mt-1">
                    {COMPANY.email ?? "Official email pending verification"}
                  </p>
                </div>
              </div>

              {waUrl && (
                <div className="pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-full bg-emerald-800 text-ivory hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider shadow-sm"
                  >
                    <span>Instant WhatsApp Connect</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.8.814 3.182 0 5.768-2.587 5.768-5.766 0-3.181-2.586-5.766-5.772-5.766zm8.472 5.766c0 4.686-3.813 8.498-8.472 8.498-1.455 0-2.825-.373-4.025-1.026l-4.506 1.182 1.206-4.394c-.754-1.272-1.187-2.766-1.187-4.26 0-4.686 3.813-8.498 8.472-8.498 4.686 0 8.512 3.812 8.512 8.498z" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-ivory border border-stone/40 space-y-2 text-xs">
              <span className="font-serif text-base text-ink font-normal block">
                Guided Site Inspections
              </span>
              <p className="text-muted leading-relaxed font-light">
                Chauffeured vehicle pickups can be arranged for family visits from major transit points in Coimbatore including the Airport, Railway Station, or Gandhipuram.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
