import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { ReraBlock } from "@/components/compliance/ReraBlock";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PROJECTS, getProjectBySlug } from "@/config/projects";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | V.V Properties Coimbatore`,
    description: project.shortDescription,
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const waUrl = getWhatsAppUrl(
    `Hello V.V Properties, I would like to enquire about plots in ${project.title}.`
  );

  return (
    <div className="py-24 md:py-32 bg-ivory min-h-screen">
      <Container>
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted mb-6">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-ink">Projects</Link>
          <span>/</span>
          <span className="text-ink font-semibold">{project.title}</span>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl mb-12">
          <Eyebrow>{project.location.taluk}, {project.location.district}</Eyebrow>
          <Heading level={1} className="mt-2">
            {project.title}
          </Heading>
          <p className="text-muted text-base md:text-lg mt-4 font-light leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Hero Visual */}
        <div className="mb-16">
          <ProjectImage
            src={project.heroImage}
            alt={project.title}
            aspectRatio="16/9"
            priority
            className="rounded-3xl shadow-sm"
            isRender={true}
          />
        </div>

        {/* Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Specifications & Due Diligence */}
          <div className="lg:col-span-7 space-y-10">
            {/* Fact Sheet */}
            <div className="bg-paper p-8 rounded-3xl border border-stone/40 space-y-6">
              <h2 className="font-serif text-2xl text-ink font-light">
                Statutory & Engineering Specifications
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs pt-2">
                <div>
                  <span className="text-muted block">Total Demarcated Units</span>
                  <strong className="text-base font-serif text-ink block mt-0.5">
                    {project.facts.totalPlots} Plots
                  </strong>
                </div>

                <div>
                  <span className="text-muted block">Internal Avenues</span>
                  <strong className="text-base font-serif text-ink block mt-0.5">
                    {project.features.roadWidthFt} ft Blacktop
                  </strong>
                </div>

                <div>
                  <span className="text-muted block">Zoning Authority</span>
                  <strong className="text-base font-serif text-ink block mt-0.5">
                    {project.facts.zoning}
                  </strong>
                </div>

                <div>
                  <span className="text-muted block">Water Infrastructure</span>
                  <strong className="text-base font-serif text-ink block mt-0.5">
                    {project.features.waterSource}
                  </strong>
                </div>

                <div>
                  <span className="text-muted block">Electrical Network</span>
                  <strong className="text-base font-serif text-ink block mt-0.5">
                    {project.features.electricity}
                  </strong>
                </div>

                <div>
                  <span className="text-muted block">Boundary Security</span>
                  <strong className="text-base font-serif text-ink block mt-0.5">
                    {project.features.boundary}
                  </strong>
                </div>
              </div>

              {/* RERA Block */}
              <div className="pt-4 border-t border-stone/30">
                <ReraBlock
                  reraNumber={project.statutory.reraNumber}
                  dtcpNumber={project.statutory.dtcpNumber}
                  projectName={project.title}
                />
              </div>
            </div>

            {/* Plot Explorer Link Banner */}
            <div className="p-8 rounded-3xl bg-ink text-ivory flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-accent text-xs font-mono uppercase tracking-widest">
                  Vector Demarcation
                </span>
                <h3 className="font-serif text-2xl font-light text-ivory">
                  Inspect Individual Plots
                </h3>
                <p className="text-xs text-ivory/70 font-light">
                  View compass directions, frontage dimensions, and avenue alignments.
                </p>
              </div>
              <Button href={`/plot-explorer?project=${project.slug}`} variant="primary" size="md">
                Open Plot Explorer
              </Button>
            </div>

            {/* Due Diligence & FAQ Accordion */}
            <div className="bg-paper p-8 rounded-3xl border border-stone/40 space-y-6">
              <h3 className="font-serif text-2xl text-ink font-light">
                Due Diligence & Conveyance FAQ
              </h3>

              <div className="space-y-4 text-xs leading-relaxed divide-y divide-stone/20">
                <div className="pt-3">
                  <strong className="text-ink text-sm block mb-1">
                    What documents are available for legal verification?
                  </strong>
                  <p className="text-muted">
                    Prior to reservation, clients receive a verification dossier comprising the 30-year parent deed trace, legal scrutiny certificate from certified advocates, approved DTCP layout sketch, and the current encumbrance certificate.
                  </p>
                </div>

                <div className="pt-3">
                  <strong className="text-ink text-sm block mb-1">
                    When is individual patta transfer executed?
                  </strong>
                  <p className="text-muted">
                    Upon execution and registration of the sale deed at the respective Sub-Registrar office, the sub-division patta application is submitted directly under Tamil Nadu e-Services guidelines.
                  </p>
                </div>

                <div className="pt-3">
                  <strong className="text-ink text-sm block mb-1">
                    Are the internal avenue roads handed over to the local body?
                  </strong>
                  <p className="text-muted">
                    Yes. All 30-ft and 40-ft internal roads and park reservations are gifted to the local panchayat/corporation via registered gift deeds as mandated by DTCP norms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Direct Lead Capture */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            <div className="bg-paper p-6 md:p-8 rounded-3xl border border-stone/40 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-muted block">
                Acquisition Details
              </span>

              <div className="flex items-baseline justify-between border-b border-stone/30 pb-4">
                <span className="text-xs text-muted">Consideration Basis:</span>
                <span className="font-serif text-2xl text-ink">
                  {project.pricing.startingPriceInLakhs !== null
                    ? `From ₹${project.pricing.startingPriceInLakhs} Lakhs`
                    : "Price on Application"}
                </span>
              </div>

              <p className="text-xs text-muted font-light leading-relaxed">
                Contact our advisory desk for plot-specific sizing, cent conversions, and immediate registration schedules.
              </p>

              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-emerald-800 text-ivory hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider"
                >
                  <span>Chat on WhatsApp</span>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.8.814 3.182 0 5.768-2.587 5.768-5.766 0-3.181-2.586-5.766-5.772-5.766zm8.472 5.766c0 4.686-3.813 8.498-8.472 8.498-1.455 0-2.825-.373-4.025-1.026l-4.506 1.182 1.206-4.394c-.754-1.272-1.187-2.766-1.187-4.26 0-4.686 3.813-8.498 8.472-8.498 4.686 0 8.512 3.812 8.512 8.498z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Direct Form */}
            <EnquiryForm initialProject={project.slug} />
          </div>
        </div>
      </Container>
    </div>
  );
}
