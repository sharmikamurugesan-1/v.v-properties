"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsentState, setConsentState } from "@/lib/analytics";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("vv_cookie_consent");
      if (!consent) {
        // Small delay so it doesn't jarringly jump on initial load
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      // ignore
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    setConsentState(true);
    setVisible(false);
  };

  const handleDecline = () => {
    setConsentState(false);
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 bg-ink/95 backdrop-blur-md text-ivory p-5 rounded-2xl border border-stone/20 shadow-2xl text-xs space-y-3"
    >
      <p className="leading-relaxed text-ivory/80">
        We use essential telemetry to understand site traffic and enquiry flows in Coimbatore. No third-party data broker tracking. Read our{" "}
        <Link href="/legal/privacy" className="text-accent underline underline-offset-2 hover:text-ivory">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={handleAccept}
          className="flex-1 py-2 px-4 rounded-full bg-accent text-ink font-medium text-center hover:bg-accent/90 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="py-2 px-4 rounded-full border border-stone/40 text-ivory/70 hover:text-ivory hover:border-stone transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
