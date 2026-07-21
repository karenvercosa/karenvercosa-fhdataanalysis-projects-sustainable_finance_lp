"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language } from "@/lib/data";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  content: any;
  isLoading: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("PT");
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Tenta pegar do localStorage se existir, senão usa PT
    const savedLang = localStorage.getItem("site_lang") as Language;
    if (savedLang) {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("site_lang", newLang);
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetch(`/api/content?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setContent(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching language content:", err);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, content, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
