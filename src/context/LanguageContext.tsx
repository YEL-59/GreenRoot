"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Language, TranslationSchema } from "@/i18n/translations";

export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isBn: boolean;
  isEn: boolean;
  t: TranslationSchema;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>("bn");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("greenroot_language") as Language | null;
      if (saved === "bn" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {
      // localStorage may fail in private mode
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("greenroot_language", lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "bn" ? "en" : "bn";
    setLanguage(nextLang);
  };

  const isBn = language === "bn";
  const isEn = language === "en";
  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isBn,
        isEn,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
