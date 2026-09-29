"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Language = "id" | "en";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  isID: boolean;
};

const LanguageContext = createContext<
  LanguageContextType | undefined
>(undefined);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "portfolio-language",
    );

    if (
      savedLanguage === "id" ||
      savedLanguage === "en"
    ) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    localStorage.setItem(
      "portfolio-language",
      nextLanguage,
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isID: language === "id",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage harus digunakan di dalam LanguageProvider.",
    );
  }

  return context;
}