import sharp from "sharp";
import { readFileSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const PUBLIC = new URL("../public/", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");

// [source, output, maxWidth, quality]
const jobs = [
  ["purple-background-hero.jpg", "purple-background-hero.webp", 1920, 70],
  ["CosmicData.png", "CosmicData.webp", 800, 80],
  ["CoupleCalendar.png", "CoupleCalendar.webp", 800, 80],
  ["FlowSync.png", "FlowSync.webp", 800, 80],
  ["MoodTime.png", "MoodTime.webp", 800, 80],
  ["PokéGacha.png", "PokeGacha.webp", 800, 80],
  ["UnemployedCountup.png", "UnemployedCountup.webp", 800, 80],
  ["atelierlvy.png", "atelierlvy.webp", 800, 80],
];

const kb = (n) => (n / 1024).toFixed(0) + " KB";

for (const [src, out, width, quality] of jobs) {
  const srcPath = join(PUBLIC, src);
  const outPath = join(PUBLIC, out);
  const before = statSync(srcPath).size;
  await sharp(readFileSync(srcPath))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outPath);
  const after = statSync(outPath).size;
  console.log(`${src} ${kb(before)} -> ${out} ${kb(after)}`);
  if (src !== out) unlinkSync(srcPath);
}
console.log("done");
