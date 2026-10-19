'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  TrendingUp, Calendar, ArrowRight, ShieldCheck, 
  MapPin, Clock, BookOpen 
} from 'lucide-react';

const INSIGHTS_ARTICLES = [
  {
    id: 'saravanampatti-appreciation-2026',
    title: 'Why Saravanampatti Land Values Grew by 18% in 2024–2026',
    excerpt: 'An in-depth analysis of the CHIL SEZ expansion, Keeranatham road widening, and the upcoming Coimbatore Metro Line 1 impact on residential plot values.',
    category: 'Market Trends',
    date: 'October 15, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    keyStat: '+18.4% YoY Appreciation'
  },
  {
    id: 'dtcp-vs-panchayat-approval-guide',
    title: 'DTCP vs. Unapproved Panchayat Plots: A Legal Guide for Buyers',
    excerpt: 'Learn why unapproved panchayat layouts can lead to demolition notices, loan rejections, and zero municipal water connections in Tamil Nadu.',
    category: 'Legal Due Diligence',
    date: 'September 28, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    keyStat: 'Mandatory DTCP Sanction'
  },
  {
    id: 'kovilpalayam-sathy-road-corridor',
    title: 'The Sathy Road Boom: Why Kovilpalayam at ₹5.60L/Cent is the Smartest Buy',
    excerpt: 'Connecting Saravanampatti with the Annur industrial corridor, Kovilpalayam offers pristine groundwater, wide roads, and unmatched entry pricing.',
    category: 'Growth Corridors',
    date: 'August 14, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    keyStat: '₹5.60L / Cent Entry Point'
  }
];

export default function InsightsPage() {
  return (
    <div className="pt-28 pb-20 bg-brand-warmwhite min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-secondary mb-3">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <span>/</span>
            <span className="text-brand-navy font-semibold">Insights & Guides</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-ice text-brand-primary text-xs font-mono font-bold rounded-md border border-brand-softblue/30 mb-3">
            <BookOpen className="w-4 h-4" />
            COIMBATORE REAL ESTATE INTELLIGENCE
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy tracking-tight">
            Market Insights & Due-Diligence Guides
          </h1>
          <p className="text-sm text-brand-secondary mt-2 max-w-2xl leading-relaxed">
            In-depth analysis, corridor appreciation reports, and legal guides authored by V.V Properties property analysts.
          </p>
        </div>

        {/* Featured Article Hero */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-brand-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8">
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-lg overflow-hidden bg-brand-ice border border-brand-border">
            <Image
              src={INSIGHTS_ARTICLES[0].image}
              alt={INSIGHTS_ARTICLES[0].title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-brand-primary text-white text-xs font-mono font-bold shadow-sm">
              {INSIGHTS_ARTICLES[0].category}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3 text-xs text-brand-secondary font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                {INSIGHTS_ARTICLES[0].date}
              </span>
              <span>•</span>
              <span>{INSIGHTS_ARTICLES[0].readTime}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy leading-snug">
              {INSIGHTS_ARTICLES[0].title}
            </h2>

            <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
              {INSIGHTS_ARTICLES[0].excerpt}
            </p>

            <div className="p-3 bg-brand-ice rounded-lg border border-brand-softblue/30 text-xs text-brand-navy font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-primary" />
              <span>Key Metric: {INSIGHTS_ARTICLES[0].keyStat}</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => alert('Full article dossier is available for download at our office.')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy text-white rounded-lg text-xs font-bold hover:bg-brand-primary transition-colors"
              >
                <span>Read Full Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid of Remaining Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INSIGHTS_ARTICLES.slice(1).map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-brand-border p-6 space-y-4 flex flex-col justify-between hover:border-brand-softblue transition-all"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-brand-ice border border-brand-border">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-brand-midnight text-white text-[10px] font-mono font-bold">
                    {article.category}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-brand-secondary font-mono">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-brand-navy leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-brand-secondary leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-brand-border flex items-center justify-between text-xs">
                <span className="font-bold text-brand-primary">{article.keyStat}</span>
                <button
                  onClick={() => alert('Full article available at our office.')}
                  className="font-bold text-brand-navy hover:text-brand-primary flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
