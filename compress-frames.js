const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'src', 'assets', 'images', 'frames');
const outputDir = path.join(__dirname, 'src', 'assets', 'images', 'frames_optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} images to process. Compression starting...`);
  
  let processed = 0;
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.png', '.webp'));
    
    await sharp(inputPath)
      .resize(1024, 1024, { fit: 'inside' })
      .webp({ quality: 50, effort: 6 })
      .toFile(outputPath);
      
    processed++;
    if (processed % 20 === 0) console.log(`Processed ${processed}/${files.length}`);
  }
  
  console.log('Finished processing all images.');
}

processImages().catch(console.error);
