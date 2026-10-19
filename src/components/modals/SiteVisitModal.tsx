'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Car, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PROJECTS } from '@/data/mockData';

export default function SiteVisitModal() {
  const { isSiteVisitModalOpen, closeSiteVisitModal, modalPrefill, addEnquiry, showToast } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [plotNumber, setPlotNumber] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:30 AM');
  const [needCabPickup, setNeedCabPickup] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (modalPrefill.project) {
      setSelectedProject(modalPrefill.project);
    } else if (PROJECTS.length > 0) {
      setSelectedProject(PROJECTS[0].name);
    }

    if (modalPrefill.plot) {
      setPlotNumber(modalPrefill.plot);
    }

    // Set default tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, [modalPrefill]);

  if (!isSiteVisitModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('Please provide your name and phone number', 'error');
      return;
    }

    addEnquiry({
      name,
      phone,
      email,
      project: selectedProject,
      plotNumber: plotNumber ? `Plot ${plotNumber}` : undefined,
      enquiryType: 'site-visit',
      preferredDate: date,
      preferredTime: timeSlot,
      needCabPickup,
      message: `${needCabPickup ? `[CAB PICKUP REQUESTED at: ${pickupLocation}] ` : ''}${message}`
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeSiteVisitModal();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-brand-bluegray relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeSiteVisitModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-brand-ice hover:bg-brand-pale text-brand-navy flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-brand-navy">Site Visit Scheduled!</h3>
            <p className="text-sm text-brand-muted max-w-sm mx-auto">
              Thank you, <strong className="text-brand-navy">{name}</strong>. Our senior property coordinator has received your request for <strong className="text-brand-electric">{selectedProject}</strong> on <strong className="text-brand-navy">{date} at {timeSlot}</strong>.
            </p>
            <div className="text-xs bg-brand-ice p-3 rounded-xl text-brand-navy font-medium">
              We will call you on {phone} within 15 minutes to confirm car pickup / meeting point.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-ice text-brand-electric text-xs font-bold rounded-full mb-2">
                <Calendar className="w-3.5 h-3.5" />
                V.V Properties Executive Site Visit
              </div>
              <h2 className="text-2xl font-bold text-brand-navy">Schedule Your Site Tour</h2>
              <p className="text-xs text-brand-muted mt-1">
                Experience the 40ft wide blacktop roads, DTCP boundaries, and natural groundwater first-hand.
              </p>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">
                  Selected Development <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-bluegray bg-brand-softwhite text-sm text-brand-navy focus:outline-none focus:border-brand-electric font-medium"
                  required
                >
                  {PROJECTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} (from ₹{p.priceStartingPerCent}L/Cent)
                    </option>
                  ))}
                </select>
              </div>

              {plotNumber && (
                <div className="p-3 bg-brand-ice/70 rounded-xl border border-brand-pale flex items-center justify-between text-xs">
                  <span className="font-semibold text-brand-navy">Selected Plot for On-Site Inspection:</span>
                  <span className="px-2 py-0.5 bg-brand-electric text-white font-bold rounded">
                    Plot {plotNumber}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Murugan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-bluegray bg-white text-sm text-brand-navy focus:outline-none focus:border-brand-electric"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">
                    Mobile Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98422 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-bluegray bg-white text-sm text-brand-navy focus:outline-none focus:border-brand-electric"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">
                    Preferred Visit Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-bluegray bg-white text-sm text-brand-navy focus:outline-none focus:border-brand-electric"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">
                    Preferred Time Slot <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-bluegray bg-white text-sm text-brand-navy focus:outline-none focus:border-brand-electric"
                  >
                    <option value="09:30 AM">09:30 AM (Cool Morning)</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="05:00 PM">05:00 PM (Sunset Golden Hour)</option>
                  </select>
                </div>
              </div>

              {/* Complimentary Cab Option */}
              <div className="p-3.5 rounded-xl bg-brand-softwhite border border-brand-bluegray space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needCabPickup}
                    onChange={(e) => setNeedCabPickup(e.target.checked)}
                    className="w-4 h-4 text-brand-electric rounded border-brand-bluegray focus:ring-brand-electric"
                  />
                  <span className="text-xs font-bold text-brand-navy flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-brand-electric" />
                    Request Free AC Cab Pickup & Drop across Coimbatore
                  </span>
                </label>

                {needCabPickup && (
                  <div className="pt-2 animate-in fade-in duration-200">
                    <input
                      type="text"
                      placeholder="Enter pickup address (e.g., Peelamedu, Gandhipuram, RS Puram)"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-brand-pale bg-white text-xs text-brand-navy focus:outline-none focus:border-brand-electric"
                      required={needCabPickup}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">
                  Specific Requirements or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking for East facing plot, would like to inspect DTCP approval copy..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-bluegray bg-white text-xs text-brand-navy focus:outline-none focus:border-brand-electric resize-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-brand-electric hover:bg-brand-royal text-white font-bold rounded-xl shadow-luxury hover:shadow-glow-blue transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Calendar className="w-4 h-4" />
                Confirm Site Visit Booking
              </button>
              <div className="flex items-center justify-center gap-1 text-[11px] text-brand-steel mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-electric" />
                Zero obligation. Verified documentation presented on-site.
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
