'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en, Translations } from './en';
import { ta } from './ta';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: en
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Safely read persisted language after mount to avoid hydration mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vv_lang') as Language;
      if (stored === 'en' || stored === 'ta') {
        setLanguageState(stored);
      }
    } catch (e) {
      // Ignore storage access errors
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('vv_lang', lang);
      document.documentElement.lang = lang;
      if (lang === 'ta') {
        document.documentElement.classList.add('font-tamil');
      } else {
        document.documentElement.classList.remove('font-tamil');
      }
    } catch (e) {
      // Ignore
    }
  };

  const t = language === 'ta' ? ta : en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  const context = useContext(LanguageContext);
  return context;
}
