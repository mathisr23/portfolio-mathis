import { ImageResponse } from "next/og";
import { isLocale, locales } from "@/lib/i18n";
import { og, ogContentType, ogFonts, ogSize } from "@/lib/og";
import en from "@/translations/en.json";
import fr from "@/translations/fr.json";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Mathis Rivière, creative front-end developer";

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

/** Preview for every page that has no image of its own: the hero, as a still */
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = isLocale(lang) && lang === "fr" ? fr : en;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "56px 64px",
                    background: og.signal,
                    color: og.snow,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        fontFamily: "Anybody",
                        fontSize: 156,
                        lineHeight: 0.86,
                        letterSpacing: "-0.02em",
                    }}
                >
                    <span>Mathis</span>
                    <span>Rivière</span>
                </div>
                <div style={{ display: "flex", marginTop: 44, fontFamily: "Newsreader", fontSize: 34, lineHeight: 1.2, maxWidth: 820 }}>
                    {t.hero.statement}
                </div>
            </div>
        ),
        { ...ogSize, fonts: await ogFonts() }
    );
}
