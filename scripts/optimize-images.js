const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const MENU_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'menu');
const OUTPUT_QUALITY = 80;
const MAX_WIDTH = 1200;

async function optimizeImage(inputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Resize if wider than MAX_WIDTH while maintaining aspect ratio
    if (metadata.width > MAX_WIDTH) {
      image.resize(MAX_WIDTH, null, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Optimize and save
    await image
      .jpeg({ quality: OUTPUT_QUALITY, mozjpeg: true })
      .toFile(inputPath.replace(/\.(jpg|jpeg|png)$/, '_optimized.jpg'));

    console.log(`✓ Optimized: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`✗ Error optimizing ${path.basename(inputPath)}:`, error.message);
  }
}

async function processDirectory(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
        await optimizeImage(fullPath);
      }
    }
  } catch (error) {
    console.error('Error processing directory:', error.message);
  }
}

// Create directories if they don't exist
async function createDirectories() {
  const dirs = [
    path.join(MENU_IMAGES_DIR, 'proteins'),
    path.join(MENU_IMAGES_DIR, 'sides')
  ];

  for (const dir of dirs) {
    try {
      await fs.mkdir(dir, { recursive: true });
      console.log(`✓ Created directory: ${path.relative(process.cwd(), dir)}`);
    } catch (error) {
      if (error.code !== 'EEXIST') {
        console.error(`✗ Error creating directory ${dir}:`, error.message);
      }
    }
  }
}

async function main() {
  console.log('🖼  Image Optimization Script');
  console.log('============================');
  
  await createDirectories();
  await processDirectory(MENU_IMAGES_DIR);
  
  console.log('\n✨ Done processing images!');
}

main().catch(console.error);