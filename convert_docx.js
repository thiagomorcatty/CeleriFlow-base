const mammoth = require('mammoth');
const fs = require('fs');

mammoth.extractRawText({path: "docs/Mod 15 - Meio Ambiente.docx"})
    .then(function(result){
        var text = result.value; // The raw text
        fs.writeFileSync("docs/mod15.md", text);
        console.log("Document converted successfully.");
    })
    .catch(function(error) {
        console.error(error);
    });
