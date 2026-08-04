"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "./locales/en.json";
import ta from "./locales/ta.json";
import hi from "./locales/hi.json";

export type Language = "en" | "ta" | "hi";

const translations: Record<Language, any> = { en, ta, hi };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("app_lang") as Language;
    if (savedLang && ["en", "ta", "hi"].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to English
        let fallbackValue: any = translations["en"];
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === "object" && fk in fallbackValue) {
            fallbackValue = fallbackValue[fk];
          } else {
            return key; // return key if not found
          }
        }
        return fallbackValue !== undefined ? (fallbackValue as string) : key;
      }
    }
    return value !== undefined ? (value as string) : key;
  };

  // Avoid hydration mismatch by waiting for mount
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "en" as Language,
      setLanguage: () => {},
      t: (key: string) => key.split('.').pop() || key,
    };
  }
  return context;
};
