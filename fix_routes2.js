const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      if (dirPath.endsWith('.ts') || dirPath.endsWith('.tsx')) {
        callback(dirPath);
      }
    }
  });
}

walkDir('src/app/app-domain', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Replace href: "/app-domain/...
  content = content.replace(/href: "\/app-domain\//g, 'href: "/');
  // Replace href: "/app-domain"
  content = content.replace(/href: "\/app-domain"/g, 'href: "/"');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed:', filePath);
  }
});
