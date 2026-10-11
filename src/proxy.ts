import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, isLocale, type Language } from "@/lib/i18n";

function preferredLocale(request: NextRequest): Language {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    if (saved && isLocale(saved)) return saved;

    // First supported language in Accept-Language, by order of preference
    const header = request.headers.get("accept-language") ?? "";
    for (const part of header.split(",")) {
        const code = part.split(";")[0].trim().slice(0, 2).toLowerCase();
        if (isLocale(code)) return code;
    }
    return defaultLocale;
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const first = pathname.split("/")[1];
    if (isLocale(first)) return;

    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    // Skip Next internals, Vercel endpoints and any file with an extension
    matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};
