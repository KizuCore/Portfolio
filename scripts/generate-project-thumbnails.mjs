import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Régénère les petites images de navigation sans modifier les captures d’origine.
const root = path.resolve('src/assets/images/Projects');
const output = path.join(root, 'thumbnails');
await fs.mkdir(output, { recursive: true });
let sourceBytes = 0;
let thumbnailBytes = 0;
for (const name of (await fs.readdir(root)).filter(name => name.endsWith('.webp')).sort()) {
  const input = path.join(root, name);
  const target = path.join(output, name);
  await sharp(input).resize(112, 86, { fit: 'cover', position: 'attention' }).webp({ quality: 65 }).toFile(target);
  sourceBytes += (await fs.stat(input)).size;
  thumbnailBytes += (await fs.stat(target)).size;
}
console.log(JSON.stringify({ sourceBytes, thumbnailBytes }));
