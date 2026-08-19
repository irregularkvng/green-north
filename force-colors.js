const fs = require('fs');
const path = require('path');

const targetDir = './'; // Runs in the current directory

function replaceBrandColors(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        // Recursively search folders, but skip heavy folders like node_modules or .git if they exist
        if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
            replaceBrandColors(filePath);
        } else if (filePath.match(/\.(html|css|js)$/)) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                let originalContent = content;

                // 1. Replace Hex Codes (case-insensitive)
                content = content.replace(/#(CB0000|FB521E|8ABC46|233AFF)/gi, '#07a606');

                // 2. Replace RGB Strings (accounting for optional spaces)
                content = content.replace(/203\s*,\s*0\s*,\s*0/g, '7, 166, 6');
                content = content.replace(/251\s*,\s*82\s*,\s*30/g, '7, 166, 6');

                // If changes were made, write them back to the file
                if (content !== originalContent) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`✅ Fixed colors in: ${filePath}`);
                }
            } catch (err) {
                console.error(`Skipped ${filePath} due to error: ${err.message}`);
            }
        }
    });
}

console.log('Initiating deep-scan for rogue colors...');
replaceBrandColors(targetDir);
console.log('Color override complete!');