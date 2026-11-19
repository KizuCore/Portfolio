import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Variantes des captures présentées sur l’accueil ; les originaux restent intacts.
const directory = path.resolve("src/assets/images/Projects");
const output = path.join(directory, "responsive");
await fs.mkdir(output, { recursive: true });
for (const name of ["laMareeMalouine", "portesDeMontafilan", "aTable"]) {
  const widths = name === "laMareeMalouine" ? [480, 768, 1024] : [400, 768, 1024];
  for (const width of widths) {
    const file = path.join(output, `${name}-${width}.webp`);
    await sharp(path.join(directory, `${name}.webp`))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(file);
    console.log(`${name} ${width}px: ${(await fs.stat(file)).size} bytes`);
  }
}
