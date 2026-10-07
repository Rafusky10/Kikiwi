import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDirArg = process.argv[2];
const outputDirArg = process.argv[3];

if (!inputDirArg || !outputDirArg) {
  console.error(
    "\nUso:\nnode .\\scripts\\optimize-images.mjs <carpeta-originales> <carpeta-salida>\n"
  );
  process.exit(1);
}

const inputDir = path.resolve(inputDirArg);
const outputDir = path.resolve(outputDirArg);

if (!fs.existsSync(inputDir)) {
  console.error(`\n❌ No existe la carpeta de origen:\n${inputDir}\n`);
  process.exit(1);
}

if (inputDir === outputDir) {
  console.error(
    "\n❌ La carpeta de origen y la de salida no pueden ser la misma.\n"
  );
  process.exit(1);
}

const files = fs
  .readdirSync(inputDir)
  .filter((file) => /\.(jpg|jpeg)$/i.test(file));

if (files.length === 0) {
  console.error("\n❌ No se encontraron imágenes JPG/JPEG.\n");
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

console.log("\n🖼️  Optimizando imágenes...\n");

let totalOriginal = 0;
let totalOptimized = 0;

for (const file of files) {
  const inputPath = path.join(inputDir, file);

  const parsed = path.parse(file);
  const outputFile = `${parsed.name}.jpg`;
  const outputPath = path.join(outputDir, outputFile);

  let maxSize = 1200;

  if (parsed.name.toLowerCase() === "portada") {
    maxSize = 1600;
  }

  if (
    parsed.name.toLowerCase() === "ceremonia" ||
    parsed.name.toLowerCase() === "recepcion"
  ) {
    maxSize = 1400;
  }

  const inputStats = fs.statSync(inputPath);
  totalOriginal += inputStats.size;

  await sharp(inputPath)
    .rotate()
    .resize({
      width: maxSize,
      height: maxSize,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 90,
      mozjpeg: true,
    })
    .toFile(outputPath);

  const outputStats = fs.statSync(outputPath);
  totalOptimized += outputStats.size;

  console.log(
    `✓ ${file} → ${outputFile} | máximo ${maxSize}px | ${(
      outputStats.size /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
}

console.log("\n────────────────────────────────");
console.log("✅ Optimización terminada");
console.log("────────────────────────────────");
console.log(
  `Originales:  ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`
);
console.log(
  `Optimizadas: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`
);
console.log(
  `Reducción:   ${(
    (1 - totalOptimized / totalOriginal) *
    100
  ).toFixed(1)}%`
);
console.log("────────────────────────────────\n");