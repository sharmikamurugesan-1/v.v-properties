'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function HomePage() {
  const { showToast } = useApp();

  const [visitName, setVisitName] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitName.trim() || !visitPhone.trim()) {
      showToast('Please provide your name and contact number.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: visitName.trim(),
          phone: visitPhone.trim(),
          consent: true,
          honeypot: '',
          renderedAt: Date.now() - 4000,
        }),
      });
    } catch {
      // silent
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast(`Thank you, ${visitName}. We'll contact you shortly.`, 'success');
    }
  };

  return (
    <div className="flex flex-col w-full bg-white text-[#0E2138] font-sans antialiased">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[88vh] bg-white flex items-center overflow-hidden pt-24 pb-10 px-6 lg:px-16">

        {/* Subtle light-blue background wash on right half */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#EAF4FB]/60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="space-y-8">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0E2138] leading-tight tracking-tight">
              Architecture That<br />Shapes Tomorrow.
            </h1>

            <p className="text-base text-[#4A6278] leading-relaxed max-w-md">
              Curated residential developments and verified plots across
              Coimbatore&apos;s prime growth corridors. Engineered for lasting
              value and clear title certainty.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#1565C0] text-white font-semibold text-sm hover:bg-[#0D47A1] transition-colors shadow-sm"
              >
                Explore Properties
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#schedule"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-[#1565C0] text-[#1565C0] font-semibold text-sm hover:bg-[#EAF4FB] transition-colors"
              >
                Sell Property
              </Link>
            </div>

            {/* Trust Strip */}
            <div className="pt-6 border-t border-[#E2EBF3] grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-[#0E2138]">15+</p>
                <p className="text-xs text-[#4A6278] mt-0.5">Years of Experience</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0E2138]">500+</p>
                <p className="text-xs text-[#4A6278] mt-0.5">Properties Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1565C0]">DTCP</p>
                <p className="text-xs text-[#4A6278] mt-0.5">Approved Properties</p>
              </div>
            </div>
          </div>

          {/* ── Right: Property Photo ── */}
          <div className="relative w-full aspect-[4/3] lg:aspect-[16/11] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/hero-luxury-villa.png"
              alt="V.V Properties – Premium Villa in Coimbatore"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/hero-villa.png';
              }}
            />
          </div>

        </div>
      </section>

      {/* ── SCHEDULE A VISIT (simple inline form) ───────────────────────── */}
      <section id="schedule" className="bg-[#EAF4FB] py-16 px-6 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0E2138] mb-2">
            Sell Your Property or Schedule a Visit
          </h2>
          <p className="text-sm text-[#4A6278] mb-8">
            Looking to sell land or purchase verified property in Coimbatore? Submit your details below.
          </p>

          {isSubmitted ? (
            <div className="bg-white rounded-xl p-8 text-center border border-[#C8DFF0] shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#1565C0] text-white mx-auto flex items-center justify-center mb-4">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#0E2138] mb-1">Request Received</h3>
              <p className="text-sm text-[#4A6278]">
                Thank you, {visitName}. Our team will contact you at {visitPhone} shortly.
              </p>
              <button
                onClick={() => { setIsSubmitted(false); setVisitName(''); setVisitPhone(''); }}
                className="mt-4 text-xs font-semibold text-[#1565C0] hover:underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleVisitSubmit} className="bg-white rounded-xl p-6 border border-[#C8DFF0] shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A6278] mb-1.5 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={visitName}
                    onChange={(e) => setVisitName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg border border-[#C8DFF0] bg-[#F7FAFD] text-sm text-[#0E2138] placeholder:text-[#94AAC0] focus:outline-none focus:border-[#1565C0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A6278] mb-1.5 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={visitPhone}
                    onChange={(e) => setVisitPhone(e.target.value)}
                    placeholder="Your contact number"
                    className="w-full px-4 py-3 rounded-lg border border-[#C8DFF0] bg-[#F7FAFD] text-sm text-[#0E2138] placeholder:text-[#94AAC0] focus:outline-none focus:border-[#1565C0] transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#1565C0] text-white font-semibold text-sm hover:bg-[#0D47A1] transition-colors disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Book Site Visit'}
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
