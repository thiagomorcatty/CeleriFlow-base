"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Cable, FlaskConical, Save, ShieldCheck, Eye, RefreshCw, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { testIntegrationConnection, saveIntegrationConnection } from "./actions";
import IntegrationRunModal from "./IntegrationRunModal";

type CatalogItem = {
  code: string;
  name: string;
  category: string;
  provider: string;
  description: string;
};

type ConnectionRun = {
  id: string;
  operation: string;
  environment: string;
  status: string;
  message: string;
  createdAt: Date;
  responsePayload?: string | null;
  requestPayload?: string | null;
};

type Connection = {
  id: string;
  code: string;
  name: string;
  category: string;
  provider: string;
  environment: string;
  status: string;
  baseUrl: string | null;
  credentialReference: string | null;
  configuration: string;
  mockScenario: string;
  lastTestedAt: Date | null;
  lastTestStatus: string | null;
  lastTestMessage: string | null;
  runs: ConnectionRun[];
};

type FormState = {
  code: string;
  environment: "MOCK" | "HOMOLOGACAO" | "PRODUCAO";
  baseUrl: string;
  credentialReference: string;
  configurationJson: string;
  mockScenarioJson: string;
  enabled: boolean;
};

function formFor(connection: Connection | undefined, code: string): FormState {
  return {
    code,
    environment: connection?.environment === "PRODUCAO" || connection?.environment === "HOMOLOGACAO" ? connection.environment : "MOCK",
    baseUrl: connection?.baseUrl ?? "",
    credentialReference: connection?.credentialReference ?? "",
    configurationJson: connection?.configuration ?? "",
    mockScenarioJson: connection?.mockScenario ?? '{\n  "scenario": "success"\n}',
    enabled: connection?.status !== "DESATIVADA",
  };
}

export default function IntegrationConnectionsClient({ catalog, connections }: { catalog: CatalogItem[]; connections: Connection[] }) {
  const router = useRouter();
  const [selectedCode, setSelectedCode] = useState(catalog[0]?.code ?? "");
  const selectedConnection = connections.find((connection) => connection.code === selectedCode);
  const [form, setForm] = useState<FormState>(() => formFor(selectedConnection, selectedCode));
  const [pending, setPending] = useState(false);
  const [activeModalRun, setActiveModalRun] = useState<ConnectionRun | null>(null);

  const selectConnection = (code: string) => {
    setSelectedCode(code);
    setForm(formFor(connections.find((connection) => connection.code === code), code));
  };

  const save = async () => {
    setPending(true);
    const result = await saveIntegrationConnection(form);
    setPending(false);
    if (result.error) return alert(result.error);
    alert(result.data?.message);
    router.refresh();
  };

  const test = async () => {
    if (!selectedConnection) return alert("Salve a conexão antes de testá-la.");
    setPending(true);
    const result = await testIntegrationConnection(selectedConnection.id);
    setPending(false);
    if (result.error) return alert(result.error);
    alert(result.data?.message);
    router.refresh();
  };

  const selectedDefinition = catalog.find((connection) => connection.code === selectedCode);

  return (
    <div className="flex-1 space-y-6 p-8 bg-slate-950 text-slate-100 min-h-screen">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-indigo-600/30 p-3 text-indigo-400 border border-indigo-500/30">
            <Cable className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Console Técnico de Integrações</h1>
            <p className="text-sm text-slate-400">
              Catálogo central de ambientes, parâmetros e evidências técnicas auditáveis para a comissão de avaliação da POC.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 text-xs font-mono">
          <Layers className="w-4 h-4 text-indigo-400" />
          Modo POC: Integrações Simuladas Ativas
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 backdrop-blur-md">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">Conectores Disponíveis</h3>
          {catalog.map((connection) => {
            const configured = connections.find((item) => item.code === connection.code);
            const isSelected = selectedCode === connection.code;
            return (
              <button
                key={connection.code}
                onClick={() => selectConnection(connection.code)}
                className={`mb-1.5 w-full rounded-xl p-3 text-left transition-all ${
                  isSelected
                    ? "bg-indigo-600/30 border border-indigo-500/40 text-white shadow-lg"
                    : "bg-slate-950/40 border border-slate-800/40 hover:bg-slate-800/60 text-slate-300"
                }`}
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="font-semibold text-sm">{connection.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {configured?.environment ?? "NOVA"}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                  <span>{connection.category}</span>
                  <span className={`w-2 h-2 rounded-full ${configured?.status === "DESATIVADA" ? "bg-rose-500" : "bg-emerald-400"}`} />
                </div>
              </button>
            );
          })}
        </aside>

        {selectedDefinition && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedDefinition.name}</h2>
                <p className="text-sm text-slate-400">
                  {selectedDefinition.provider}. {selectedDefinition.description}
                </p>
              </div>
              <span className="rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 text-xs font-semibold">
                {selectedConnection?.status ?? "NÃO CONFIGURADA"}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-slate-300">Ambiente Utilizado</Label>
                <select
                  className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 text-sm text-white focus:ring-2 focus:ring-indigo-500"
                  value={form.environment}
                  onChange={(event) => setForm({ ...form, environment: event.target.value as FormState["environment"] })}
                >
                  <option value="MOCK">Mock Local (Simulação POC)</option>
                  <option value="HOMOLOGACAO">Homologação Órgão Externo</option>
                  <option value="PRODUCAO">Produção Real</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Endpoint API</Label>
                <Input
                  placeholder="https://api.fornecedor.gov.br"
                  className="bg-slate-950 border-slate-800 text-white font-mono text-xs"
                  value={form.baseUrl}
                  onChange={(event) => setForm({ ...form, baseUrl: event.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Referência de Credencial</Label>
                <Input
                  placeholder="secret://cliente/tce-pb"
                  className="bg-slate-950 border-slate-800 text-white font-mono text-xs"
                  value={form.credentialReference}
                  onChange={(event) => setForm({ ...form, credentialReference: event.target.value })}
                />
              </div>
              <label className="flex items-center gap-2 pt-7 text-sm text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                  checked={form.enabled}
                  onChange={(event) => setForm({ ...form, enabled: event.target.checked })}
                />
                Habilitar Conector
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-slate-300">Parâmetros Públicos (JSON)</Label>
                <Textarea
                  className="min-h-32 font-mono text-xs bg-slate-950 border-slate-800 text-indigo-300"
                  value={form.configurationJson}
                  onChange={(event) => setForm({ ...form, configurationJson: event.target.value })}
                  placeholder='{"layoutVersion":"2026.1"}'
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Cenário Mock (JSON)</Label>
                <Textarea
                  className="min-h-32 font-mono text-xs bg-slate-950 border-slate-800 text-emerald-300"
                  value={form.mockScenarioJson}
                  onChange={(event) => setForm({ ...form, mockScenarioJson: event.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button onClick={save} disabled={pending} className="bg-indigo-600 hover:bg-indigo-500 text-white">
                <Save className="mr-2 h-4 w-4" /> Salvar Conexão
              </Button>
              <Button variant="outline" onClick={test} disabled={pending || !selectedConnection} className="border-slate-700 text-slate-200 hover:bg-slate-800">
                <FlaskConical className="mr-2 h-4 w-4 text-emerald-400" /> Testar Execução
              </Button>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-950/30 p-3.5 text-xs text-amber-300 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-amber-400" />
              <span>Segredo, senha e chaves privadas permanecem retidos no cofre externo (`secret://`).</span>
            </div>

            {/* Run History with Evidences */}
            {selectedConnection?.runs.length ? (
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">Histórico de Execuções e Evidências Técnicas</h3>
                  <span className="text-xs text-slate-400">Clique para inspecionar Payloads & Protocolo</span>
                </div>
                <div className="space-y-2">
                  {selectedConnection.runs.map((run) => (
                    <div
                      key={run.id}
                      onClick={() => setActiveModalRun(run)}
                      className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-950 cursor-pointer transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-slate-200">{run.operation}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                            {run.environment}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{run.message}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                          run.status === "SUCCESS" || run.status === "SUCESSO"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-rose-500/20 text-rose-300"
                        }`}>
                          {run.status}
                        </span>
                        <Eye className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        )}
      </div>

      {/* Modal for Technical Evidence Inspection */}
      <IntegrationRunModal
        isOpen={!!activeModalRun}
        onClose={() => setActiveModalRun(null)}
        connectionName={selectedDefinition?.name || "Integração"}
        environment={form.environment}
        endpoint={form.baseUrl}
        run={activeModalRun}
        onReprocess={async () => {
          if (selectedConnection) {
            await testIntegrationConnection(selectedConnection.id);
            router.refresh();
          }
        }}
      />
    </div>
  );
}
