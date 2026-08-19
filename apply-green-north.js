const fs = require('fs');
const path = require('path');

// Dictionary of exact text swaps
const dict = {
  "assets/img/logos/GreenNorthlogo-transparent.png": "assets/img/logos/GreenNorthlogo-transparent.png",
  "assets\\/img\\/header-logo.svg": "assets\\/img\\/logos\\/GreenNorthlogo-transparent.png", // Escaped JSON variant
  "assets/img/logos/GreenNorthlogo-transparent.png": "assets/img/logos/GreenNorthlogo-transparent.png",
  "assets\\/img\\/footer-logo.svg": "assets\\/img\\/logos\\/GreenNorthlogo-transparent.png",
  "Empowering Nigeria's Energy Sector Through Excellence": "Empowering Nigeria's Energy Sector Through Excellence",
  "Our Services": "Our Services",
  "OUR SERVICES": "OUR SERVICES",
  "Contact Us": "Contact Us",
  "CONTACT US": "CONTACT US",
  "+234 800 000 0000": "+234 800 000 0000",
  "Green North": "Green North",
  "ABOUT US": "ABOUT US",
  "SERVICES": "SERVICES",
  "PROJECTS": "PROJECTSS",
  "INDUSTRIES": "INDUSTRIES",
  "EST . 2026": "EST . 2026"
};

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    // Skip node_modules and git folders to save time
    if (stats.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
      scanDirectory(filePath);
    } else if (stats.isFile() && ['.html', '.js'].includes(path.extname(filePath).toLowerCase())) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;

      // Aggressively replace every instance
      for (const [oldText, newText] of Object.entries(dict)) {
        content = content.split(oldText).join(newText);
      }

      // Inject CSS override only into index.html
      if (filePath === 'index.html' && !content.includes('--primary-color1: #07a606')) {
        const customCSS = `
        <style>
          :root { --primary-color1: #07a606 !important; }
          .mega-menu, .sub-menu, .circular-text.btn_wrapper { display: none !important; }
        </style>
        </head>`;
        content = content.replace(/<\/head>/i, customCSS);
      }

      // Only write to the file if changes were made
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated React Chunk/HTML: ${filePath}`);
      }
    }
  }
}

try {
  scanDirectory('.');
  console.log("Deep React Override Complete! Hydration crash prevented.");
} catch (e) {
  console.error("Script failed:", e);
}