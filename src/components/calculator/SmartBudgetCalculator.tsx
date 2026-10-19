'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calculator, Printer, Share2, HelpCircle, ShieldCheck, 
  Sparkles, CheckCircle2, ArrowRight, IndianRupee 
} from 'lucide-react';
import { formatExactINR, formatLakhs } from '@/lib/utils';
import { TAMIL_NADU_BUYING_COST_RULES } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function SmartBudgetCalculator() {
  const { showToast } = useApp();

  // Inputs
  const [propertyPriceLakhs, setPropertyPriceLakhs] = useState<number>(45);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(20);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(8.65);
  const [buyerBudgetLakhs, setBuyerBudgetLakhs] = useState<number>(55);

  // Calculations
  const calculations = useMemo(() => {
    const baseCost = propertyPriceLakhs * 100000;
    
    // TN Stamp Duty: 7%
    const stampDuty = (baseCost * TAMIL_NADU_BUYING_COST_RULES.stampDutyPercent) / 100;
    
    // TN Registration Fee: 4%
    const registrationFee = (baseCost * TAMIL_NADU_BUYING_COST_RULES.registrationFeePercent) / 100;
    
    // Legal & Survey documentation
    const legalAndSurvey = TAMIL_NADU_BUYING_COST_RULES.legalVerificationCharges + TAMIL_NADU_BUYING_COST_RULES.documentationAndSurveyCharges;
    
    // Water & EB junction
    const infraCharges = TAMIL_NADU_BUYING_COST_RULES.waterAndEbInfrastructureCharges;

    // Total Acquisition Cost
    const totalAcquisitionCost = baseCost + stampDuty + registrationFee + legalAndSurvey + infraCharges;

    // Loan Amount
    const downPaymentAmount = (baseCost * downPaymentPercent) / 100;
    const loanPrincipal = Math.max(0, baseCost - downPaymentAmount);

    // Monthly EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const monthlyRate = interestRatePercent / 12 / 100;
    const totalMonths = loanTenureYears * 12;
    const emi = loanPrincipal > 0 
      ? (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

    // Budget Comparison
    const totalBuyerBudget = buyerBudgetLakhs * 100000;
    const budgetDifference = totalBuyerBudget - totalAcquisitionCost;

    return {
      baseCost,
      stampDuty,
      registrationFee,
      legalAndSurvey,
      infraCharges,
      totalAcquisitionCost,
      downPaymentAmount,
      loanPrincipal,
      emi,
      budgetDifference,
      isWithinBudget: budgetDifference >= 0
    };
  }, [propertyPriceLakhs, downPaymentPercent, loanTenureYears, interestRatePercent, buyerBudgetLakhs]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Calculator link copied to clipboard! 📋', 'success');
    }
  };

  return (
    <div className="w-full text-left">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-luxury border border-brand-bluegray">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-brand-bluegray">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-ice text-brand-electric text-xs font-bold rounded-full mb-2">
              <Calculator className="w-3.5 h-3.5" />
              Tamil Nadu Statutory Cost Transparency
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
              Smart Buying Cost & Loan EMI Calculator
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-1">
              Estimate your true end-to-end investment including Tamil Nadu Stamp Duty (7%), Registration (4%), and monthly EMI.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl border border-brand-bluegray hover:border-brand-electric text-brand-navy font-semibold transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-brand-steel" />
              <span>Print Cost Sheet</span>
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl border border-brand-bluegray hover:border-brand-electric text-brand-navy font-semibold transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4 text-brand-steel" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* 2-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* Left Column: Sliders and Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Property Price Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                  Property Value / Package Price
                </label>
                <span className="text-base font-extrabold text-brand-electric">
                  ₹{propertyPriceLakhs.toFixed(2)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="0.5"
                value={propertyPriceLakhs}
                onChange={(e) => setPropertyPriceLakhs(parseFloat(e.target.value))}
                className="w-full h-2 bg-brand-bluegray rounded-lg appearance-none cursor-pointer accent-brand-electric"
              />
              <div className="flex justify-between text-[10px] text-brand-steel font-semibold">
                <span>₹5 Lakhs (The Garden City)</span>
                <span>₹45 Lakhs (Tech Valley)</span>
                <span>₹1.50 Cr (Luxury Villa)</span>
              </div>
            </div>

            {/* Buyer Stated Total Budget */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                  Your Target Total Budget
                </label>
                <span className="text-base font-extrabold text-brand-navy">
                  ₹{buyerBudgetLakhs.toFixed(2)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="180"
                step="1"
                value={buyerBudgetLakhs}
                onChange={(e) => setBuyerBudgetLakhs(parseFloat(e.target.value))}
                className="w-full h-2 bg-brand-bluegray rounded-lg appearance-none cursor-pointer accent-brand-navy"
              />
              <div className="flex justify-between text-[10px] text-brand-steel font-semibold">
                <span>₹10 Lakhs</span>
                <span>₹55 Lakhs</span>
                <span>₹1.80 Cr</span>
              </div>
            </div>

            {/* Loan Down Payment Slider */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-brand-softwhite border border-brand-bluegray space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-brand-navy">Down Payment</span>
                  <span className="font-extrabold text-brand-electric">{downPaymentPercent}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="80"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-brand-bluegray rounded cursor-pointer accent-brand-electric"
                />
                <span className="text-[11px] text-brand-steel block">
                  Amount: {formatExactINR(calculations.downPaymentAmount)}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-brand-softwhite border border-brand-bluegray space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-brand-navy">Loan Tenure</span>
                  <span className="font-extrabold text-brand-navy">{loanTenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-brand-bluegray rounded cursor-pointer accent-brand-navy"
                />
                <span className="text-[11px] text-brand-steel block">
                  Interest Rate: {interestRatePercent}% (SBI/HDFC)
                </span>
              </div>
            </div>

            {/* Bank Loan Pre-Approval Notice */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block font-bold">85% Bank Loan Pre-Approved</strong>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  All V.V Properties plotted developments have full Project Approval Certificates (PAC) from SBI, HDFC, ICICI, and Axis Bank.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Complete Itemized Breakdown & EMI */}
          <div className="lg:col-span-5 bg-brand-midnight text-white rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase font-bold text-brand-electric tracking-widest block mb-1">
                Total Buying Cost Summary
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white">
                {formatExactINR(calculations.totalAcquisitionCost)}
              </div>
              <p className="text-[11px] text-brand-steel mt-1">
                Estimated all-inclusive outlay to register the plot in your name.
              </p>

              {/* Itemized Table */}
              <div className="mt-6 space-y-2.5 text-xs border-t border-white/10 pt-4">
                <div className="flex justify-between text-brand-ice/90">
                  <span>Base Property / Plot Cost</span>
                  <strong className="text-white">{formatExactINR(calculations.baseCost)}</strong>
                </div>

                <div className="flex justify-between text-brand-ice/90">
                  <span className="flex items-center gap-1">
                    TN Stamp Duty (7%)
                    <span className="text-[10px] text-brand-steel">(Govt. Statutory)</span>
                  </span>
                  <strong className="text-white">{formatExactINR(calculations.stampDuty)}</strong>
                </div>

                <div className="flex justify-between text-brand-ice/90">
                  <span className="flex items-center gap-1">
                    TN Registration Fee (4%)
                    <span className="text-[10px] text-brand-steel">(Sub-Registrar)</span>
                  </span>
                  <strong className="text-white">{formatExactINR(calculations.registrationFee)}</strong>
                </div>

                <div className="flex justify-between text-brand-ice/90">
                  <span>Legal Search & Patta Transfer</span>
                  <strong className="text-white">{formatExactINR(calculations.legalAndSurvey)}</strong>
                </div>

                <div className="flex justify-between text-brand-ice/90">
                  <span>EB & Underground Water Pipeline</span>
                  <strong className="text-white">{formatExactINR(calculations.infraCharges)}</strong>
                </div>
              </div>

              {/* Monthly EMI Highlight Box */}
              <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-electric block">
                    Estimated Monthly EMI
                  </span>
                  <span className="text-2xl font-black text-white">
                    {formatExactINR(Math.round(calculations.emi))} <span className="text-xs font-normal text-brand-ice/80">/ month</span>
                  </span>
                </div>
                <div className="text-right text-[11px] text-brand-steel">
                  <span>Tenure: {loanTenureYears} yrs</span>
                  <span className="block">Rate: {interestRatePercent}%</span>
                </div>
              </div>

              {/* Budget Feasibility Indicator */}
              <div className={`mt-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
                calculations.isWithinBudget 
                  ? 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-300' 
                  : 'bg-amber-950/80 border border-amber-500/30 text-amber-300'
              }`}>
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>
                  {calculations.isWithinBudget
                    ? `Comfortably within your ₹${buyerBudgetLakhs}L budget! Surplus: ${formatExactINR(calculations.budgetDifference)}`
                    : `Exceeds current budget setting by ${formatExactINR(Math.abs(calculations.budgetDifference))}. Consider extending tenure or adjusting down payment.`}
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-brand-steel leading-relaxed">
              * Note: Calculations are estimated based on prevailing Tamil Nadu Registration Department norms. Final stamp duty may depend on official guideline value.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
