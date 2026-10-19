'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Compass, Calculator, Scale, Phone } from 'lucide-react';
import { useT } from '@/i18n';
import { COMPANY } from '@/config/company';
import { useApp } from '@/context/AppContext';

export default function Header() {
  const { language, setLanguage, t } = useT();
  const { openSiteVisitModal } = useApp();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const toolsRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver sentinel for 24px scroll without scroll listener performance tax
  useEffect(() => {
    const sentinel = document.getElementById('scroll-sentinel');
    if (!sentinel) {
      const handleScroll = () => setIsScrolled(window.scrollY > 24);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Body scroll lock and Escape to close when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Click outside to close tools dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 5 exact center links
  const centerLinks = [
    { name: t.nav.projects, href: '/projects' },
    { name: t.nav.properties, href: '/properties' },
    { name: t.nav.locations, href: '/locations' },
    { name: t.nav.trust, href: '/trust-centre' },
    { name: t.nav.contact, href: '/contact' }
  ];

  const toolsLinks = [
    { name: t.nav.plotExplorer, href: '/plot-explorer', icon: Compass },
    { name: t.nav.calculator, href: '/calculator', icon: Calculator },
    { name: t.nav.compare, href: '/compare', icon: Scale }
  ];

  const isHome = pathname === '/';

  return (
    <>
      {/* 0px height sentinel positioned 24px from top */}
      <div id="scroll-sentinel" className="absolute top-[24px] left-0 w-full h-[1px] pointer-events-none" />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-ink text-ivory rounded-full text-xs font-sans uppercase tracking-wider"
      >
        {t.nav.skipToContent}
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHome
            ? 'bg-ivory/95 backdrop-blur-md border-b border-stone py-4 shadow-subtle text-ink'
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 sm:py-6 text-paper'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 flex items-center justify-between">
          
          {/* Brand Logo & Wordmark */}
          <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-paper border border-stone/20 flex-shrink-0">
              <Image
                src="/brand/vv-properties-logo.jpg"
                alt="V.V Properties Logo"
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <span
                className={`font-serif text-lg tracking-tight leading-none ${
                  isScrolled || !isHome ? 'text-ink' : 'text-paper'
                }`}
              >
                V.V <span className="font-sans text-xs uppercase tracking-[0.16em] ml-1 font-semibold">Properties</span>
              </span>
              <span
                className={`text-[9px] uppercase tracking-[0.2em] mt-0.5 font-sans ${
                  isScrolled || !isHome ? 'text-muted' : 'text-paper/70'
                }`}
              >
                Coimbatore
              </span>
            </div>
          </Link>

          {/* Desktop Center Links (Exactly 5) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center space-x-8 text-[13px] font-sans tracking-wide"
          >
            {centerLinks.slice(0, 2).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? isScrolled || !isHome
                        ? 'text-ink font-semibold'
                        : 'text-paper font-semibold'
                      : isScrolled || !isHome
                      ? 'text-muted hover:text-ink'
                      : 'text-paper/80 hover:text-paper'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Tools Dropdown under Properties */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                onMouseEnter={() => setToolsOpen(true)}
                aria-expanded={toolsOpen}
                className={`flex items-center gap-1 transition-colors duration-200 ${
                  toolsLinks.some((l) => pathname === l.href)
                    ? isScrolled || !isHome
                      ? 'text-ink font-semibold'
                      : 'text-paper font-semibold'
                    : isScrolled || !isHome
                    ? 'text-muted hover:text-ink'
                    : 'text-paper/80 hover:text-paper'
                }`}
              >
                <span>{t.nav.tools}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsOpen && (
                <div
                  onMouseLeave={() => setToolsOpen(false)}
                  className="absolute top-full left-0 mt-3 w-56 bg-paper rounded-xl shadow-elevated border border-stone p-2 text-left animate-in fade-in slide-in-from-top-1 duration-150 z-50"
                >
                  {toolsLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setToolsOpen(false)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg text-xs font-sans transition-colors ${
                          isActive ? 'bg-ivory text-ink font-semibold' : 'hover:bg-ivory/60 text-ink'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {centerLinks.slice(2).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? isScrolled || !isHome
                        ? 'text-ink font-semibold'
                        : 'text-paper font-semibold'
                      : isScrolled || !isHome
                      ? 'text-muted hover:text-ink'
                      : 'text-paper/80 hover:text-paper'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Subtle Language Toggle (EN | தமிழ்) */}
            <div
              className={`flex items-center text-[11px] font-sans tracking-wider ${
                isScrolled || !isHome ? 'text-muted' : 'text-paper/75'
              }`}
            >
              <button
                onClick={() => setLanguage('en')}
                className={`transition-colors ${
                  language === 'en'
                    ? isScrolled || !isHome
                      ? 'text-ink font-bold'
                      : 'text-paper font-bold'
                    : isScrolled || !isHome
                    ? 'hover:text-ink'
                    : 'hover:text-paper'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="mx-2 opacity-30">|</span>
              <button
                onClick={() => setLanguage('ta')}
                className={`transition-colors ${
                  language === 'ta'
                    ? isScrolled || !isHome
                      ? 'text-ink font-bold'
                      : 'text-paper font-bold'
                    : isScrolled || !isHome
                    ? 'hover:text-ink'
                    : 'hover:text-paper'
                }`}
                aria-label="Switch to Tamil"
              >
                தமிழ்
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => openSiteVisitModal()}
              className={`px-6 py-2.5 rounded-full text-xs font-sans uppercase tracking-wider font-medium transition-all duration-300 min-h-[44px] shadow-subtle ${
                isScrolled || !isHome
                  ? 'bg-ink text-ivory hover:bg-ink-soft'
                  : 'bg-paper text-ink hover:bg-paper/90'
              }`}
            >
              {t.nav.bookVisit}
            </button>
          </div>

          {/* Mobile Menu Trigger (<1024px) */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors ${
                isScrolled || !isHome ? 'text-ink hover:bg-stone/30' : 'text-paper hover:bg-white/10'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Full-Screen Slide-In Drawer with Focus Trap & Body Scroll Lock */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 bg-ivory text-ink flex flex-col justify-between p-6 sm:p-10 animate-in slide-in-from-top duration-300 overflow-y-auto"
        >
          {/* Header row in mobile menu */}
          <div className="flex items-center justify-between pb-6 border-b border-stone">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-paper border border-stone">
                <Image
                  src="/brand/vv-properties-logo.jpg"
                  alt="V.V Properties Logo"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-lg text-ink font-normal">V.V Properties</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center text-ink hover:bg-stone/30"
              aria-label={t.nav.close}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stacked Serif Navigation Links */}
          <nav className="py-8 space-y-5 text-left">
            {centerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-serif text-3xl text-ink hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-stone space-y-2">
              <span className="text-xs uppercase tracking-wider text-muted font-sans block mb-2">
                {t.nav.tools}
              </span>
              {toolsLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 text-sm text-ink hover:text-accent font-sans"
                >
                  <item.icon className="w-4 h-4 text-accent" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Pinned Mobile Footer Row: Language, CTA, Social */}
          <div className="pt-6 border-t border-stone space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted font-sans">Language</span>
              <div className="flex items-center gap-3 text-xs font-sans">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full ${language === 'en' ? 'bg-ink text-ivory font-bold' : 'text-muted'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('ta')}
                  className={`px-3 py-1 rounded-full ${language === 'ta' ? 'bg-ink text-ivory font-bold' : 'text-muted'}`}
                >
                  தமிழ்
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openSiteVisitModal();
              }}
              className="w-full py-3.5 rounded-full bg-ink text-ivory text-xs font-sans uppercase tracking-wider font-medium shadow-subtle min-h-[44px]"
            >
              {t.nav.bookVisit}
            </button>

            <div className="flex items-center justify-center gap-6 pt-2 text-xs text-muted">
              <Link href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                Instagram
              </Link>
              <Link href={COMPANY.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                YouTube
              </Link>
              {COMPANY.phone && (
                <a href={`tel:${COMPANY.phone}`} className="hover:text-ink">
                  Call
                </a>
              )}
            </div>
          </div>

        </div>
      )}
    </>
  );
}
