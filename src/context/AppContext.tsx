'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlotUnit, LeadEnquiry } from '@/types';
import { TECH_VALLEY_PLOTS } from '@/data/mockData';
import { TRANSLATIONS, Language } from '@/data/translations';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['en'];
  favourites: string[];
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  comparisonList: string[];
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  inCompare: (id: string) => boolean;
  plots: PlotUnit[];
  reservePlot: (plotId: string, buyerName: string, phone: string) => boolean;
  enquiries: LeadEnquiry[];
  addEnquiry: (lead: Omit<LeadEnquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (leadId: string, status: LeadEnquiry['status']) => void;
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  isSiteVisitModalOpen: boolean;
  openSiteVisitModal: (project?: string, plot?: string) => void;
  closeSiteVisitModal: () => void;
  modalPrefill: { project?: string; plot?: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [favourites, setFavourites] = useState<string[]>([]);
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [plots, setPlots] = useState<PlotUnit[]>(TECH_VALLEY_PLOTS);
  const [enquiries, setEnquiries] = useState<LeadEnquiry[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [modalPrefill, setModalPrefill] = useState<{ project?: string; plot?: string }>({});

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('vv_lang') as Language;
      if (savedLang === 'en' || savedLang === 'ta') {
        setLanguageState(savedLang);
      }

      const savedFavs = localStorage.getItem('vv_favourites');
      if (savedFavs) {
        setFavourites(JSON.parse(savedFavs));
      }

      const savedComp = localStorage.getItem('vv_compare');
      if (savedComp) {
        setComparisonList(JSON.parse(savedComp));
      }

      const savedEnquiries = localStorage.getItem('vv_enquiries');
      if (savedEnquiries) {
        setEnquiries(JSON.parse(savedEnquiries));
      } else {
        // Initial sample enquiries for admin view
        setEnquiries([
          {
            id: 'lead-01',
            name: 'Karthik Subramanian',
            phone: '+91 94433 88121',
            email: 'karthik.sub@gmail.com',
            project: 'Tech Valley — Premium Plots & Villas',
            plotNumber: 'Plot #14',
            enquiryType: 'site-visit',
            preferredDate: '2026-10-25',
            preferredTime: '10:30 AM',
            needCabPickup: true,
            message: 'Looking for an east-facing plot for immediate independent villa construction.',
            createdAt: '2026-10-18T10:15:00Z',
            status: 'Visit Scheduled'
          },
          {
            id: 'lead-02',
            name: 'Priya Sundar',
            phone: '+91 98940 33214',
            email: 'priya.sundar@tcs.com',
            project: 'The Garden City — Kovilpalayam',
            plotNumber: 'Plot #07',
            enquiryType: 'plot-reservation',
            message: 'Interested in the ₹5.60L/Cent market challenge price. Please share SBI loan details.',
            createdAt: '2026-10-17T16:40:00Z',
            status: 'Contacted'
          }
        ]);
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('vv_lang', lang);
    } catch {}
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleFavourite = (id: string) => {
    setFavourites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('vv_favourites', JSON.stringify(next));
      } catch {}
      showToast(exists ? 'Removed from shortlist' : 'Saved to your shortlist! ✨', 'info');
      return next;
    });
  };

  const isFavourite = (id: string) => favourites.includes(id);

  const addToCompare = (id: string): boolean => {
    if (comparisonList.includes(id)) {
      showToast('Property is already in comparison', 'info');
      return false;
    }
    if (comparisonList.length >= 3) {
      showToast('You can compare maximum 3 properties at once', 'error');
      return false;
    }
    const next = [...comparisonList, id];
    setComparisonList(next);
    try {
      localStorage.setItem('vv_compare', JSON.stringify(next));
    } catch {}
    showToast('Added to comparison matrix ⚖️', 'success');
    return true;
  };

  const removeFromCompare = (id: string) => {
    const next = comparisonList.filter((item) => item !== id);
    setComparisonList(next);
    try {
      localStorage.setItem('vv_compare', JSON.stringify(next));
    } catch {}
    showToast('Removed from comparison', 'info');
  };

  const clearCompare = () => {
    setComparisonList([]);
    try {
      localStorage.removeItem('vv_compare');
    } catch {}
    showToast('Comparison cleared', 'info');
  };

  const inCompare = (id: string) => comparisonList.includes(id);

  const reservePlot = (plotId: string, buyerName: string, phone: string): boolean => {
    let success = false;
    setPlots((prev) =>
      prev.map((p) => {
        if (p.id === plotId && p.status === 'available') {
          success = true;
          return { ...p, status: 'reserved' as const };
        }
        return p;
      })
    );

    if (success) {
      const newLead: LeadEnquiry = {
        id: 'lead-' + Date.now(),
        name: buyerName,
        phone,
        project: 'Tech Valley',
        plotNumber: `Plot ${plotId.replace('tv-p', '#')}`,
        enquiryType: 'plot-reservation',
        message: `Direct reservation request for Plot ${plotId} through Live Plot Explorer.`,
        createdAt: new Date().toISOString(),
        status: 'New'
      };
      setEnquiries((prev) => {
        const next = [newLead, ...prev];
        try {
          localStorage.setItem('vv_enquiries', JSON.stringify(next));
        } catch {}
        return next;
      });
      showToast(`Plot reserved successfully! Our team will verify and hold for 24 hours.`, 'success');
    }
    return success;
  };

  const addEnquiry = (lead: Omit<LeadEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEntry: LeadEnquiry = {
      ...lead,
      id: 'lead-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setEnquiries((prev) => {
      const next = [newEntry, ...prev];
      try {
        localStorage.setItem('vv_enquiries', JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast('Enquiry received! A V.V Properties manager will reach out shortly.', 'success');
  };

  const updateLeadStatus = (leadId: string, status: LeadEnquiry['status']) => {
    setEnquiries((prev) => {
      const next = prev.map((l) => (l.id === leadId ? { ...l, status } : l));
      try {
        localStorage.setItem('vv_enquiries', JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast(`Lead status updated to: ${status}`, 'info');
  };

  const openSiteVisitModal = (project?: string, plot?: string) => {
    setModalPrefill({ project, plot });
    setIsSiteVisitModalOpen(true);
  };

  const closeSiteVisitModal = () => {
    setIsSiteVisitModalOpen(false);
    setModalPrefill({});
  };

  const t = TRANSLATIONS[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        favourites,
        toggleFavourite,
        isFavourite,
        comparisonList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        inCompare,
        plots,
        reservePlot,
        enquiries,
        addEnquiry,
        updateLeadStatus,
        toasts,
        showToast,
        removeToast,
        isSiteVisitModalOpen,
        openSiteVisitModal,
        closeSiteVisitModal,
        modalPrefill
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
