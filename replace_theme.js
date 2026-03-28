const fs = require('fs');
const path = require('path');

function replaceColors(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceColors(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const original = content;
      
      // Hex map
      content = content.replace(/#4885ed/g, '#25a194');
      content = content.replace(/#4885ED/g, '#25a194');

      // Tailwind class maps mapping tailwind blues to teal variants for #25a194
      content = content.replace(/bg-blue-600/g, 'bg-[#208b80]');
      content = content.replace(/bg-blue-700/g, 'bg-[#197067]');
      content = content.replace(/ring-blue-500/g, 'ring-[#25a194]');
      
      content = content.replace(/text-blue-500/g, 'text-[#25a194]');
      content = content.replace(/text-blue-600/g, 'text-[#25a194]');
      content = content.replace(/text-blue-700/g, 'text-[#208b80]');
      
      content = content.replace(/bg-blue-50\/50/g, 'bg-[#e9f7f6]/50');
      content = content.replace(/bg-blue-50/g, 'bg-[#e9f7f6]');
      content = content.replace(/bg-blue-100/g, 'bg-[#d3efed]');
      
      content = content.replace(/border-blue-600/g, 'border-[#25a194]');
      content = content.replace(/border-l-blue-600/g, 'border-l-[#25a194]');

      if (original !== content) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated colors in ${fullPath}`);
      }
    }
  }
}

replaceColors('./src');
