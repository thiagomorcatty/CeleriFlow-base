import PDFDocument from "pdfkit/js/pdfkit.standalone.js";

// The standalone build embeds the standard PDF fonts, avoiding filesystem reads in serverless functions.
export default PDFDocument;
