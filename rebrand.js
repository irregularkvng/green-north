const fs = require('fs');
const path = require('path');

// Function to recursively scan directories
function scanDirectory(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(dir, file);
      
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats for ${filePath}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          // Recursively scan subdirectory
          scanDirectory(filePath);
        } else if (stats.isFile()) {
          // Check if file has one of the target extensions
          const ext = path.extname(filePath).toLowerCase();
          if (['.html', '.js', '.css'].includes(ext)) {
            // Process the file
            processFile(filePath);
          }
        }
      });
    });
  });
}

// Function to process and modify a file
function processFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    // Perform replacements
    const updatedData = data
      .replace(/Green North/g, 'Green North')
      .replace(/matrik/g, 'green-north');

    // Only write if changes were made
    if (updatedData !== data) {
      fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file ${filePath}:`, err);
          return;
        }
        console.log(`Updated file: ${filePath}`);
      });
    }
  });
}

// Start scanning from current directory
scanDirectory('.');
