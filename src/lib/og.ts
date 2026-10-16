import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Shared setup for the generated social preview images (1200x630) */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export const og = {
    signal: "#2633ff",
    ink: "#0d0e12",
    snow: "#fafafa",
};

const assets = join(process.cwd(), "src/assets/og");

export async function ogFonts() {
    const [display, text] = await Promise.all([
        readFile(join(assets, "anybody-expanded-800.ttf")),
        readFile(join(assets, "newsreader-400.ttf")),
    ]);
    return [
        { name: "Anybody", data: display, weight: 800 as const, style: "normal" as const },
        { name: "Newsreader", data: text, weight: 400 as const, style: "normal" as const },
    ];
}

/** Case study posters, pre-converted to JPEG (the renderer cannot read WebP) */
export async function ogPoster(slug: string) {
    const data = await readFile(join(assets, "posters", `${slug}.jpg`));
    return `data:image/jpeg;base64,${data.toString("base64")}`;
}
