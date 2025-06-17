const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage(inputPath) {
  try {
    const outputPath = inputPath.replace('.jpg', '_optimized.jpg');
    await sharp(inputPath)
      .resize({
        width: 1200,
        height: 800,
        fit: 'cover',
        position: 'centre'
      })
      .jpeg({
        quality: 85,
        mozjpeg: true,
        chromaSubsampling: '4:4:4'
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

async function main() {
  const dir = path.join(process.cwd(), 'public', 'images', 'catering');
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    if (file.endsWith('.jpg')) {
      await optimizeImage(path.join(dir, file));
    }
  }
}

main().catch(console.error);