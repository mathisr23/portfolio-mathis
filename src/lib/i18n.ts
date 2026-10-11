import type { Metadata } from "next";

export const locales = ["en", "fr"] as const;
export type Language = (typeof locales)[number];
export const defaultLocale: Language = "en";
export const LOCALE_COOKIE = "lang";

export function isLocale(value: string): value is Language {
    return (locales as readonly string[]).includes(value);
}

/** Prefix an internal path with the locale: ("/about", "fr") -> "/fr/about", ("/#work", "en") -> "/en#work" */
export function localePath(path: string, lang: Language) {
    if (path === "/") return `/${lang}`;
    if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
    return `/${lang}${path}`;
}

/** Canonical URL plus hreflang alternates for a locale-agnostic path */
export function alternatesFor(path: string, lang: Language): Metadata["alternates"] {
    return {
        canonical: localePath(path, lang),
        languages: {
            en: localePath(path, "en"),
            fr: localePath(path, "fr"),
            "x-default": localePath(path, defaultLocale),
        },
    };
}
