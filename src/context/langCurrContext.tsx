"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { setCookie, getCookie } from "cookies-next";
import { useRouter, usePathname } from "@/lib/navLink";
import { useLocale } from "next-intl";

type LangCurrContextType = {
  language: string;
  currency: string;
  setLanguage: (lang: string) => void;
  setCurrency: (cur: string) => void;
};

const LangCurrContext = createContext<LangCurrContextType | undefined>(
  undefined
);

export const LangCurrProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const language = useLocale();

  const [currency, setCurrencyState] = useState("USD");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCurr = getCookie("currency") as string | undefined;
    if (storedCurr) setCurrencyState(storedCurr);

    const storedLang = getCookie("language") as string | undefined;
    if (storedLang && storedLang !== language) {
      router.push(pathname, { locale: storedLang });
      router.refresh();
    }
  }, []);

  const setLanguage = (lang: string) => {
    setCookie("language", lang, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    router.push(pathname, { locale: lang });
    router.refresh(); 
  };

  const setCurrency = (cur: string) => {
    setCurrencyState(cur);
    setCookie("currency", cur, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    router.refresh(); 
  };

  return (
    <LangCurrContext.Provider
      value={{ language, currency, setLanguage, setCurrency }}
    >
      {children}
    </LangCurrContext.Provider>
  );
};

export const useLangCurr = () => {
  const context = useContext(LangCurrContext);
  if (!context)
    throw new Error("useLangCurr must be used inside LangCurrProvider");
  return context;
};
