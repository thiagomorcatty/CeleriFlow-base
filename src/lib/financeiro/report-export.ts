import PDFDocument from "pdfkit";
import type { InternalReportDataset, ReportRow } from "./report-delivery";

function rowHeaders(rows: ReportRow[]) {
  return [...new Set(rows.flatMap((row) => Object.keys(row)))];
}

function displayValue(value: string | number) {
  return typeof value === "number" ? new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value) : value;
}

export function generateReportPdf(dataset: InternalReportDataset): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const document = new PDFDocument({ size: "A4", layout: "landscape", margin: 36, info: { Title: dataset.title, Author: "CeleriFlow" } });
    const chunks: Buffer[] = [];
    document.on("data", (chunk: Buffer) => chunks.push(chunk));
    document.on("end", () => resolve(new Uint8Array(Buffer.concat(chunks))));
    document.on("error", reject);

    const pageWidth = document.page.width - document.page.margins.left - document.page.margins.right;
    const bottom = () => document.page.height - document.page.margins.bottom;
    const heading = () => {
      document.font("Helvetica-Bold").fontSize(15).text(dataset.title);
      document.font("Helvetica").fontSize(9).text(`Exercício ${dataset.year} | ${dataset.metadata.scope} | ${dataset.metadata.referencePeriod}`);
      document.font("Helvetica").fontSize(8).text(`Situação: ${dataset.metadata.status} | Completude estatutária: ${dataset.metadata.statutoryCompleteness} | Snapshot público: ${dataset.metadata.publicSnapshotEligible ? "elegível sob condição" : "não aprovado"}`);
      document.font("Helvetica").fontSize(8).text(dataset.metadata.publicSnapshotCondition);
      dataset.warnings.forEach((warning) => document.fillColor("#8a3b12").fontSize(8).text(warning));
      document.fillColor("black").moveDown(0.7);
    };
    const nextPage = () => { document.addPage(); heading(); };
    heading();

    for (const section of dataset.sections) {
      if (document.y > bottom() - 54) nextPage();
      document.font("Helvetica-Bold").fontSize(11).text(section.title).moveDown(0.25);
      if (!section.rows.length) {
        document.font("Helvetica").fontSize(9).text("Sem dados registrados para o exercício.").moveDown(0.7);
        continue;
      }
      const headers = rowHeaders(section.rows);
      const columnWidth = pageWidth / headers.length;
      const drawHeader = () => {
        const y = document.y;
        document.font("Helvetica-Bold").fontSize(7);
        headers.forEach((header, index) => document.text(header, 36 + index * columnWidth + 2, y + 2, { width: columnWidth - 4, height: 18, ellipsis: true }));
        document.y = y + 20;
      };
      drawHeader();
      for (const row of section.rows) {
        document.font("Helvetica").fontSize(7);
        const values = headers.map((header) => displayValue(row[header] ?? ""));
        const height = Math.max(16, ...values.map((value) => document.heightOfString(value, { width: columnWidth - 4 }) + 4));
        if (document.y + height > bottom()) {
          nextPage();
          document.font("Helvetica-Bold").fontSize(11).text(section.title).moveDown(0.25);
          drawHeader();
        }
        const y = document.y;
        values.forEach((value, index) => document.text(value, 36 + index * columnWidth + 2, y + 2, { width: columnWidth - 4, height: height - 4, ellipsis: true }));
        document.moveTo(36, y + height).lineTo(36 + pageWidth, y + height).strokeColor("#d1d5db").stroke();
        document.y = y + height;
      }
      document.moveDown(0.7);
    }
    document.end();
  });
}
