'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, Calendar, ChevronDown, Compass, 
  Calculator, Scale, Heart
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const { 
    language, 
    setLanguage, 
    favourites, 
    comparisonList, 
    openSiteVisitModal 
  } = useApp();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close tools dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'Properties', href: '/properties' },
    { name: 'Locations', href: '/locations' },
    { name: 'Trust', href: '/trust-centre' },
    { name: 'Contact', href: '/contact' },
  ];

  const toolsLinks = [
    { name: 'Plot Explorer', href: '/plot-explorer', icon: Compass, desc: 'Interactive CAD parcel grid' },
    { name: 'Calculator', href: '/calculator', icon: Calculator, desc: 'Acquisition & EMI estimates' },
    { name: 'Compare', href: '/compare', icon: Scale, desc: 'Side-by-side plot comparison' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAFAF8]/95 backdrop-blur-md border-b border-black/[0.06] shadow-sm py-4' 
          : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Editorial Typography */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white border border-black/10 flex-shrink-0 shadow-sm">
              <Image
                src="/brand/vv-properties-logo.jpg"
                alt="V.V Properties Logo"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-base font-serif tracking-tight leading-none ${isScrolled ? 'text-[#0E2138]' : 'text-white'}`}>
                V.V <span className={`font-sans font-bold text-xs uppercase tracking-widest ml-1 ${isScrolled ? 'text-[#102B50]' : 'text-white/90'}`}>Properties</span>
              </span>
              <span className={`text-[9px] uppercase tracking-[0.2em] mt-1 font-sans ${isScrolled ? 'text-[#65758B]' : 'text-white/70'}`}>
                Coimbatore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[13px] font-sans tracking-wide">
            {navLinks.slice(0, 3).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    isActive 
                      ? isScrolled ? 'text-[#0E2138] font-semibold' : 'text-white font-semibold'
                      : isScrolled ? 'text-[#475569] hover:text-[#0E2138]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Tools Dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onMouseEnter={() => setToolsDropdownOpen(true)}
                className={`flex items-center gap-1 transition-colors duration-200 ${
                  toolsLinks.some((l) => pathname === l.href)
                    ? isScrolled ? 'text-[#0E2138] font-semibold' : 'text-white font-semibold'
                    : isScrolled ? 'text-[#475569] hover:text-[#0E2138]' : 'text-white/80 hover:text-white'
                }`}
                aria-expanded={toolsDropdownOpen}
              >
                <span>Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Tools Dropdown Menu */}
              {toolsDropdownOpen && (
                <div 
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                  className="absolute top-full left-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-black/[0.08] p-2 text-left animate-in fade-in slide-in-from-top-1 duration-150 z-50"
                >
                  {toolsLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setToolsDropdownOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
                          isActive ? 'bg-[#F1F5F9] text-[#0E2138]' : 'hover:bg-[#F8FAFC] text-[#334155]'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#102B50] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-xs font-semibold block text-[#0E2138]">{item.name}</span>
                          <span className="text-[11px] text-[#64748B] block mt-0.5">{item.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {navLinks.slice(3).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    isActive 
                      ? isScrolled ? 'text-[#0E2138] font-semibold' : 'text-white font-semibold'
                      : isScrolled ? 'text-[#475569] hover:text-[#0E2138]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Subtle Language Toggle */}
            <div className={`flex items-center text-[11px] font-sans tracking-wider ${isScrolled ? 'text-[#64748B]' : 'text-white/70'}`}>
              <button
                onClick={() => setLanguage('en')}
                className={`transition-colors ${
                  language === 'en' 
                    ? isScrolled ? 'text-[#0E2138] font-bold' : 'text-white font-bold'
                    : isScrolled ? 'hover:text-[#0E2138]' : 'hover:text-white'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="mx-1.5 opacity-30">/</span>
              <button
                onClick={() => setLanguage('ta')}
                className={`transition-colors ${
                  language === 'ta' 
                    ? isScrolled ? 'text-[#0E2138] font-bold' : 'text-white font-bold'
                    : isScrolled ? 'hover:text-[#0E2138]' : 'hover:text-white'
                }`}
                aria-label="Switch to Tamil"
              >
                தமிழ்
              </button>
            </div>

            {/* Subtle Shortlist & Compare Indicators */}
            {favourites.length > 0 && (
              <Link 
                href="/dashboard#shortlist" 
                className={`relative transition-colors p-1 ${isScrolled ? 'text-[#475569] hover:text-[#0E2138]' : 'text-white/80 hover:text-white'}`}
                title={`${favourites.length} saved properties`}
              >
                <Heart className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#102B50] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favourites.length}
                </span>
              </Link>
            )}

            {comparisonList.length > 0 && (
              <Link 
                href="/compare" 
                className={`relative transition-colors p-1 ${isScrolled ? 'text-[#475569] hover:text-[#0E2138]' : 'text-white/80 hover:text-white'}`}
                title={`${comparisonList.length} compared properties`}
              >
                <Scale className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#102B50] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {comparisonList.length}
                </span>
              </Link>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => openSiteVisitModal()}
              className={`px-5 py-2.5 text-xs font-sans font-semibold rounded-lg transition-all shadow-sm tracking-wide ${
                isScrolled
                  ? 'bg-[#0E2138] hover:bg-[#1A365D] text-white'
                  : 'bg-white hover:bg-white/90 text-[#0E2138]'
              }`}
            >
              Book Site Visit
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-[#0E2138] hover:bg-black/[0.04]' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#FAFAF8] border-b border-black/[0.08] shadow-lg max-h-[85vh] overflow-y-auto p-6 text-left animate-in slide-in-from-top-2 duration-200">
          
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] text-xs">
            <span className="text-[#64748B]">Language</span>
            <div className="flex items-center gap-3 font-sans">
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs ${language === 'en' ? 'font-bold text-[#0E2138]' : 'text-[#64748B]'}`}
              >
                English
              </button>
              <span className="text-black/20">|</span>
              <button
                onClick={() => setLanguage('ta')}
                className={`text-xs ${language === 'ta' ? 'font-bold text-[#0E2138]' : 'text-[#64748B]'}`}
              >
                தமிழ்
              </button>
            </div>
          </div>

          <div className="py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-sans ${
                  pathname === link.href ? 'font-semibold text-[#0E2138] bg-black/[0.04]' : 'text-[#334155]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2 pb-1 border-t border-black/[0.06] mt-2">
              <span className="px-3 text-[11px] font-sans uppercase tracking-wider text-[#64748B] block mb-1">
                Tools
              </span>
              {toolsLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#334155] hover:text-[#0E2138]"
                >
                  <item.icon className="w-3.5 h-3.5 text-[#102B50]" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-black/[0.06]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openSiteVisitModal();
              }}
              className="w-full py-3 px-4 rounded-lg bg-[#0E2138] text-white font-sans font-semibold text-xs tracking-wide"
            >
              Book Site Visit
            </button>
          </div>

        </div>
      )}
    </header>
  );
}
