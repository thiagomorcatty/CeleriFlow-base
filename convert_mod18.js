const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'docs', 'Mod 18 - Obras e Infraestrutura.docx');
const outputPath = path.join(__dirname, 'docs', 'mod18.md');

mammoth.extractRawText({path: inputPath})
    .then(function(result){
        var text = result.value;
        fs.writeFileSync(outputPath, text);
        console.log("Document converted successfully.");
    })
    .catch(function(error) {
        console.error(error);
    });
