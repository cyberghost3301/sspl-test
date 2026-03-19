const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('c:/Users/Laraib/Documents/GitHub/spirecrest-ascent/src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const lines = content.split('\n');
  const newLines = lines.map(line => {
    if (line.includes('from "framer-motion"') || line.includes("from 'framer-motion'")) {
      if (line.match(/\bmotion\b/) && !line.match(/m as motion/)) {
        changed = true;
        return line.replace(/\bmotion\b/, 'm as motion');
      }
    }
    return line;
  });

  if (changed) {
    fs.writeFileSync(file, newLines.join('\n'), 'utf8');
    console.log(`Updated ${file}`);
  }
});
