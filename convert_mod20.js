const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'docs', 'Mod 20 - Segurança Publica e Mobilidade.docx');
const outputPath = path.join(__dirname, 'docs', 'mod20.md');

mammoth.extractRawText({path: inputPath})
    .then(function(result){
        var text = result.value;
        fs.writeFileSync(outputPath, text);
        console.log("Document converted successfully.");
    })
    .catch(function(error) {
        console.error("Error during conversion:", error);
    });
