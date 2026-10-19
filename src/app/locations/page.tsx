import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { LOCATIONS } from "@/config/locations";

export const metadata = {
  title: "Location Dynamics & Corridors | V.V Properties Coimbatore",
  description: "Examine civic infrastructure, key highways, and proximity corridors in Coimbatore.",
};

export default function LocationsPage() {
  return (
    <div className="py-24 md:py-32 bg-ivory min-h-screen text-left">
      <Container>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted mb-4">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Locations</span>
        </div>

        <div className="max-w-3xl mb-12">
          <Eyebrow>Strategic Connectivity</Eyebrow>
          <Heading level={1} className="mt-2">
            Coimbatore Growth Corridors
          </Heading>
          <p className="text-sm md:text-base text-muted mt-3 font-light leading-relaxed">
            Geographic positioning for peaceful residential living with convenient access to IT corridors, arterial ring roads, and higher education hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="bg-paper p-8 rounded-3xl border border-stone/40 space-y-4 hover:border-accent/60 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                  {loc.name}
                </span>
                {loc.distanceKm !== null && (
                  <span className="text-xs font-mono bg-stone/20 px-2.5 py-0.5 rounded text-ink">
                    {loc.distanceKm} km
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-serif text-2xl text-ink font-light">{loc.landmark}</h3>
                <p className="text-xs text-muted mt-2 leading-relaxed font-light">{loc.significance}</p>
              </div>

              <div className="pt-4 border-t border-stone/30 flex items-center justify-between text-xs">
                <span className="text-muted capitalize">{loc.category}</span>
                <a
                  href="https://maps.google.com/?q=Coimbatore,Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink font-medium hover:text-accent transition-colors"
                >
                  Open in Maps &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
