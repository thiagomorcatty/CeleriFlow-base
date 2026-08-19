import PDFDocument from "./pdfkit";

type StatementLine = {
  date: Date;
  description: string | null;
  reference: string | null;
  signal: string | null;
  value: number;
  balance: number | null;
};

type InvestmentAllocation = {
  date: Date;
  reference: string | null;
  value: number;
};

export type BankStatementPdfData = {
  bankName: string;
  agency: string;
  accountNumber: string;
  accountPurpose?: string | null;
  periodStart: Date;
  periodEnd: Date;
  generatedAt: Date;
  statementType: "CORRENTE" | "APLICACAO";
  currentBalance: number;
  items: StatementLine[];
  investment?: {
    openingBalance: number;
    applications: number;
    redemptions: number;
    grossYield: number;
    incomeTax: number;
    iof: number;
    allocations: InvestmentAllocation[];
  };
};

const blue = "#174c92";
const lightBlue = "#dce7f3";
const gray = "#f4f6f8";
const green = "#087f5b";
const red = "#bd1e2d";

function currency(value: number) {
  return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

function date(value: Date) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(value);
}

function dateTime(value: Date) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(value);
}

function isDebit(item: StatementLine) {
  return item.signal === "DEBITO";
}

export function generateBankStatementPdf(data: BankStatementPdfData): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const document = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 32,
      info: { Title: `Extrato bancário ${data.accountNumber}`, Author: "CeleriFlow" },
    });
    const chunks: Buffer[] = [];
    document.on("data", (chunk: Buffer) => chunks.push(chunk));
    document.on("end", () => resolve(new Uint8Array(Buffer.concat(chunks))));
    document.on("error", reject);

    const left = document.page.margins.left;
    const right = document.page.width - document.page.margins.right;
    const bottom = () => document.page.height - document.page.margins.bottom;

    const header = (title: string) => {
      document.rect(left, 32, 66, 50).fill("#f6d91f");
      document.fillColor(blue).font("Helvetica-Bold").fontSize(11).text("CF", left + 20, 48);
      document.fillColor(blue).font("Helvetica-Bold").fontSize(19).text(title, left + 82, 45);
      document.fillColor("#334155").font("Helvetica").fontSize(8).text("CeleriFlow | demonstrativo bancário da POC", left + 82, 68);
      document.fillColor("#334155").font("Helvetica-Bold").fontSize(8).text(`Gerado em ${dateTime(data.generatedAt)}`, right - 165, 42, { width: 165, align: "right" });
      document.font("Helvetica").fontSize(7).text("Dados recebidos da integração bancária e normalizados pelo CeleriFlow.", right - 220, 58, { width: 220, align: "right" });
      document.y = 98;
    };

    const section = (title: string) => {
      const y = document.y;
      document.rect(left, y, right - left, 20).fill(lightBlue);
      document.fillColor("#334155").font("Helvetica-Bold").fontSize(10).text(title.toUpperCase(), left + 7, y + 5);
      document.y = y + 27;
    };

    const accountDetails = () => {
      section("Conta e período");
      const y = document.y;
      const fields = [
        ["Banco", data.bankName],
        ["Agência", data.agency],
        ["Conta", data.accountNumber],
        ["Finalidade", data.accountPurpose || "Tesouraria municipal"],
        ["Período", `${date(data.periodStart)} a ${date(data.periodEnd)}`],
      ];
      const width = (right - left) / fields.length;
      fields.forEach(([label, value], index) => {
        document.fillColor("#64748b").font("Helvetica-Bold").fontSize(7).text(label, left + index * width, y, { width: width - 8 });
        document.fillColor("#111827").font("Helvetica").fontSize(9).text(value, left + index * width, y + 11, { width: width - 8, ellipsis: true });
      });
      document.y = y + 32;
    };

    const tableHeader = () => {
      const y = document.y;
      const columns = [
        ["Data", 58, "left"],
        ["Histórico", 278, "left"],
        ["Documento", 112, "left"],
        ["Entrada (R$)", 105, "right"],
        ["Saída (R$)", 105, "right"],
        ["Saldo (R$)", 110, "right"],
      ] as const;
      document.rect(left, y, right - left, 18).fill("#e5e7eb");
      let x = left;
      document.fillColor("#475569").font("Helvetica-Bold").fontSize(7);
      columns.forEach(([label, width, alignment]) => {
        document.text(label, x + 4, y + 5, { width: width - 8, align: alignment });
        x += width;
      });
      document.y = y + 18;
    };

    const movements = () => {
      section("Lançamentos");
      tableHeader();
      let calculatedBalance = data.items.length ? data.currentBalance - data.items.reduce((sum, item) => sum + (isDebit(item) ? -item.value : item.value), 0) : data.currentBalance;
      for (const [index, item] of data.items.entries()) {
        const height = 18;
        if (document.y + height > bottom() - 32) {
          document.addPage();
          header("Extrato de Conta Corrente");
          section("Lançamentos - continuação");
          tableHeader();
        }
        const y = document.y;
        if (index % 2 === 0) document.rect(left, y, right - left, height).fill(gray);
        calculatedBalance += isDebit(item) ? -item.value : item.value;
        const balance = item.balance ?? calculatedBalance;
        const values = [
          [date(item.date), 58, "left", "#111827"],
          [item.description || "Movimentação bancária", 278, "left", "#334155"],
          [item.reference || "-", 112, "left", "#334155"],
          [isDebit(item) ? "-" : currency(item.value), 105, "right", isDebit(item) ? "#94a3b8" : green],
          [isDebit(item) ? currency(item.value) : "-", 105, "right", isDebit(item) ? red : "#94a3b8"],
          [currency(balance), 110, "right", balance < 0 ? red : blue],
        ] as const;
        let x = left;
        values.forEach(([value, width, alignment, color]) => {
          document.fillColor(color).font("Helvetica").fontSize(7.5).text(value, x + 4, y + 5, { width: width - 8, align: alignment, ellipsis: true });
          x += width;
        });
        document.y = y + height;
      }
      document.moveDown(0.8);
    };

    const investmentSummary = () => {
      if (!data.investment) return;
      document.addPage();
      header("Posição de Investimentos");
      accountDetails();
      section("Resumo do período");
      const investment = data.investment;
      const netYield = investment.grossYield - investment.incomeTax - investment.iof;
      const rows = [
        ["Saldo anterior", investment.openingBalance, blue],
        ["Aplicações (+)", investment.applications, green],
        ["Resgates (-)", investment.redemptions, red],
        ["Rendimento bruto (+)", investment.grossYield, green],
        ["Imposto de renda (-)", investment.incomeTax, red],
        ["IOF (-)", investment.iof, red],
        ["Rendimento líquido", netYield, blue],
        ["Saldo atual", data.currentBalance, blue],
      ] as const;
      const rowWidth = 260;
      for (const [label, value, color] of rows) {
        const y = document.y;
        document.fillColor("#111827").font("Helvetica-Bold").fontSize(9).text(label, left + 8, y, { width: rowWidth });
        document.fillColor(color).font("Helvetica-Bold").fontSize(9).text(currency(value), left + rowWidth, y, { width: 130, align: "right" });
        document.y = y + 17;
      }
      document.moveDown(0.8);

      section("Aplicações em aberto");
      const headerY = document.y;
      document.rect(left, headerY, right - left, 18).fill("#e5e7eb");
      const headers = [["Data", 100], ["Documento", 180], ["Valor aplicado (R$)", 150], ["Situação", 180]] as const;
      let headerX = left;
      document.fillColor("#475569").font("Helvetica-Bold").fontSize(7);
      headers.forEach(([label, width]) => { document.text(label, headerX + 4, headerY + 5, { width: width - 8 }); headerX += width; });
      document.y = headerY + 18;
      for (const allocation of investment.allocations) {
        const y = document.y;
        document.rect(left, y, right - left, 18).fill(gray);
        const values = [date(allocation.date), allocation.reference || "-", currency(allocation.value), "Aplicação ativa"];
        const widths = [100, 180, 150, 180];
        let x = left;
        values.forEach((value, index) => {
          document.fillColor(index === 2 ? blue : "#334155").font("Helvetica").fontSize(8).text(value, x + 4, y + 5, { width: widths[index] - 8, align: index === 2 ? "right" : "left" });
          x += widths[index];
        });
        document.y = y + 18;
      }
    };

    header(data.statementType === "APLICACAO" ? "Demonstrativo de Investimentos" : "Extrato de Conta Corrente");
    accountDetails();
    movements();
    investmentSummary();
    const footer = () => {
      document.font("Helvetica").fontSize(7).fillColor("#64748b").text("Documento gerado pelo CeleriFlow para conferência operacional. Não substitui o extrato oficial da instituição financeira.", left, bottom() - 12, { width: right - left, align: "center" });
    };
    footer();
    document.end();
  });
}
