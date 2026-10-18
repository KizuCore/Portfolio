import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Variantes de la capture présentée sur l’accueil ; l’original reste intact.
const directory = path.resolve("src/assets/images/Projects");
const output = path.join(directory, "responsive");
await fs.mkdir(output, { recursive: true });
for (const width of [480, 768, 1024]) {
  const file = path.join(output, `laMareeMalouine-${width}.webp`);
  await sharp(path.join(directory, "laMareeMalouine.webp"))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(file);
  console.log(`${width}px: ${(await fs.stat(file)).size} bytes`);
}
