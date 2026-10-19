'use client';

import React from 'react';
import { CheckCircle2, Clock, Calendar, ShieldCheck, Download, FileText } from 'lucide-react';

interface Milestone {
  phase: string;
  title: string;
  tamilTitle: string;
  status: 'completed' | 'active' | 'upcoming';
  date: string;
  description: string;
  deliverables: string[];
}

interface ConstructionTimelineProps {
  projectName: string;
}

const MILESTONES: Milestone[] = [
  {
    phase: 'Phase 01',
    title: 'Legal Scrutiny & Clear Title Verification',
    tamilTitle: 'சட்ட ஆவணங்கள் மற்றும் 30 ஆண்டு வில்லங்கச் சான்றிதழ்',
    status: 'completed',
    date: 'Q1 2023',
    description: '30-year unbroken parent deed search, certified Nil Encumbrance Certificate (EC), and Senior High Court legal opinion.',
    deliverables: ['Original Parent Deeds', 'Certified 30-Year Nil EC', 'Legal Clearance Certificate']
  },
  {
    phase: 'Phase 02',
    title: 'DTCP Layout Sanction & TNRERA Registration',
    tamilTitle: 'DTCP மற்றும் TNRERA அரசு அங்கீகாரம்',
    status: 'completed',
    date: 'Q3 2023',
    description: 'Statutory approval from Coimbatore District Town & Country Planning with all statutory open space reserves gifted to the local panchayat.',
    deliverables: ['Sanctioned Layout Map', 'TNRERA Registration Dossier', 'Panchayat Gift Deeds']
  },
  {
    phase: 'Phase 03',
    title: 'Site Demarcation & Total Station Pegs',
    tamilTitle: 'நில அளவீடு மற்றும் எல்லைக் கற்கள் நடுதல்',
    status: 'completed',
    date: 'Q4 2023',
    description: 'Precision geo-spatial boundary marking with reinforced stone boundary pillars for every individual villa plot.',
    deliverables: ['Total Station Coordinates', 'Individual Plot Boundary Stones', 'Road Centerline Alignment']
  },
  {
    phase: 'Phase 04',
    title: '40ft Blacktop Roads & Storm Drainage',
    tamilTitle: '40 அடி தார் சாலை மற்றும் மழைநீர் வடிகால்',
    status: 'completed',
    date: 'Q2 2024',
    description: 'Heavy compaction bitumen road surfaces engineered for dual-lane vehicular circulation with covered side gutters.',
    deliverables: ['40ft Bitumen Layer', 'RCC Storm Drains', 'Heavy-Duty Street Kerbing']
  },
  {
    phase: 'Phase 05',
    title: 'Underground Water Conduits & EB Network',
    tamilTitle: 'குடிநீர் குழாய் இணைப்பு மற்றும் மின் கம்பங்கள்',
    status: 'active',
    date: 'Current Stage',
    description: 'Subterranean distribution network with individual plot valving and dedicated electricity lines with LED street illumination.',
    deliverables: ['CPVC Water Conduits to each plot', 'TNEB Transformer Sanction', 'LED Street Lighting']
  },
  {
    phase: 'Phase 06',
    title: 'Direct Deed Registration & Villa Construction',
    tamilTitle: 'உடனடி பத்திரப் பதிவு மற்றும் இல்லக் கட்டுமானம்',
    status: 'active',
    date: 'Ready for Possession',
    description: 'Direct deed execution at the Sub-Registrar office with instant possession and customized architectural villa design consultation.',
    deliverables: ['Immediate Sub-Registrar Registration', 'Individual Patta Transfer Support', 'Architectural Blueprints']
  }
];

export default function ConstructionTimeline({ projectName }: ConstructionTimelineProps) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-10 border border-brand-border shadow-subtle text-left space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-brand-divider pb-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-electric block">
            Infrastructure Governance
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy mt-1">
            Verified Development Milestones & Handover
          </h3>
          <p className="text-xs text-brand-subtext mt-0.5">
            Real-time infrastructure execution schedule for {projectName.split('—')[0]}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-brand-botanical text-brand-darkgreen text-xs font-bold rounded-lg border border-brand-foliage/30 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-foliage" />
            <span>Audit-Verified</span>
          </span>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-border">
        {MILESTONES.map((m, idx) => {
          const isCompleted = m.status === 'completed';
          const isActive = m.status === 'active';

          return (
            <div key={idx} className="relative group">
              
              {/* Dot Icon Indicator */}
              <div className={`absolute -left-[30px] sm:-left-[35px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white transition-all ${
                isCompleted 
                  ? 'border-brand-foliage text-brand-foliage shadow-sm' 
                  : isActive
                    ? 'border-brand-electric text-brand-electric ring-4 ring-brand-electric/20 animate-pulse'
                    : 'border-brand-border text-brand-steel'
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : isActive ? (
                  <Clock className="w-3.5 h-3.5" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-steel" />
                )}
              </div>

              {/* Milestone Content Box */}
              <div className="bg-brand-cloudwhite/80 rounded-xl p-5 border border-brand-border space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-steel">
                      {m.phase}
                    </span>
                    <span className="text-brand-divider">•</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isCompleted 
                        ? 'bg-brand-botanical text-brand-darkgreen' 
                        : isActive
                          ? 'bg-brand-ice text-brand-electric'
                          : 'bg-gray-100 text-gray-500'
                    }`}>
                      {isCompleted ? 'Completed & Certified' : isActive ? 'Active On-Site' : 'Scheduled'}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-medium text-brand-subtext flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-brand-steel" />
                    <span>{m.date}</span>
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-brand-navy">
                    {m.title}
                  </h4>
                  <p className="text-xs text-brand-subtext mt-0.5 font-medium">
                    {m.tamilTitle}
                  </p>
                </div>

                <p className="text-xs text-brand-navy/80 leading-relaxed">
                  {m.description}
                </p>

                {/* Deliverables checklist */}
                <div className="pt-2 border-t border-brand-divider flex flex-wrap gap-2">
                  {m.deliverables.map((item, dIdx) => (
                    <span 
                      key={dIdx} 
                      className="px-2.5 py-1 rounded-md bg-white border border-brand-border text-[11px] font-medium text-brand-navy flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-brand-foliage flex-shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
