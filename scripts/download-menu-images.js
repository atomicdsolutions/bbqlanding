const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Configuration
const MENU_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'menu');
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Image definitions with Unsplash photo IDs
const MENU_IMAGES = {
  proteins: {
    'brisket': '88YAXjnpvrY', // Sliced brisket
    'ribs': 'dt5-8tThZWg',    // BBQ ribs
    'chicken': 'vZwZvM5jFrs', // Smoked chicken
    'pulled-pork': '4_jhDO54BYg' // Pulled pork
  },
  sides: {
    'mac-cheese': 'gBXzP-AuC1E',   // Mac and cheese
    'collard-greens': 'ZQf4jzkpz1k', // Collard greens
    'cornbread': 'wxhvxwpHpmc',     // Cornbread
    'potato-salad': 'KeXpFbQvhwY'   // Potato salad
  }
};

async function downloadImage(photoId, outputPath) {
  try {
    // Get photo URL from Unsplash API
    const response = await axios.get(`https://api.unsplash.com/photos/${photoId}`, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    const imageUrl = response.data.urls.regular;
    
    // Download image
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    await fs.writeFile(outputPath, imageResponse.data);

    console.log(`✓ Downloaded: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Error downloading ${photoId}:`, error.message);
    return false;
  }
}

async function optimizeImage(inputPath) {
  try {
    const image = sharp(inputPath);
    
    await image
      .resize(1200, 800, {
        fit: 'cover',
        position: 'centre'
      })
      .jpeg({ 
        quality: 80,
        mozjpeg: true
      })
      .toFile(inputPath.replace('.jpg', '_optimized.jpg'));

    // Replace original with optimized
    await fs.unlink(inputPath);
    await fs.rename(
      inputPath.replace('.jpg', '_optimized.jpg'),
      inputPath
    );

    console.log(`✓ Optimized: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`✗ Error optimizing ${path.basename(inputPath)}:`, error.message);
  }
}

async function processImages() {
  // Create directories
  await fs.mkdir(path.join(MENU_IMAGES_DIR, 'proteins'), { recursive: true });
  await fs.mkdir(path.join(MENU_IMAGES_DIR, 'sides'), { recursive: true });

  // Process proteins
  for (const [name, photoId] of Object.entries(MENU_IMAGES.proteins)) {
    const outputPath = path.join(MENU_IMAGES_DIR, 'proteins', `${name}.jpg`);
    if (await downloadImage(photoId, outputPath)) {
      await optimizeImage(outputPath);
    }
  }

  // Process sides
  for (const [name, photoId] of Object.entries(MENU_IMAGES.sides)) {
    const outputPath = path.join(MENU_IMAGES_DIR, 'sides', `${name}.jpg`);
    if (await downloadImage(photoId, outputPath)) {
      await optimizeImage(outputPath);
    }
  }
}

// Run the script
if (!UNSPLASH_ACCESS_KEY) {
  console.error('⚠️  Please set UNSPLASH_ACCESS_KEY environment variable');
  process.exit(1);
}

processImages().catch(console.error);