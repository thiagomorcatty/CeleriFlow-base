const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'docs', 'Mod 21 - Configurações e Integrações.docx');
const outputPath = path.join(__dirname, 'docs', 'mod21.md');

mammoth.extractRawText({path: inputPath})
    .then(function(result){
        var text = result.value;
        fs.writeFileSync(outputPath, text);
        console.log("Document converted successfully.");
    })
    .catch(function(error) {
        console.error("Error during conversion:", error);
    });
