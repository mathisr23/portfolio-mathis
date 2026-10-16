import { ImageResponse } from "next/og";
import { featuredProjects, getFeaturedProject } from "@/data/projects";
import { isLocale } from "@/lib/i18n";
import { og, ogContentType, ogFonts, ogPoster, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Case study by Mathis Rivière";

export function generateStaticParams() {
    return featuredProjects.map((p) => ({ slug: p.slug }));
}

/** The project's own first frame, with its title set the way the reel sets it */
export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const project = getFeaturedProject(slug);
    if (!project) return new Response("Not found", { status: 404 });
    const language = isLocale(lang) ? lang : "en";

    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: og.ink }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG, not a page */}
                <img src={await ogPoster(slug)} width={1200} height={630} alt="" style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630 }} />
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 1200,
                        height: 630,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "48px 64px 56px",
                        color: og.snow,
                        backgroundImage: "linear-gradient(to top, rgba(13,14,18,0.94) 0%, rgba(13,14,18,0.6) 45%, rgba(13,14,18,0) 75%)",
                    }}
                >
                    {/* Everything sits on the dark gradient: the top of each poster is the project's own header */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", marginBottom: 18, fontFamily: "Anybody", fontSize: 24, opacity: 0.8 }}>
                            Mathis Rivière
                        </div>
                        <div
                            style={{
                                display: "flex",
                                fontFamily: "Anybody",
                                fontSize: project.title.length > 10 ? 104 : 136,
                                lineHeight: 0.95,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {project.title}
                        </div>
                        <div style={{ display: "flex", marginTop: 22, fontFamily: "Newsreader", fontSize: 30, lineHeight: 1.25, maxWidth: 900 }}>
                            {project.tagline[language]}
                        </div>
                    </div>
                </div>
            </div>
        ),
        { ...ogSize, fonts: await ogFonts() }
    );
}
