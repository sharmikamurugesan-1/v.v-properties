"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { BUYER_DUE_DILIGENCE_CHECKLIST } from "@/data/mockData";
import { TNRERA } from "@/config/compliance";

export default function TrustCentrePage() {
  const [checkedSteps, setCheckedSteps] = useState<number[]>([1, 2, 3]);

  const toggleCheck = (step: number) => {
    setCheckedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  return (
    <div className="py-24 md:py-32 bg-ivory min-h-screen text-left">
      <Container className="space-y-16">
        {/* Breadcrumb & Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted mb-4">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>/</span>
            <span className="text-ink font-semibold">Trust Centre</span>
          </div>

          <div className="max-w-3xl">
            <Eyebrow>Transparency & Title Verification</Eyebrow>
            <Heading level={1} className="mt-2">
              Legal Due Diligence & Statutory Process
            </Heading>
            <p className="text-sm md:text-base text-muted mt-3 font-light leading-relaxed">
              Every plotted layout developed by V.V Properties undergoes strict statutory clearance, parent-deed title inspection, and jurisdictional Sub-Registrar validation before client reservation.
            </p>
          </div>
        </div>

        {/* 3 Pillars of Transparency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-paper p-8 rounded-3xl border border-stone/40 space-y-4 shadow-sm">
            <span className="font-mono text-accent text-xs font-semibold uppercase tracking-wider">
              Statutory Clearance
            </span>
            <h3 className="font-serif text-2xl text-ink font-light">DTCP & TNRERA Sanction</h3>
            <p className="text-xs text-muted leading-relaxed font-light">
              Every layout is sanctioned by the Directorate of Town and Country Planning (DTCP) and registered with Tamil Nadu RERA. No unapproved agricultural plots.
            </p>
            <div className="pt-2">
              <a
                href={TNRERA.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-ink font-medium underline underline-offset-4 hover:text-accent"
              >
                Verify on TNRERA Portal &rarr;
              </a>
            </div>
          </div>

          <div className="bg-paper p-8 rounded-3xl border border-stone/40 space-y-4 shadow-sm">
            <span className="font-mono text-accent text-xs font-semibold uppercase tracking-wider">
              Title Chain Integrity
            </span>
            <h3 className="font-serif text-2xl text-ink font-light">30-Year Parent Deed Trace</h3>
            <p className="text-xs text-muted leading-relaxed font-light">
              Our title chain is vetted by experienced real-estate advocates in Coimbatore for 30 consecutive years, backed by a spotless Nil Encumbrance Certificate.
            </p>
          </div>

          <div className="bg-paper p-8 rounded-3xl border border-stone/40 space-y-4 shadow-sm">
            <span className="font-mono text-accent text-xs font-semibold uppercase tracking-wider">
              Civic Infrastructure
            </span>
            <h3 className="font-serif text-2xl text-ink font-light">Registered Gift Deeds</h3>
            <p className="text-xs text-muted leading-relaxed font-light">
              All internal blacktop avenues, utility margins, and park reserves are legally gifted to the local governing body via registered gift deeds.
            </p>
          </div>
        </div>

        {/* Interactive 6-Step Due-Diligence Checklist */}
        <div className="bg-paper rounded-3xl p-8 md:p-12 border border-stone/40 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone/30">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-muted block mb-1">
                Land Buyer Protection Guide
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-ink font-light">
                6-Step Land Due Diligence Checklist
              </h2>
            </div>

            <span className="px-4 py-2 rounded-full bg-ivory text-ink font-mono text-xs border border-stone/40">
              {checkedSteps.length} of {BUYER_DUE_DILIGENCE_CHECKLIST.length} Completed
            </span>
          </div>

          <div className="space-y-4">
            {BUYER_DUE_DILIGENCE_CHECKLIST.map((item) => {
              const isChecked = checkedSteps.includes(item.step);
              return (
                <div
                  key={item.step}
                  onClick={() => toggleCheck(item.step)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isChecked
                      ? "bg-ivory border-accent/60 shadow-sm"
                      : "bg-paper/40 border-stone/30 hover:border-accent/40"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      isChecked ? "bg-ink text-ivory" : "border border-stone/50 bg-white"
                    }`}
                  >
                    {isChecked && <span className="text-xs">✓</span>}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg text-ink font-normal">
                        Step 0{item.step}: {item.title}
                      </h4>
                      <span className="text-[10px] uppercase font-mono text-muted bg-stone/20 px-2 py-0.5 rounded">
                        Standard Protocol
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Ribbon */}
          <div className="p-8 rounded-2xl bg-ink text-ivory flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-serif text-xl font-light text-ivory">
                Need to inspect original title dossiers?
              </h4>
              <p className="text-xs text-ivory/70 font-light">
                We provide complete copies of parent deeds and sanctions for your independent advocate to examine.
              </p>
            </div>

            <Button href="/contact" variant="primary" size="md">
              Request Scrutiny Dossier
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
