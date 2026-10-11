"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import en from "@/translations/en.json";
import fr from "@/translations/fr.json";
import { LOCALE_COOKIE, localePath, type Language } from "@/lib/i18n";

type Translations = typeof en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    /** Locale-prefixed internal href */
    href: (path: string) => string;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = { en, fr };

export function LanguageProvider({ language, children }: { language: Language; children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const setLanguage = useCallback(
        (lang: Language) => {
            if (lang === language) return;
            // Remember the choice for unprefixed URLs (handled in proxy.ts)
            document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
            const rest = pathname.replace(/^\/(en|fr)(?=\/|$)/, "");
            router.push(`/${lang}${rest}${window.location.hash}`, { scroll: false });
        },
        [language, pathname, router]
    );

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            href: (path: string) => localePath(path, language),
            t: translations[language],
        }),
        [language, setLanguage]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
