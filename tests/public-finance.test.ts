import assert from "node:assert/strict";
import test from "node:test";
import { calculateRetentions } from "../src/lib/financeiro/retencoes.ts";
import { runMockIntegration } from "../src/lib/integrations/registry.ts";
import { exportPublicDataCSV, parsePublicDataFilter } from "../src/lib/transparencia/portal-fiscal.ts";
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
});

test("neutraliza fórmulas em exportações CSV", () => {
  const csv = exportPublicDataCSV([{ beneficiary: "=HYPERLINK(\"https://invalid.example\")" }]);

  assert.match(csv, /"'=HYPERLINK/);
  assert.doesNotMatch(csv, /\n"=HYPERLINK/);
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
