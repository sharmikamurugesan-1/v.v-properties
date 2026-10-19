import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { ReraBlock } from "@/components/compliance/ReraBlock";
import { BlueprintToBuilding } from "@/components/home/BlueprintToBuilding";
import { PropertyVideoReels } from "@/components/home/PropertyVideoReels";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PROJECTS } from "@/config/projects";
import { LOCATIONS } from "@/config/locations";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Play } from "lucide-react";

export const metadata = {
  title: "V.V Properties | Verified Residential Plotted Land in Coimbatore",
  description:
    "Quiet luxury and title-verified residential plots across Coimbatore's prime growth corridors. TNRERA and DTCP verified developments.",
};

export default function HomePage() {
  const waUrl = getWhatsAppUrl("Hello V.V Properties, I would like to schedule a private site visit.");

  return (
    <main className="min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-ink text-ivory">
        {/* Full-bleed photography with subtle Ken-Burns zoom */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="V.V Properties prime residential landscape in Coimbatore"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.45] contrast-[1.05] scale-100 animate-[kenburns_24s_ease-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </div>

        <Container className="relative z-10 text-center max-w-4xl pt-16">
          <Eyebrow className="text-accent mb-4">Coimbatore &bull; Tamil Nadu</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-ivory leading-[1.08] mb-6">
            Verified land.
            <br />
            <span className="italic font-normal text-ivory/90">Thoughtfully planned.</span>
          </h1>
          <p className="text-base sm:text-lg text-ivory/80 max-w-xl mx-auto font-light leading-relaxed mb-10">
            Clear-title residential plotted communities across prime growth corridors in Coimbatore. Registered with TNRERA and DTCP.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button href="#featured-projects" variant="primary" size="lg">
              Explore Projects
            </Button>
            <Link
              href="#property-videos"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ivory/10 hover:bg-ivory/20 text-ivory text-sm font-medium border border-ivory/20 transition-all backdrop-blur-sm"
            >
              <Play className="w-3.5 h-3.5 text-accent fill-current" />
              <span>Watch Video Tours</span>
            </Link>
            <Link
              href="#enquiry"
              className="text-sm font-medium text-ivory/80 hover:text-ivory underline underline-offset-8 transition-colors"
            >
              Book Site Visit &rarr;
            </Link>
          </div>
        </Container>

        {/* 1px Scroll Cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
          <span className="text-[10px] uppercase font-mono tracking-widest text-ivory/60">Scroll</span>
          <div className="w-[1px] h-8 bg-ivory/40 animate-pulse" />
        </div>
      </section>

      {/* SECTION 2: SIGNATURE BLUEPRINT-TO-BUILDING INTERACTIVE SECTION */}
      <BlueprintToBuilding />

      {/* SECTION 3: FEATURED PROJECTS */}
      <Section id="featured-projects" background="ivory" padding="lg">
        <Container>
          <div className="max-w-2xl mb-16">
            <Eyebrow>Verified Plotted Developments</Eyebrow>
            <Heading level={2} className="mt-2">
              Planned for long-term residential value
            </Heading>
            <p className="text-muted text-sm md:text-base mt-4 font-light">
              Each estate carries independent legal scrutiny, recorded DTCP and TNRERA sanction numbers, and complete subterranean infrastructure.
            </p>
          </div>

          <div className="space-y-24">
            {PROJECTS.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={project.slug}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`lg:col-span-7 ${!isEven ? "lg:order-2" : ""}`}>
                    <ProjectImage
                      src={project.heroImage}
                      alt={project.title}
                      aspectRatio="16/10"
                      className="rounded-3xl shadow-sm"
                      isRender={true}
                    />
                  </div>

                  <div className={`lg:col-span-5 space-y-6 ${!isEven ? "lg:order-1" : ""}`}>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                        {project.location.taluk}, {project.location.district}
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl text-ink font-light mt-1">
                        {project.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed mt-3 font-light">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-stone/30 text-xs">
                      <div>
                        <span className="text-muted block">Road Infrastructure</span>
                        <span className="font-medium text-ink mt-0.5 block">{project.features.roadWidthFt} ft Blacktop</span>
                      </div>
                      <div>
                        <span className="text-muted block">Total Layout Size</span>
                        <span className="font-medium text-ink mt-0.5 block">{project.facts.totalPlots} Individual Plots</span>
                      </div>
                      <div>
                        <span className="text-muted block">Zoning</span>
                        <span className="font-medium text-ink mt-0.5 block">{project.facts.zoning}</span>
                      </div>
                      <div>
                        <span className="text-muted block">Pricing Basis</span>
                        <span className="font-medium text-ink mt-0.5 block">
                          {project.pricing.startingPriceInLakhs !== null
                            ? `From ₹${project.pricing.startingPriceInLakhs} L`
                            : "Price on Application"}
                        </span>
                      </div>
                    </div>

                    {/* RERA and Statutory Block */}
                    <ReraBlock
                      reraNumber={project.statutory.reraNumber}
                      dtcpNumber={project.statutory.dtcpNumber}
                      projectName={project.title}
                      compact
                    />

                    <div className="pt-2 flex items-center gap-4">
                      <Button href={`/projects/${project.slug}`} variant="outline" size="md">
                        View Project Dossier
                      </Button>
                      <Button href={`/plot-explorer?project=${project.slug}`} variant="ghost" size="md">
                        Plot Explorer &rarr;
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* SECTION 4: PROPERTY VIDEO REELS & VIRTUAL SITE TOURS */}
      <PropertyVideoReels />

      {/* SECTION 5: PLOT EXPLORER TEASER */}
      <section className="bg-ink text-ivory py-24 border-y border-stone/20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-accent text-xs font-mono uppercase tracking-widest">
                Interactive Land Intelligence
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-ivory leading-tight">
                Inspect plot boundaries before your site visit
              </h2>
              <p className="text-ivory/70 text-sm md:text-base leading-relaxed font-light">
                Filter by plot dimension, orientation (East / North / South / West), corner configurations, and road frontage widths directly through our vector Plot Explorer.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button href="/plot-explorer" variant="primary" size="md">
                  Open Interactive Plot Explorer
                </Button>
                <Button href="/calculator" variant="ghost" size="md" className="text-ivory hover:text-accent">
                  Financial Calculator &rarr;
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* Minimal Line-art Layout Preview */}
              <div className="bg-paper/5 border border-stone/20 rounded-3xl p-6 md:p-8 relative overflow-hidden backdrop-blur-sm">
                <div className="flex items-center justify-between pb-4 border-b border-stone/10 text-xs font-mono text-ivory/60">
                  <span>SCHEMATIC LAYOUT GRID &bull; THE GARDEN CITY</span>
                  <span className="text-accent">NORTH &uarr;</span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 my-6">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        i % 5 === 0
                          ? "border-accent/40 bg-accent/10 text-accent font-medium"
                          : "border-stone/20 bg-stone/5 text-ivory/70 hover:border-accent hover:bg-accent/5 cursor-pointer"
                      }`}
                    >
                      <span className="block text-[10px] font-mono opacity-60">P-{i + 1}</span>
                      <span className="block text-xs mt-1">2.5 C</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone/10 text-xs text-ivory/50">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent/30 border border-accent" /> Selected / Verified
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone/20 border border-stone/30" /> Open Layout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 5: LOCATIONS & CONNECTIVITY */}
      <Section background="paper" padding="lg">
        <Container>
          <div className="max-w-2xl mb-14">
            <Eyebrow>Strategic Geography</Eyebrow>
            <Heading level={2} className="mt-2">
              Growth Corridors of Coimbatore
            </Heading>
            <p className="text-muted text-sm md:text-base mt-3 font-light">
              Locations chosen for civic connectivity, educational institutions, industrial corridors, and clean suburban living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="bg-ivory p-6 rounded-2xl border border-stone/40 hover:border-accent/60 transition-colors space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                    {loc.name}
                  </span>
                  {loc.distanceKm !== null && (
                    <span className="text-xs font-mono bg-stone/10 px-2 py-0.5 rounded text-ink">
                      {loc.distanceKm} km
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-serif text-lg text-ink font-normal">{loc.landmark}</h4>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{loc.significance}</p>
                </div>

                <div className="pt-2 border-t border-stone/20 flex items-center justify-between text-xs">
                  <span className="text-muted capitalize">{loc.category}</span>
                  <a
                    href="https://maps.google.com/?q=Coimbatore,Tamil+Nadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink font-medium hover:text-accent transition-colors"
                  >
                    View on Map &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 6: TRUST & STATUTORY PROCESS */}
      <Section background="ivory" padding="lg" className="border-t border-stone/30">
        <Container>
          <div className="max-w-2xl mb-14">
            <Eyebrow>Due Diligence Framework</Eyebrow>
            <Heading level={2} className="mt-2">
              How we verify every square foot
            </Heading>
            <p className="text-muted text-sm md:text-base mt-3 font-light">
              No shortcuts. Every development undergoes multi-tiered scrutiny before being released for private reservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "30-Year Title Search",
                desc: "Full encumbrance and lineage verification from certified advocates to guarantee unencumbered freehold ownership.",
              },
              {
                step: "02",
                title: "Statutory Sanctions",
                desc: "Complete clearance from DTCP and TNRERA prior to road marking or plot division.",
              },
              {
                step: "03",
                title: "Civil Infrastructure",
                desc: "Compacted blacktop roads, underground water manifolds, electricity supply, and boundary markers.",
              },
              {
                step: "04",
                title: "Transparent Conveyance",
                desc: "Direct individual deed registration at the jurisdictional Sub-Registrar office with zero hidden dues.",
              },
            ].map((item) => (
              <div key={item.step} className="space-y-3">
                <span className="font-mono text-xs text-accent font-semibold">{item.step}</span>
                <h4 className="font-serif text-xl text-ink font-normal">{item.title}</h4>
                <p className="text-xs text-muted leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Legal Vault Card */}
          <div className="mt-14 p-8 rounded-3xl bg-paper border border-stone/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-ink/70 font-semibold">
                Client Legal Guarantee
              </span>
              <h3 className="font-serif text-2xl text-ink font-light">
                Complete Document Scrutiny Vault
              </h3>
              <p className="text-xs text-muted leading-relaxed font-light">
                Prospective buyers are welcome to review parent deeds, FMB sketches, patta records, and approved layout plans with their own independent legal counsel.
              </p>
            </div>
            <Button href="/trust-centre" variant="outline" size="md">
              Explore Trust Centre
            </Button>
          </div>
        </Container>
      </Section>

      {/* SECTION 7: DIRECT ENQUIRY & CONVERSIONS */}
      <Section id="enquiry" background="paper" padding="lg" className="border-t border-stone/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <Eyebrow>Private Consultations</Eyebrow>
              <Heading level={2}>
                Schedule a site visit or request a project dossier
              </Heading>
              <p className="text-muted text-sm leading-relaxed font-light">
                Our property advisors provide honest guidance on zoning, infrastructure completion timelines, and registry procedures across Coimbatore.
              </p>

              <div className="space-y-4 pt-4 border-t border-stone/30 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 text-ink flex items-center justify-center font-mono">
                    ✓
                  </div>
                  <div>
                    <span className="font-medium text-ink block">Zero Invented Claims</span>
                    <span className="text-muted block">Direct, factual property details without marketing hyperbole.</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 text-ink flex items-center justify-center font-mono">
                    ✓
                  </div>
                  <div>
                    <span className="font-medium text-ink block">Guided Chauffeured Visits</span>
                    <span className="text-muted block">Complimentary site inspections from Coimbatore city center.</span>
                  </div>
                </div>
              </div>

              {waUrl && (
                <div className="pt-4">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-800 text-ivory hover:bg-emerald-900 transition-colors text-xs font-medium tracking-wide uppercase shadow-sm"
                  >
                    <span>Connect on WhatsApp</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.8.814 3.182 0 5.768-2.587 5.768-5.766 0-3.181-2.586-5.766-5.772-5.766zm8.472 5.766c0 4.686-3.813 8.498-8.472 8.498-1.455 0-2.825-.373-4.025-1.026l-4.506 1.182 1.206-4.394c-.754-1.272-1.187-2.766-1.187-4.26 0-4.686 3.813-8.498 8.472-8.498 4.686 0 8.512 3.812 8.512 8.498z" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
