/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = './src/assets/images';
const outputDir = './public/images';

function convertImagesRecursively(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      convertImagesRecursively(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const relativePath = path.relative(inputDir, fullPath);
        const baseName = path.basename(entry.name, ext);
        const outputPath = path.join(outputDir, path.dirname(relativePath));
        const outputFile = path.join(outputPath, `${baseName}.webp`);

        fs.mkdirSync(outputPath, { recursive: true });

        sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(outputFile)
          .then(() => console.log(`✔ ${relativePath} → ${baseName}.webp`))
          .catch((err) => console.error(`✖ ${relativePath}:`, err));
      }
    }
  });
}

convertImagesRecursively(inputDir);
