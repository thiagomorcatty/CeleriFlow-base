const fs = require('fs');
const path = require('path');

const rootDir = 'src/app/app-domain';
const pattern = /(['"])\/app-domain([/'"])/g;

let count = 0;

function walkSync(currentDirPath) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.ts'))) {
            const content = fs.readFileSync(filePath, 'utf8');
            const newContent = content.replace(pattern, '$1$2');
            if (newContent !== content) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                count++;
                console.log('Fixed:', filePath);
            }
        } else if (stat.isDirectory()) {
            walkSync(filePath);
        }
    });
}

walkSync(rootDir);
console.log('Total files modified:', count);
