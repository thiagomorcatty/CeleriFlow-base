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

walkDir('src/app/app-domain/saude', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Replace href="/app-domain/...
  content = content.replace(/href="\/app-domain\//g, 'href="/');
  // Replace href="/app-domain"
  content = content.replace(/href="\/app-domain"/g, 'href="/"');

  // Replace redirect("/app-domain/...
  content = content.replace(/redirect\("\/app-domain\//g, 'redirect("/');
  
  // Replace pathname checks
  content = content.replace(/pathname === "\/app-domain\//g, 'pathname === "/');
  content = content.replace(/pathname === "\/app-domain"/g, 'pathname === "/"');
  content = content.replace(/pathname\?\.startsWith\("\/app-domain\//g, 'pathname?.startsWith("/');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed:', filePath);
  }
});
