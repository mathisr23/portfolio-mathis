import type { MetadataRoute } from "next";
import { featuredProjects } from "@/data/projects";
import { localePath, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = ["/", "/about", "/contact", ...featuredProjects.map((p) => `/work/${p.slug}`)];

    return paths.flatMap((path) =>
        locales.map((lang) => ({
            url: `${siteUrl}${localePath(path, lang)}`,
            alternates: {
                languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localePath(path, l)}`])),
            },
        }))
    );
}
