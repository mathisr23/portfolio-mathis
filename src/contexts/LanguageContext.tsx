"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "@/translations/en.json";
import fr from "@/translations/fr.json";

type Language = "en" | "fr";

type Translations = typeof en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    en,
    fr,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");
    const [mounted, setMounted] = useState(false);

    // Load language preference from localStorage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") as Language | null;
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
            setLanguageState(savedLanguage);
        }
        setMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    // Prevent hydration mismatch by rendering children only after mount
    if (!mounted) {
        return null;
    }

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t: translations[language],
            }}
        >
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
