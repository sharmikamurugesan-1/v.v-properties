'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { COMPANY } from '@/config/company';
import { COMPLIANCE } from '@/config/compliance';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/' || pathname === '/admin' || pathname === '/admin/login') {
    return null;
  }
  return (
    <footer className="bg-ink text-ivory border-t border-ink-soft/40 py-16 md:py-24 text-left">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        
        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-ivory/10">
          
          {/* Col 1: Brand & Office Address (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-paper border border-ivory/20 flex-shrink-0">
                <Image
                  src="/brand/vv-properties-logo.jpg"
                  alt="V.V Properties Logo"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-xl text-ivory tracking-tight">
                V.V <span className="font-sans text-xs uppercase tracking-[0.16em] font-semibold text-ivory/90">Properties</span>
              </span>
            </Link>

            <p className="text-xs text-ivory/70 max-w-sm font-sans leading-relaxed">
              {COMPANY.tagline} Thoughtfully planned plotted communities and custom villas in Coimbatore&apos;s prime development corridors.
            </p>

            {COMPANY.officeAddress ? (
              <p className="text-xs text-ivory/60 font-sans">{COMPANY.officeAddress}</p>
            ) : (
              <p className="text-[11px] text-ivory/40 font-sans italic">
                Registered Office: Saravanampatti, Coimbatore, Tamil Nadu
              </p>
            )}

            <div className="flex items-center gap-5 pt-2 text-xs text-ivory/70">
              <Link
                href={COMPANY.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Instagram
              </Link>
              <Link
                href={COMPANY.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                YouTube
              </Link>
              {COMPANY.phone && (
                <a href={`tel:${COMPANY.phone}`} className="hover:text-accent transition-colors">
                  {COMPANY.phone}
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-sans">
            <span className="text-xs uppercase tracking-[0.18em] text-accent font-medium block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-xs text-ivory/80">
              <li>
                <Link href="/projects" className="hover:text-ivory transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-ivory transition-colors">
                  Properties Directory
                </Link>
              </li>
              <li>
                <Link href="/plot-explorer" className="hover:text-ivory transition-colors">
                  CAD Plot Explorer
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-ivory transition-colors">
                  Locations & Connectivity
                </Link>
              </li>
              <li>
                <Link href="/trust-centre" className="hover:text-ivory transition-colors">
                  Trust Centre
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ivory transition-colors">
                  Contact & Site Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Regulatory (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-sans">
            <span className="text-xs uppercase tracking-[0.18em] text-accent font-medium block mb-2">
              Legal & Statutory
            </span>
            <ul className="space-y-2 text-xs text-ivory/80">
              <li>
                <Link
                  href={COMPLIANCE.authorityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ivory transition-colors inline-flex items-center gap-1.5"
                >
                  <span>TNRERA Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-accent" />
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" className="hover:text-ivory transition-colors">
                  Statutory Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-ivory transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-ivory/50 leading-relaxed">
              Prospective buyers are advised to independently verify layout sanctions and title certificates at our office prior to booking.
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-ivory/45 font-sans">
          <p className="max-w-2xl leading-relaxed">
            {COMPLIANCE.disclaimerText}
          </p>
          <span className="flex-shrink-0">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
