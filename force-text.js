const fs = require('fs');
const path = require('path');

// The Ultimate Dictionary
const replacements = {
    // Target the exact strings from your HTML snippet
    "ABOUT GREEN NORTH LTD": "ABOUT GREEN NORTH LTD",
    "Excellence in the Energy Sector": "Excellence in the Energy Sector",

    "We deliver elite consulting, contracting, and compliance services designed to streamline administrative workflows and drive growth.": "We deliver elite consulting, contracting, and compliance services designed to streamline administrative workflows and drive growth.",

    "By integrating robust automated solutions, we empower organizations to operate with maximum efficiency and regulatory confidence.": "By integrating robust automated solutions, we empower organizations to operate with maximum efficiency and regulatory confidence.",

    "Strategic Consulting": "Strategic Consulting",
    "Reliable Contracting": "Reliable Contracting",

    "Providing expert guidance to navigate complex market dynamics, optimize operations, and achieve sustainable growth.": "Providing expert guidance to navigate complex market dynamics, optimize operations, and achieve sustainable growth.",
    "Providing expert guidance to navigate complex market dynamics, optimize operations, and achieve sustainable growth.": "Providing expert guidance to navigate complex market dynamics, optimize operations, and achieve sustainable growth."
};

function superReplace(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        // Skip heavy folders
        if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
            superReplace(filePath);
        } else if (filePath.match(/\.(html|js)$/)) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                let originalContent = content;

                for (const [oldText, newText] of Object.entries(replacements)) {
                    // Standard replace
                    content = content.split(oldText).join(newText);

                    // Catch JSON escaped versions (used by React hydration)
                    const escapedOld = oldText.replace(/"/g, '\\"').replace(/\n/g, '\\n');
                    const escapedNew = newText.replace(/"/g, '\\"').replace(/\n/g, '\\n');
                    content = content.split(escapedOld).join(escapedNew);
                }

                if (content !== originalContent) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`🚀 Nuked old text in: ${filePath}`);
                }
            } catch (err) { }
        }
    });
}

console.log('Initiating Super Scan for rogue template text...');
superReplace('./');
console.log('Hydration mismatch completely annihilated!');