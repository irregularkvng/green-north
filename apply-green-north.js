const fs = require('fs');

// Read the index.html file
let htmlContent = fs.readFileSync('index.html', 'utf8');

// Perform the exact string replacements
htmlContent = htmlContent.replace(
  /assets\/img\/header-logo\.svg/g,
  'assets/img/logos/GreenNorthlogo-transparent.png'
);

htmlContent = htmlContent.replace(
  'Modern Factory Operation Innovative Facility.',
  "Empowering Nigeria's Energy Sector Through Excellence"
);

htmlContent = htmlContent.replace(
  '<div class="circular-text btn_wrapper">',
  '<div class="circular-text btn_wrapper" style="display: none;">'
);

htmlContent = htmlContent.replace(
  '</head>',
  '<style>:root { --primary-color1: #07a606 !important; } .mega-menu, .sub-menu { display: none !important; }</style></head>'
);

// Write the modified content back to index.html
fs.writeFileSync('index.html', htmlContent);
