'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Scale, Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const { favourites, comparisonList, openSiteVisitModal } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Properties', href: '/properties' },
    { name: 'Locations', href: '/locations' },
    { name: 'About Us', href: '/about' },
    { name: 'Trust', href: '/trust-centre' },
    { name: 'Contact', href: '/contact' },
  ];

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors duration-150 ${
      pathname === href
        ? 'text-[#1565C0] font-semibold'
        : 'text-[#4A6278] hover:text-[#0E2138]'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-md border-b border-[#E2EBF3]' : 'border-b border-[#E2EBF3]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#E2EBF3] shadow-sm flex-shrink-0">
              <Image
                src="/brand/vv-properties-logo.jpg"
                alt="V.V Properties"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-[#0E2138] tracking-wide">
                V.V <span className="text-[#1565C0]">Properties</span>
              </span>
              <span className="text-[10px] text-[#94AAC0] uppercase tracking-widest">
                Coimbatore
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ──────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link key={l.name} href={l.href} className={linkClass(l.href)}>
                {l.name}
              </Link>
            ))}
          </nav>

          {/* ── Right actions ────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Saved */}
            {favourites.length > 0 && (
              <Link href="/dashboard#shortlist" className="relative text-[#4A6278] hover:text-[#0E2138] transition-colors">
                <Heart className="w-4 h-4" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#1565C0] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favourites.length}
                </span>
              </Link>
            )}

            {comparisonList.length > 0 && (
              <Link href="/compare" className="relative text-[#4A6278] hover:text-[#0E2138] transition-colors">
                <Scale className="w-4 h-4" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#1565C0] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {comparisonList.length}
                </span>
              </Link>
            )}

            <button
              onClick={() => openSiteVisitModal()}
              className="px-5 py-2 rounded-lg bg-[#1565C0] text-white text-sm font-semibold hover:bg-[#0D47A1] transition-colors shadow-sm"
            >
              Book Visit
            </button>
          </div>

          {/* ── Mobile hamburger ─────────────────────────────────────── */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg text-[#4A6278] hover:bg-[#F7FAFD] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ──────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E2EBF3] shadow-lg">
          <div className="px-5 py-4 space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.href
                    ? 'bg-[#EAF4FB] text-[#1565C0] font-semibold'
                    : 'text-[#4A6278] hover:bg-[#F7FAFD]'
                }`}
              >
                {l.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-[#E2EBF3]">
              <button
                onClick={() => { setMobileOpen(false); openSiteVisitModal(); }}
                className="w-full py-3 rounded-lg bg-[#1565C0] text-white text-sm font-semibold hover:bg-[#0D47A1] transition-colors"
              >
                Book Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
