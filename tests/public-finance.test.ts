import assert from "node:assert/strict";
import test from "node:test";
import { calculateRetentions } from "../src/lib/financeiro/retencoes.ts";
import { runMockIntegration } from "../src/lib/integrations/registry.ts";
import { exportPublicDataCSV, parsePublicDataFilter } from "../src/lib/transparencia/portal-fiscal.ts";

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
