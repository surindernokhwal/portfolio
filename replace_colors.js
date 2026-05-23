const fs = require('fs');
const path = require('path');

const dir = 'c:\\work\\portfolio\\src';

function replaceInDir(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Replace Tailwind utility classes
      content = content.replace(/bg-\[\#020617\]/g, 'bg-background');
      content = content.replace(/from-\[\#020617\]/g, 'from-background');
      content = content.replace(/via-\[\#020617\]/g, 'via-background');
      content = content.replace(/to-\[\#020617\]/g, 'to-background');

      // Replace instances that have opacity like bg-[#020617]/50 -> bg-background/50
      // The previous replace will result in bg-background/50 if the original was bg-[#020617]/50.
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

replaceInDir(dir);
console.log('Done');
