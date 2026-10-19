'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, Check, ArrowRight, ArrowLeft, RefreshCw, 
  MapPin, ShieldCheck, Heart, Scale, Calendar 
} from 'lucide-react';
import { PROPERTIES } from '@/data/mockData';
import { formatLakhs } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

export default function PropertyMatchmaker() {
  const { openSiteVisitModal, t } = useApp();
  const [step, setStep] = useState(1);

  // User selections
  const [propertyType, setPropertyType] = useState<string>('plot');
  const [corridor, setCorridor] = useState<string>('any');
  const [budgetTier, setBudgetTier] = useState<string>('any');
  const [sizeTier, setSizeTier] = useState<string>('any');
  const [buyerGoal, setBuyerGoal] = useState<string>('immediate-living');

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(1);
    setPropertyType('plot');
    setCorridor('any');
    setBudgetTier('any');
    setSizeTier('any');
    setBuyerGoal('immediate-living');
  };

  // Match algorithm
  const matchedProperties = PROPERTIES.filter((prop) => {
    if (propertyType !== 'any' && prop.type !== propertyType) return false;
    if (corridor !== 'any' && !prop.corridor.toLowerCase().includes(corridor.toLowerCase())) return false;
    
    if (budgetTier === 'under20' && prop.totalPrice > 25) return false;
    if (budgetTier === '20to50' && (prop.totalPrice < 20 || prop.totalPrice > 55)) return false;
    if (budgetTier === 'above50' && prop.totalPrice < 50) return false;

    if (sizeTier === 'small' && prop.areaCents > 3.5) return false;
    if (sizeTier === 'medium' && (prop.areaCents < 3.2 || prop.areaCents > 5.0)) return false;
    if (sizeTier === 'large' && prop.areaCents < 4.5) return false;

    return true;
  });

  const getMatchReason = (prop: typeof PROPERTIES[0]) => {
    const reasons: string[] = [];
    if (prop.suitableFor.includes(buyerGoal as any)) {
      reasons.push(
        buyerGoal === 'immediate-living'
          ? "Ready for immediate construction with paved road and water provision"
          : buyerGoal === 'high-appreciation-investment'
            ? "Located in prominent IT/Highway growth belt"
            : "Clear title parent deed with low holding cost for building in 2-3 years"
      );
    }
    if (prop.distanceToITParkKm <= 3) {
      reasons.push(`Just ${prop.distanceToITParkKm} KM from CHIL SEZ IT Park`);
    } else {
      reasons.push(`Unbeatable price per cent in ${prop.location}`);
    }
    return reasons;
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-10 shadow-luxury border border-brand-bluegray text-left">
      {/* Header and Step Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-ice text-brand-electric text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            V.V Property Matchmaker
          </div>
          <span className="text-xs font-bold text-brand-steel">
            Step {step} of {totalSteps}
          </span>
        </div>

        {/* Electric Blue Progress Bar */}
        <div className="w-full h-2 bg-brand-bluegray rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-electric transition-all duration-300 rounded-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Property Type */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="text-2xl font-bold text-brand-navy">What type of real estate are you looking for?</h3>
            <p className="text-xs text-brand-muted mt-1">Select your preferred asset category in Coimbatore.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'plot', title: 'DTCP Residential Plots', desc: 'Independent villa plots with verified clear titles' },
              { id: 'villa', title: 'Turnkey Luxury Villa', desc: 'Custom 3 & 4 BHK villas designed to your taste' },
              { id: 'farmland', title: 'Managed Farm Land', desc: 'Fruit orchard & serene weekend farmland plots' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPropertyType(item.id);
                  handleNext();
                }}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  propertyType === item.id 
                    ? 'border-brand-electric bg-brand-ice/50 shadow-md ring-2 ring-brand-electric/20' 
                    : 'border-brand-bluegray hover:border-brand-steel hover:bg-brand-softwhite'
                }`}
              >
                <strong className="block text-sm font-bold text-brand-navy">{item.title}</strong>
                <p className="text-xs text-brand-muted mt-1">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Location / Corridor */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="text-2xl font-bold text-brand-navy">Which Coimbatore corridor do you prefer?</h3>
            <p className="text-xs text-brand-muted mt-1">We operate verified projects across all key growth axes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'any', title: 'Open to All Areas', desc: 'Show me verified opportunities across Coimbatore' },
              { id: 'saravanampatti', title: 'Saravanampatti IT Hub', desc: 'Near CHIL SEZ, Cognizant, Bosch & Corporation limit' },
              { id: 'sathy', title: 'Sathy Road / Kovilpalayam', desc: 'Growth corridor with pre-approved bank loans' },
              { id: 'airport', title: 'Kalapatti / Airport Corridor', desc: 'Quick 8-minute commute to Airport and KMCH medical hub' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCorridor(item.id);
                  handleNext();
                }}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  corridor === item.id 
                    ? 'border-brand-electric bg-brand-ice/50 shadow-md ring-2 ring-brand-electric/20' 
                    : 'border-brand-bluegray hover:border-brand-steel hover:bg-brand-softwhite'
                }`}
              >
                <strong className="block text-sm font-bold text-brand-navy">{item.title}</strong>
                <p className="text-xs text-brand-muted mt-1">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Budget Range */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="text-2xl font-bold text-brand-navy">What is your total investment budget?</h3>
            <p className="text-xs text-brand-muted mt-1">Includes plot package price. Bank loans available up to 85%.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'under20', title: 'Under ₹20 Lakhs', desc: 'Affordable entry into Kovilpalayam starting at ₹15.40L' },
              { id: '20to50', title: '₹20 to ₹50 Lakhs', desc: 'Prime plots in Tech Valley and Greenfield Meadows' },
              { id: 'above50', title: 'Above ₹50 Lakhs', desc: 'Large corner plots, duplex plots & executive villa land' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setBudgetTier(item.id);
                  handleNext();
                }}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  budgetTier === item.id 
                    ? 'border-brand-electric bg-brand-ice/50 shadow-md ring-2 ring-brand-electric/20' 
                    : 'border-brand-bluegray hover:border-brand-steel hover:bg-brand-softwhite'
                }`}
              >
                <strong className="block text-sm font-bold text-brand-navy">{item.title}</strong>
                <p className="text-xs text-brand-muted mt-1">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Size Tier */}
      {step === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="text-2xl font-bold text-brand-navy">What size or land area do you need?</h3>
            <p className="text-xs text-brand-muted mt-1">1 Cent = 435.6 Square Feet in Tamil Nadu.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'small', title: '2.5 to 3.5 Cents', desc: 'Approx 1,100 - 1,500 Sq.Ft. Perfect for modern 3 BHK villa' },
              { id: 'medium', title: '3.5 to 5.0 Cents', desc: 'Approx 1,500 - 2,200 Sq.Ft. Ample garden space & car portico' },
              { id: 'large', title: 'Above 5.0 Cents', desc: 'Approx 2,200+ Sq.Ft. Grand estate or twin house layout' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSizeTier(item.id);
                  handleNext();
                }}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  sizeTier === item.id 
                    ? 'border-brand-electric bg-brand-ice/50 shadow-md ring-2 ring-brand-electric/20' 
                    : 'border-brand-bluegray hover:border-brand-steel hover:bg-brand-softwhite'
                }`}
              >
                <strong className="block text-sm font-bold text-brand-navy">{item.title}</strong>
                <p className="text-xs text-brand-muted mt-1">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Buyer Primary Goal */}
      {step === 5 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="text-2xl font-bold text-brand-navy">What is the primary purpose of your purchase?</h3>
            <p className="text-xs text-brand-muted mt-1">This helps us match the right water connection, road width, and possession status.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'immediate-living', title: 'Immediate Construction', desc: 'Start building your dream home within 3-6 months' },
              { id: 'build-later', title: 'Build in 1-3 Years', desc: 'Hold safe registered land with verified clear title' },
              { id: 'high-appreciation-investment', title: 'High Capital Growth', desc: 'Invest in the IT expansion corridor for maximum ROI' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setBuyerGoal(item.id);
                  setStep(6); // Go to results
                }}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  buyerGoal === item.id 
                    ? 'border-brand-electric bg-brand-ice/50 shadow-md ring-2 ring-brand-electric/20' 
                    : 'border-brand-bluegray hover:border-brand-steel hover:bg-brand-softwhite'
                }`}
              >
                <strong className="block text-sm font-bold text-brand-navy">{item.title}</strong>
                <p className="text-xs text-brand-muted mt-1">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 6: Tailored Results Screen */}
      {step === 6 && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-brand-bluegray">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-2">
                <Check className="w-3.5 h-3.5" />
                Matching Inventory Found ({matchedProperties.length > 0 ? matchedProperties.length : PROPERTIES.length} Matches)
              </div>
              <h3 className="text-2xl font-bold text-brand-navy">Curated Properties Matching Your Criteria</h3>
              <p className="text-xs text-brand-muted mt-1">
                Grounded strictly in verified DTCP & RERA approved inventory in Coimbatore.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl border border-brand-bluegray hover:border-brand-electric text-brand-navy font-semibold text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-brand-electric" />
              <span>Modify Preferences</span>
            </button>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(matchedProperties.length > 0 ? matchedProperties : PROPERTIES.slice(0, 2)).map((prop) => {
              const matchReasons = getMatchReason(prop);
              return (
                <div key={prop.id} className="p-5 rounded-3xl bg-brand-softwhite border border-brand-bluegray space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-brand-ice">
                      <Image
                        src={prop.featuredImage}
                        alt={prop.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand-midnight/90 backdrop-blur-md text-white text-[10px] font-bold rounded-lg">
                        {prop.projectTitle}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-brand-navy">{prop.title}</h4>
                      <p className="text-xs text-brand-muted flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-electric" />
                        {prop.location}
                      </p>
                    </div>

                    {/* Why this matches box */}
                    <div className="p-3 rounded-xl bg-brand-ice/70 border border-brand-pale text-xs space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-brand-electric tracking-wider block">
                        Why This Matches You:
                      </span>
                      {matchReasons.map((reason, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-brand-navy text-[11px] font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-brand-bluegray flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-brand-steel uppercase font-bold block">Package Cost</span>
                      <strong className="text-lg font-black text-brand-navy">{formatLakhs(prop.totalPrice)}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openSiteVisitModal(prop.projectTitle, prop.title)}
                        className="py-2 px-3 bg-brand-electric hover:bg-brand-royal text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                      >
                        Book Visit
                      </button>
                      <Link
                        href={`/properties/${prop.slug}`}
                        className="py-2 px-3 border border-brand-bluegray hover:border-brand-steel text-brand-navy rounded-xl text-xs font-bold transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Buttons for Steps 1-5 */}
      {step <= 5 && (
        <div className="mt-8 pt-6 border-t border-brand-bluegray flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl border border-brand-bluegray text-brand-navy hover:bg-brand-softwhite font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-brand-electric hover:bg-brand-royal text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-luxury"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
