'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MessageSquare, X, Send, Bot, User, Sparkles, 
  ArrowRight, ShieldCheck, Phone, ExternalLink, Calendar 
} from 'lucide-react';
import { PROPERTIES, PROJECTS, COMPANY_INFO } from '@/data/mockData';
import { formatLakhs } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  matchedProperties?: typeof PROPERTIES;
  suggestedAction?: {
    type: 'site-visit' | 'whatsapp' | 'call';
    label: string;
  };
  timestamp: string;
}

export default function AIPropertyConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { openSiteVisitModal } = useApp();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Vanakkam & Welcome to V.V Properties! I am your AI Property Concierge, grounded in our verified Coimbatore developments. How can I assist your search today?",
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const [isSectionHidden, setIsSectionHidden] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      const el = document.getElementById('construction-experience') || document.getElementById('blueprint-to-building');
      if (el) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              setIsSectionHidden(entry.isIntersecting);
            });
          },
          { threshold: 0.05 }
        );
        observer.observe(el);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  const quickChips = [
    "Plots under ₹20 Lakhs",
    "Near CHIL SEZ IT Park",
    "Tech Valley vs Garden City",
    "What documents are verified?",
    "Book a Site Visit"
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const q = query.toLowerCase();
      let responseText = "";
      let matchedProps: typeof PROPERTIES = [];
      let suggestedAction: Message['suggestedAction'] = undefined;

      // Tamil Language Support
      const isTamil = /[\u0B80-\u0BFF]/.test(q) || q.includes('tamil');

      if (isTamil) {
        if (q.includes('விலை') || q.includes('பட்ஜெட்') || q.includes('ரூபாய்') || q.includes('குறைந்த')) {
          matchedProps = PROPERTIES.filter((p) => p.totalPrice <= 25);
          responseText = "வணக்கம்! குறைந்த பட்ஜெட்டில் சிறந்த முதலீட்டிற்கு **கோவில்பாளையம் — தி கார்டன் சிட்டி (The Garden City)** மிகச்சிறந்தது. சத்தி மெயின் ரோட்டிலிருந்து 2 கி.மீ தொலைவில், **சென்ட் ₹5.60 லட்சம்** மட்டுமே! DTCP & RERA அங்கீகாரம் மற்றும் சிறந்த நிலத்தடி நீர்வளம் கொண்டது.";
        } else if (q.includes('சரவணம்பட்டி') || q.includes('டெக்') || q.includes('ஐடி')) {
          matchedProps = PROPERTIES.filter((p) => p.projectSlug === 'tech-valley-saravanampatti');
          responseText = "**டெக் வேலி (Tech Valley)** சரவணம்பட்டியில் CHIL SEZ ஐடி பார்க்கிற்கு வெறும் 3 நிமிட தூரத்தில் அமைந்துள்ளது. கோவை மாநகராட்சி எல்லைக்குள் (Corporation Limit) 40 அடி தார் சாலைகளுடன் உடனடியாக வீடு கட்டத் தயாராக உள்ளது. சென்ட் ₹14.50 லட்சம்.";
        } else if (q.includes('பத்திரம்') || q.includes('அங்கீகாரம்') || q.includes('சட்டம்')) {
          responseText = "V.V Properties-ன் அனைத்து மனைப் பிரிவுகளும்:\n1. அரசு அங்கீகரிக்கப்பட்ட **DTCP & TNRERA சான்றிதழ்**\n2. 30 ஆண்டு கால **வில்லங்கமில்லா சான்றிதழ் (Nil EC)**\n3. சென்னை உயர்நீதிமன்ற மூத்த வழக்கறிஞர்களின் சட்ட ஒப்புதல் கொண்டது.";
          suggestedAction = { type: 'whatsapp', label: 'வாட்ஸ்அப்பில் சட்ட ஆவணங்களை பெற' };
        } else if (q.includes('பார்வை') || q.includes('கார்') || q.includes('நேரில்')) {
          responseText = "எங்கள் திட்டங்களை குடும்பத்துடன் நேரில் பார்வையிட **இலவச ஏசி கார் வசதி (Free AC Cab Pickup & Drop)** செய்து தருகிறோம்!";
          suggestedAction = { type: 'site-visit', label: 'இலவச கார் பயணத்தை முன்பதிவு செய்ய' };
        } else {
          matchedProps = PROPERTIES.slice(0, 2);
          responseText = "வணக்கம்! V.V Properties-ல் சரவணம்பட்டி (சென்ட் ₹14.50L) மற்றும் கோவில்பாளையம் (சென்ட் ₹5.60L) ஆகிய இடங்களில் DTCP அங்கீகாரம் பெற்ற வீட்டுமனைகள் உள்ளன. நேரடி பார்வைக்கு இலவச கார் முன்பதிவு செய்ய விரும்புகிறீர்களா?";
        }
      } else if (q.includes('under 20') || q.includes('budget') || q.includes('cheap') || q.includes('affordable') || q.includes('5.60')) {
        matchedProps = PROPERTIES.filter((p) => p.totalPrice <= 25);
        responseText = "For budget-conscious buyers and high-yield investors, **The Garden City at Kovilpalayam** is our top recommendation. It is located just 2 KM from Sathy Main Road at an unbeatable **₹5.60 Lakhs/Cent** with DTCP & RERA approval and abundant groundwater. Individual plots start at just ₹15.40 Lakhs total package!";
      } else if (q.includes('chil') || q.includes('sez') || q.includes('saravanampatti') || q.includes('it park') || q.includes('tech valley')) {
        matchedProps = PROPERTIES.filter((p) => p.projectSlug === 'tech-valley-saravanampatti');
        responseText = "Our flagship project **Tech Valley** is located in Saravanampatti, just **3 minutes (1.4 KM) from CHIL SEZ IT Park** (Cognizant & Bosch). It falls within the Coimbatore Corporation limit, features 40ft blacktop roads, underground water pipelines, and is 100% ready for independent villa construction!";
      } else if (q.includes('compare') || q.includes('difference') || q.includes('vs')) {
        responseText = "Here is the quick comparison:\n\n• **Tech Valley (Saravanampatti)**: Within Corporation limit, 3 mins to IT Park, ₹14.50L/Cent. Best for tech professionals seeking immediate villa construction and walk-to-work.\n\n• **The Garden City (Kovilpalayam)**: 2 KM to Sathy Road, ₹5.60L/Cent. Best for affordable investment with high 14-16% capital appreciation.";
        matchedProps = PROPERTIES.slice(0, 2);
      } else if (q.includes('document') || q.includes('legal') || q.includes('dtcp') || q.includes('rera') || q.includes('title')) {
        responseText = "Every V.V Properties development comes with:\n1. Sanctioned **DTCP Layout Approval Number**\n2. Official **TNRERA Registration Certificate**\n3. 30-Year **Nil Encumbrance Certificate (EC)**\n4. Unbroken chain of Parent Deeds verified by Senior High Court Advocates\n5. Gift deeds for roads and parks executed to the local governing body.\n\nAll original files are available for your legal advisor's inspection.";
        suggestedAction = { type: 'whatsapp', label: 'Request Legal Docket on WhatsApp' };
      } else if (q.includes('visit') || q.includes('book') || q.includes('schedule') || q.includes('cab')) {
        responseText = "We would love to host you on-site! We offer **complimentary AC Cab Pickup & Drop** from anywhere in Coimbatore. Our senior property manager will walk you through the physical plot demarcation, road width, and ground water levels.";
        suggestedAction = { type: 'site-visit', label: 'Schedule Free Site Visit' };
      } else {
        matchedProps = PROPERTIES.slice(0, 2);
        responseText = `I have searched our active Coimbatore inventory. We currently have verified DTCP plots in **Saravanampatti (Tech Valley)** starting from ₹14.50L/Cent and in **Kovilpalayam (The Garden City)** from ₹5.60L/Cent. Would you like to schedule a physical tour or examine a specific plot?`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        matchedProperties: matchedProps.length > 0 ? matchedProps : undefined,
        suggestedAction,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-[#102B50] text-white shadow-xl hover:bg-[#1A365D] transition-all duration-300 hover:scale-105 flex items-center justify-center group ${
          isSectionHidden && !isOpen ? 'opacity-0 pointer-events-none translate-y-6' : 'opacity-100'
        }`}
        aria-label="Open Property Concierge"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <div className="relative flex items-center gap-2">
            <Bot className="w-6 h-6" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-1">
              V.V Concierge
            </span>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-brand-electric animate-ping" />
          </div>
        )}
      </button>

      {/* Chat Window Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[640px] h-[82vh] bg-white rounded-3xl shadow-2xl border border-brand-bluegray flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 text-left">
          
          {/* Header */}
          <div className="bg-brand-midnight text-white p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-electric bg-white flex-shrink-0">
                <Image
                  src="/brand/vv-properties-logo.jpg"
                  alt="V.V Properties Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  V.V Property Concierge
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                </h4>
                <p className="text-[11px] text-brand-steel">
                  Grounded in Verified Coimbatore Inventory
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-brand-softwhite border-b border-brand-bluegray flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="px-2.5 py-1 rounded-full bg-white border border-brand-bluegray hover:border-brand-electric hover:bg-brand-ice text-brand-navy font-semibold whitespace-nowrap transition-colors flex-shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-softwhite">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-electric text-white rounded-br-none shadow-sm'
                      : 'bg-white text-brand-neutral border border-brand-bluegray rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Optional Property Cards Returned in Chat */}
                {msg.matchedProperties && (
                  <div className="mt-2 space-y-2 w-full max-w-[90%]">
                    {msg.matchedProperties.map((prop) => (
                      <div
                        key={prop.id}
                        className="p-2.5 rounded-xl bg-white border border-brand-bluegray shadow-sm flex items-center gap-3 text-xs"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-brand-ice">
                          <Image
                            src={prop.featuredImage}
                            alt={prop.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <strong className="block font-bold text-brand-navy truncate">
                            {prop.title}
                          </strong>
                          <span className="text-[11px] text-brand-steel block">
                            {prop.areaCents} Cents • {prop.location.split(',')[0]}
                          </span>
                          <span className="text-xs font-black text-brand-electric">
                            {formatLakhs(prop.totalPrice)}
                          </span>
                        </div>
                        <Link
                          href={`/properties/${prop.slug}`}
                          className="p-1.5 rounded-lg bg-brand-ice text-brand-electric hover:bg-brand-pale transition-colors"
                          title="View Property"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested CTA Action Button */}
                {msg.suggestedAction && (
                  <div className="mt-2">
                    {msg.suggestedAction.type === 'site-visit' ? (
                      <button
                        onClick={() => openSiteVisitModal()}
                        className="px-3 py-1.5 rounded-lg bg-brand-electric text-white text-xs font-bold flex items-center gap-1.5 hover:bg-brand-royal shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{msg.suggestedAction.label}</span>
                      </button>
                    ) : (
                      <a
                        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20V.V%20Properties,%20I%20have%20an%20enquiry%20regarding%20your%20Coimbatore%20projects.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-500 shadow-sm"
                      >
                        <span>{msg.suggestedAction.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}

                <span className="text-[9px] text-brand-steel mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-brand-steel text-xs p-2">
                <Bot className="w-4 h-4 animate-spin text-brand-electric" />
                <span>Checking V.V Properties database...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <div className="p-3 bg-white border-t border-brand-bluegray">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about plots, CHIL SEZ, DTCP approvals..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-brand-bluegray text-xs sm:text-sm text-brand-navy focus:outline-none focus:border-brand-electric bg-brand-softwhite"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-brand-electric text-white flex items-center justify-center hover:bg-brand-royal transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] text-brand-steel">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-brand-electric" />
                Grounded in verified land records
              </span>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="hover:text-brand-electric font-semibold flex items-center gap-1"
              >
                <Phone className="w-2.5 h-2.5" />
                Speak to Advisor
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
