'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { COMPANY } from '@/config/company';
import { useApp } from '@/context/AppContext';

export default function StickyMobileBar() {
  const { openSiteVisitModal } = useApp();
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        setIsInputFocused(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        setIsInputFocused(false);
      }
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);
    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  if (isInputFocused) return null;

  const whatsappHref = COMPANY.whatsapp
    ? `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
        'Hello V.V Properties, I would like to enquire about your residential plots in Coimbatore.'
      )}`
    : null;

  return (
    <aside
      aria-label="Quick Action Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-md border-t border-stone px-4 py-2.5 shadow-elevated"
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex items-center justify-between gap-2 max-w-sm mx-auto">
        
        {/* Call (Only rendered if phone is not null) */}
        {COMPANY.phone && (
          <a
            href={`tel:${COMPANY.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-stone text-ink text-xs font-sans font-medium min-h-[44px]"
          >
            <Phone className="w-3.5 h-3.5 text-accent" />
            <span>Call</span>
          </a>
        )}

        {/* WhatsApp (Only rendered if whatsapp is not null) */}
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-stone text-ink text-xs font-sans font-medium min-h-[44px]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-success" />
            <span>WhatsApp</span>
          </a>
        )}

        {/* Book Site Visit CTA */}
        <button
          onClick={() => openSiteVisitModal()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-ink text-ivory text-xs font-sans uppercase tracking-wider font-medium min-h-[44px] shadow-subtle"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Visit</span>
        </button>

      </div>
    </aside>
  );
}
