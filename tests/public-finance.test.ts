import assert from "node:assert/strict";
import test from "node:test";
import { calculateRetentions } from "../src/lib/financeiro/retencoes.ts";
import { runMockIntegration } from "../src/lib/integrations/registry.ts";
import { exportPublicDataCSV, getPublicExpenses, getPublicRevenues, parsePublicDataFilter } from "../src/lib/transparencia/portal-fiscal.ts";
import { financialReportFilename, generateFinancialReportCsv, isFinancialReportType } from "../src/lib/financeiro/report-delivery.ts";

test("calcula retenções com base e alíquota configuradas", () => {
  const [retention] = calculateRetentions(1_000, [
    { type: "INSS", calculationBasePercentage: 20, ratePercentage: 11 },
  ]);

  assert.equal(retention.baseValue.toString(), "200");
  assert.equal(retention.retainedValue.toString(), "22");
});

test("valida e normaliza filtros da API pública", () => {
  const filter = parsePublicDataFilter(new URLSearchParams("year=2026&page=2&pageSize=25&search=saude"));

  assert.deepEqual(filter, { year: 2026, page: 2, pageSize: 25, search: "saude" });
  assert.throws(() => parsePublicDataFilter(new URLSearchParams("pageSize=101")));
  assert.throws(() => parsePublicDataFilter(new URLSearchParams("revenueClassification=SIGILOSA")));
});

test("neutraliza fórmulas em exportações CSV", () => {
  const csv = exportPublicDataCSV([{ beneficiary: "=HYPERLINK(\"https://invalid.example\")" }]);

  assert.match(csv, /"'=HYPERLINK/);
  assert.doesNotMatch(csv, /\n"=HYPERLINK/);
  assert.match(exportPublicDataCSV([{ value: "\t=1+1" }]), /"'\t=1\+1"/);
});

test("projeta despesa pública sem identificadores internos ou dados pessoais", async () => {
  let where: unknown;
  const db = {
    commitment: {
      count: async ({ where: receivedWhere }: { where: unknown }) => {
        where = receivedWhere;
        return 1;
      },
      findMany: async () => [{
        id: "internal-commitment-id",
        number: "EMP-2026-001",
        date: new Date("2026-02-01T00:00:00.000Z"),
        value: 100,
        valueDecimal: null,
        status: "Pago",
        updatedAt: new Date("2026-02-03T00:00:00.000Z"),
        creditor: { name: "Maria da Silva", document: "12345678901", personId: "person-1" },
        supplier: { person: { cpf: "12345678901" }, company: null },
        appropriation: {
          code: "02.001.10.301.0001.2001.3.3.90.30",
          budgetUnit: { code: "02.001", name: "Fundo Municipal de Saúde" },
          expenseNature: { code: "3.3.90.30", name: "Material de Consumo" },
          resourceSource: { code: "500", name: "Recursos não vinculados" },
        },
        settlements: [{ date: new Date("2026-02-02T00:00:00.000Z"), value: 100, valueDecimal: null }],
        payments: [{ date: new Date("2026-02-03T00:00:00.000Z"), value: 100, valueDecimal: null }],
      }],
    },
  } as never;

  const result = await getPublicExpenses(db, { budgetUnitCode: "02.001", resourceSourceCode: "500" });
  const row = result.data[0];

  assert.equal(row.supplierName, "PESSOA FÍSICA");
  assert.equal(row.supplierDocumentMasked, "***.456.789-**");
  assert.equal(row.committedValue, 100);
  assert.equal(row.settledValue, 100);
  assert.equal(row.paidValue, 100);
  assert.equal(row.paidPaymentCount, 1);
  assert.equal("id" in row, false);
  assert.equal("history" in row, false);
  assert.match(JSON.stringify(where), /budgetUnit/);
  assert.match(JSON.stringify(where), /resourceSource/);
});

test("projeta receita arrecadada com classificação, fonte e unidade disponíveis", async () => {
  const db = {
    revenue: {
      count: async () => 1,
      findMany: async () => [{
        id: "internal-revenue-id",
        date: new Date("2026-02-01T00:00:00.000Z"),
        launchDate: new Date("2026-01-15T00:00:00.000Z"),
        collectionDate: new Date("2026-02-01T00:00:00.000Z"),
        value: 250,
        valueDecimal: null,
        status: "Arrecadada",
        classification: "ORCAMENTARIA",
        updatedAt: new Date("2026-02-01T00:00:00.000Z"),
        revenueNature: { code: "1.1.1.3.03.1.1", name: "Imposto sobre a Renda" },
        resourceSource: { code: "500", name: "Recursos não vinculados" },
        bankAccount: { budgetUnit: { code: "02.001", name: "Fundo Municipal de Saúde" } },
      }],
    },
  } as never;

  const result = await getPublicRevenues(db, { revenueClassification: "ORCAMENTARIA" });
  const row = result.data[0];

  assert.equal(row.classification, "ORCAMENTARIA");
  assert.equal(row.resourceSourceCode, "500");
  assert.equal(row.budgetUnitCode, "02.001");
  assert.equal(row.value, 250);
  assert.equal("id" in row, false);
});

test("executa conectores externos em modo mock sem chamada de rede", () => {
  const result = runMockIntegration("SICONFI", "GERAR_REMESSA");

  assert.equal(result.status, "SUCESSO");
  assert.equal(result.payload.simulated, true);
  assert.match(result.externalId, /^MOCK-SICONFI-/);
});

test("aceita apenas tipos internos de relatório e gera nome CSV previsível", () => {
  assert.equal(isFinancialReportType("RREO"), true);
  assert.equal(isFinancialReportType("PDF"), false);
  assert.equal(financialReportFilename("BALANCO_PATRIMONIAL", 2026), "relatorio-balanco_patrimonial-2026.csv");
});

test("entrega o Diário canônico como CSV seguro", async () => {
  const db = {
    accountingTransaction: {
      findMany: async () => [{
        id: "transaction-1",
        date: new Date("2026-01-02T00:00:00.000Z"),
        history: "=FORMULA",
        entries: [{
          accountId: "account-1",
          account: { code: "1.1.1", name: "Caixa" },
          type: "Débito",
          valueDecimal: 100,
        }],
      }],
    },
  } as never;

  const result = await generateFinancialReportCsv(db, "DIARIO", "year-2026");

  assert.equal(result.rowCount, 1);
  assert.match(result.csv, /"data","historico","contaCodigo"/);
  assert.match(result.csv, /"'=FORMULA"/);
});
