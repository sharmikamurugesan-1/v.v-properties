import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { ReraBlock } from "@/components/compliance/ReraBlock";
import { PROJECTS } from "@/config/projects";

export const metadata = {
  title: "Plotted Developments & Communities | V.V Properties",
  description: "Browse verified DTCP and TNRERA residential plotted developments in Coimbatore.",
};

export default function ProjectsPage() {
  return (
    <div className="py-24 md:py-32 bg-ivory min-h-screen">
      <Container>
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted mb-3">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>/</span>
            <span className="text-ink font-semibold">Projects</span>
          </div>

          <Eyebrow>Master-Planned Communities</Eyebrow>
          <Heading level={1} className="mt-2">
            Verified Plotted Developments
          </Heading>
          <p className="text-muted text-base mt-4 font-light leading-relaxed">
            Plotted layouts developed with civil engineering precision, statutory sanctions, and complete title clearance across Coimbatore&apos;s key growth sectors.
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-20">
          {PROJECTS.map((project, idx) => {
            const isAlternate = idx % 2 === 1;
            return (
              <div
                key={project.slug}
                className="bg-paper p-8 md:p-12 rounded-3xl border border-stone/40 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center shadow-sm"
              >
                {/* Visual */}
                <div className={`lg:col-span-7 ${isAlternate ? "lg:order-2" : ""}`}>
                  <ProjectImage
                    src={project.heroImage}
                    alt={project.title}
                    aspectRatio="16/10"
                    className="rounded-2xl shadow-sm"
                    isRender={true}
                  />
                </div>

                {/* Details */}
                <div className={`lg:col-span-5 space-y-6 ${isAlternate ? "lg:order-1" : ""}`}>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                      {project.location.taluk}, {project.location.district}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-ink font-light mt-1">
                      {project.title}
                    </h2>
                    <p className="text-muted text-sm mt-3 font-light leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Fact Grid */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-stone/30 text-xs">
                    <div>
                      <span className="text-muted block">Total Layout</span>
                      <span className="font-medium text-ink mt-0.5 block">{project.facts.totalPlots} Plots</span>
                    </div>
                    <div>
                      <span className="text-muted block">Internal Avenues</span>
                      <span className="font-medium text-ink mt-0.5 block">{project.features.roadWidthFt} ft Blacktop</span>
                    </div>
                    <div>
                      <span className="text-muted block">Zoning Authority</span>
                      <span className="font-medium text-ink mt-0.5 block">{project.facts.zoning}</span>
                    </div>
                    <div>
                      <span className="text-muted block">Starting Consideration</span>
                      <span className="font-medium text-ink mt-0.5 block">
                        {project.pricing.startingPriceInLakhs !== null
                          ? `From ₹${project.pricing.startingPriceInLakhs} L`
                          : "Price on Application"}
                      </span>
                    </div>
                  </div>

                  <ReraBlock
                    reraNumber={project.statutory.reraNumber}
                    dtcpNumber={project.statutory.dtcpNumber}
                    projectName={project.title}
                    compact
                  />

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button href={`/projects/${project.slug}`} variant="primary" size="md">
                      Project Dossier
                    </Button>
                    <Button href={`/plot-explorer?project=${project.slug}`} variant="outline" size="md">
                      Plot Explorer &rarr;
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
