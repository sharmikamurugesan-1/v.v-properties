'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, Mail, MapPin, Calendar, Clock, MessageSquare, 
  ExternalLink, CheckCircle2, ShieldCheck, Car 
} from 'lucide-react';
import { COMPANY_INFO, PROJECTS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function ContactPage() {
  const { addEnquiry, showToast } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectInterest, setProjectInterest] = useState(PROJECTS[0]?.name || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:30 AM');
  const [needCab, setNeedCab] = useState(false);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('Please enter your name and phone number', 'error');
      return;
    }

    addEnquiry({
      name,
      phone,
      email,
      project: projectInterest,
      enquiryType: 'general',
      preferredDate: date || undefined,
      preferredTime: time,
      needCabPickup: needCab,
      message
    });

    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-brand-warmwhite min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb & Title */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-secondary mb-3">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <span>/</span>
            <span className="text-brand-navy font-semibold">Contact & Site Visit</span>
          </div>

          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary block mb-1">
            DIRECT ENGAGEMENT
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy tracking-tight">
            Connect with V.V Properties
          </h1>
          <p className="text-sm text-brand-secondary mt-2 max-w-2xl leading-relaxed">
            Visit our corporate office on Sathy Main Road or schedule an on-site inspection with free AC cab pickup across Coimbatore.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Details & Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-brand-border shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-brand-navy">Coimbatore Head Office</h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-ice text-brand-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-brand-navy text-sm font-bold">Office Address</strong>
                    <p className="text-brand-secondary leading-relaxed mt-0.5">
                      {COMPANY_INFO.officeAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-ice text-brand-primary flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-brand-navy text-sm font-bold">Phone Hotlines</strong>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="text-brand-primary font-semibold block hover:underline mt-0.5">
                      {COMPANY_INFO.displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-ice text-brand-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-brand-navy text-sm font-bold">Official Email</strong>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-brand-secondary block hover:text-brand-primary mt-0.5">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20V.V%20Properties,%20I%20would%20like%20to%20connect%20regarding%20Coimbatore%20plots.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-brand-darkgreen hover:bg-brand-foliage text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Free Cab Inspection Notice */}
            <div className="p-5 rounded-xl bg-brand-ice/60 border border-brand-softblue/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-brand-navy">
                <Car className="w-4 h-4 text-brand-primary" />
                <span>Complimentary On-Site Cab Service</span>
              </div>
              <p className="text-brand-secondary leading-relaxed">
                We provide round-trip AC cab transportation for prospective buyers and families from anywhere in Coimbatore (Airport, Railway Station, RS Puram, Peelamedu, Gandhipuram).
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Contact & Visit Scheduler */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-10 border border-brand-border shadow-sm">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-brand-foliage/10 text-brand-darkgreen rounded-full flex items-center justify-center mx-auto border border-brand-foliage/20">
                  <CheckCircle2 className="w-10 h-10 text-brand-foliage" />
                </div>
                <h3 className="text-2xl font-bold text-brand-navy">Thank You for Connecting!</h3>
                <p className="text-sm text-brand-secondary max-w-sm mx-auto">
                  Your enquiry has been assigned to a Senior Property Consultant. We will call you on <strong className="text-brand-navy">{phone}</strong> within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-brand-primary text-white font-bold rounded-lg text-xs hover:bg-brand-royal transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-brand-navy">Send an Enquiry or Book Site Visit</h3>
                  <p className="text-xs text-brand-secondary mt-1">
                    Fill out the form below. Zero sales pressure, thoroughly verified documentation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Balaji Natarajan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-brand-cloudwhite text-sm text-brand-navy focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98422 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-brand-cloudwhite text-sm text-brand-navy focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="balaji@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-brand-cloudwhite text-sm text-brand-navy focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">
                      Interested Development
                    </label>
                    <select
                      value={projectInterest}
                      onChange={(e) => setProjectInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-sm text-brand-navy font-medium focus:outline-none focus:border-brand-primary bg-brand-cloudwhite"
                    >
                      {PROJECTS.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">
                      Preferred Date for Site Tour (Optional)
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-brand-cloudwhite text-sm text-brand-navy focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border text-sm text-brand-navy font-medium focus:outline-none focus:border-brand-primary bg-brand-cloudwhite"
                    >
                      <option value="10:00 AM">10:00 AM (Morning)</option>
                      <option value="02:30 PM">02:30 PM (Afternoon)</option>
                      <option value="05:00 PM">05:00 PM (Golden Hour)</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-brand-cloudwhite border border-brand-border">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-brand-navy">
                    <input
                      type="checkbox"
                      checked={needCab}
                      onChange={(e) => setNeedCab(e.target.checked)}
                      className="w-4 h-4 text-brand-primary rounded border-brand-border"
                    />
                    <span>Yes, arrange complimentary pickup & drop cab in Coimbatore</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">
                    Your Requirements or Specific Questions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Need an East-facing 3.5 Cent plot near Saravanampatti IT corridor..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-brand-cloudwhite text-xs sm:text-sm text-brand-navy focus:outline-none focus:border-brand-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-brand-primary hover:bg-brand-royal text-white font-bold rounded-lg text-sm transition-all shadow-sm"
                >
                  Submit Enquiry / Confirm Tour
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
