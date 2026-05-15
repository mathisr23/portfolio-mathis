import sharp from "sharp";
import { readFileSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const PUBLIC = new URL("../public/", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");

// [source, output, maxWidth, quality]
const jobs = [
  ["museum500.png", "museum500.webp", 800, 80],
  ["still-looking.png", "still-looking.webp", 800, 80],
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
