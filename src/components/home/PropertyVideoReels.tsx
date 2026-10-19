"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X, ExternalLink, ShieldCheck, MapPin, Film } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface VideoReel {
  id: string;
  youtubeId: string;
  title: string;
  location: string;
  duration: string;
  category: string;
  thumbnail: string;
  summary: string;
}

const VIDEO_REELS: VideoReel[] = [
  {
    id: "reel-1",
    youtubeId: "pLip1-FRFqw",
    title: "The Garden City — Aerial Drone & Avenue Tour",
    location: "Kovilpalayam Corridor, Coimbatore",
    duration: "02:15",
    category: "Aerial Drone Tour",
    thumbnail: "/images/projects/the-garden-city.png",
    summary: "High-definition aerial survey of 40ft blacktop avenue, demarcated plot boundaries, and subterranean pipelines.",
  },
  {
    id: "reel-2",
    youtubeId: "awT_XppZoPo",
    title: "Tech Valley — IT Corridor Plotted Infrastructure",
    location: "Saravanampatti (Near CHIL SEZ), Coimbatore",
    duration: "01:48",
    category: "Site Walkthrough",
    thumbnail: "/images/projects/tech-valley.png",
    summary: "Ground-level inspection of underground electrical ducting, municipal water lines, and highway access.",
  },
  {
    id: "reel-3",
    youtubeId: "20vMiwzIO5s",
    title: "Signature Villa Architecture & Spatial Concept",
    location: "Kovilpalayam, Coimbatore",
    duration: "02:30",
    category: "Architectural Concept",
    thumbnail: "/images/projects/interior.png",
    summary: "Architectural spatial journey through contemporary luxury villa floor plans, cantilever balconies, and living volumes.",
  },
  {
    id: "reel-4",
    youtubeId: "PyK1_i6a3AU",
    title: "Statutory Sanctions & Clear-Title Demarcation",
    location: "Sathy Road Growth Corridor, Coimbatore",
    duration: "01:55",
    category: "Legal & Sanctions",
    thumbnail: "/images/projects/blueprint.png",
    summary: "On-site verification of surveyed corner stones, recorded DTCP numbers, and registration compliance.",
  },
];

export function PropertyVideoReels() {
  const [activeVideo, setActiveVideo] = useState<VideoReel | null>(null);

  const waUrl = getWhatsAppUrl(
    "Hello V.V Properties, I watched your video walkthroughs and would like to schedule a private on-site inspection."
  );

  return (
    <section id="property-videos" className="py-20 md:py-28 bg-[#08121E] text-ivory relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Film className="w-4 h-4 text-accent" />
              <Eyebrow className="text-accent">Virtual Site Inspections & Drone Tours</Eyebrow>
            </div>
            <Heading level={2} className="text-ivory mt-1">
              Experience Our Developments on Video
            </Heading>
            <p className="text-ivory/70 text-sm md:text-base mt-2 max-w-xl font-light leading-relaxed">
              Real on-site walkthroughs, aerial drone surveys, and infrastructure tours across our verified plotted communities in Coimbatore.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://youtube.com/@v.vproperties?si=fK4pKfEYHjIlby"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-ivory/90 hover:text-white border border-white/15 text-xs font-mono transition-colors"
            >
              <span>V.V Properties YouTube Channel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Video Grid (4 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEO_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveVideo(reel)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col text-left"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                <Image
                  src={reel.thumbnail}
                  alt={reel.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Duration & Category Tags */}
                <div className="absolute top-3 left-3 bg-black/85 px-2.5 py-1 rounded-md text-[10px] font-mono text-accent uppercase font-medium border border-white/10">
                  {reel.category}
                </div>
                <div className="absolute top-3 right-3 bg-black/85 px-2 py-0.5 rounded text-[11px] font-mono text-white/90">
                  {reel.duration}
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-accent text-ink flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Location Bar */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1.5 text-[11px] text-white/80 font-sans truncate">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="truncate">{reel.location}</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base text-ivory font-normal leading-snug group-hover:text-accent transition-colors line-clamp-2">
                    {reel.title}
                  </h4>
                  <p className="text-xs text-ivory/60 mt-2 font-light line-clamp-2 leading-relaxed">
                    {reel.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-accent">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Inspection
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-serif text-xl md:text-2xl text-ivory font-light">
              Want a customized live video walkthrough?
            </h3>
            <p className="text-xs md:text-sm text-ivory/70 mt-1 font-light">
              Connect with our Coimbatore site team for a live WhatsApp video call from any specific plot boundary.
            </p>
          </div>
          <Button href={waUrl || "#enquiry"} variant="primary" size="md" className="shrink-0">
            Request Live Site Call
          </Button>
        </div>
      </Container>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 animate-in fade-in duration-150"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-[#0B1522] border-b border-white/10 flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-accent uppercase tracking-wider block">
                  {activeVideo.category} &bull; {activeVideo.duration}
                </span>
                <h4 className="font-serif text-base md:text-lg text-ivory truncate max-w-xl">
                  {activeVideo.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close video tour"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Iframe Embed */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0B1522] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-white/70 font-light">
                {activeVideo.location}
              </span>
              <a
                href={waUrl || "#enquiry"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1.5 font-medium"
              >
                Schedule Physical Site Visit for This Location &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PropertyVideoReels;
