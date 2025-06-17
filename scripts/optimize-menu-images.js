const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage(inputPath) {
  const outputPath = inputPath.replace('.jpg', '_optimized.jpg');
  try {
    await sharp(inputPath)
      .resize(800, 600, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 80,
        mozjpeg: true
      })
      .toFile(outputPath);

    // Replace original with optimized
    await fs.unlink(inputPath);
    await fs.rename(outputPath, inputPath);
    
    console.log(`✓ Optimized: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`✗ Error optimizing ${path.basename(inputPath)}:`, error);
  }
}

async function optimizeDirectory(directory) {
  const files = await fs.readdir(directory);
  for (const file of files) {
    if (file.endsWith('.jpg')) {
      await optimizeImage(path.join(directory, file));
    }
  }
}

async function main() {
  const menuDir = path.join(process.cwd(), 'public', 'images', 'menu');
  await optimizeDirectory(path.join(menuDir, 'proteins'));
  await optimizeDirectory(path.join(menuDir, 'sides'));
}

main().catch(console.error);