const fs = require('fs');
const AdmZip = require('adm-zip');

try {
  const docxPath = 'docs/Mod 14 - Assistência Social.docx';
  if (!fs.existsSync(docxPath)) {
    console.log('File not found: ' + docxPath);
    process.exit(1);
  }
  const zip = new AdmZip(docxPath);
  const zipEntries = zip.getEntries();
  
  const documentXmlEntry = zipEntries.find(entry => entry.entryName === 'word/document.xml');
  if (!documentXmlEntry) {
    console.log('document.xml not found inside the docx.');
    process.exit(1);
  }
  
  const xmlData = documentXmlEntry.getData().toString('utf8');
  
  // Basic XML parsing to extract text
  // Each <w:p> is a paragraph, <w:t> is text inside
  const paragraphs = xmlData.match(/<w:p[^>]*>.*?<\/w:p>/g) || [];
  
  const extractedText = paragraphs.map(p => {
    const texts = p.match(/<w:t[^>]*>.*?<\/w:t>/g) || [];
    return texts.map(t => t.replace(/<[^>]+>/g, '')).join('');
  }).filter(text => text.trim().length > 0);
  
  fs.writeFileSync('docs/mod14.md', extractedText.join('\n\n'));
  console.log('Successfully extracted Mod 14 to docs/mod14.md');
} catch (e) {
  console.error('Error extracting docx:', e);
}
