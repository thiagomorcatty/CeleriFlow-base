const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'docs', 'Mod 17 - Câmara Municipal.docx');
const outputPath = path.join(__dirname, 'docs', 'mod17.md');

mammoth.extractRawText({path: inputPath})
    .then(function(result){
        var text = result.value; // The raw text
        fs.writeFileSync(outputPath, text);
        console.log("Document converted successfully.");
    })
    .catch(function(error) {
        console.error(error);
    });
