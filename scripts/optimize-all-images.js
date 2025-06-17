const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage(inputPath) {
  const outputPath = inputPath.replace('.jpg', '_optimized.jpg');
  try {
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

async function processDirectory(directory) {
  try {
    const files = await fs.readdir(directory);
    for (const file of files) {
      if (file.endsWith('.jpg')) {
        await optimizeImage(path.join(directory, file));
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
}

// Process both menu and catering images
async function main() {
  const directories = [
    path.join(process.cwd(), 'public', 'images', 'menu', 'proteins'),
    path.join(process.cwd(), 'public', 'images', 'menu', 'sides'),
    path.join(process.cwd(), 'public', 'images', 'catering')
  ];

  for (const dir of directories) {
    console.log(`\nProcessing images in ${path.basename(dir)}:`);
    await processDirectory(dir);
  }
}

main().catch(console.error);