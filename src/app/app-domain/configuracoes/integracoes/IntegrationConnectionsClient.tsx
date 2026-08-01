"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Cable, FlaskConical, Save, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { testIntegrationConnection, saveIntegrationConnection } from "./actions";

type CatalogItem = {
  code: string;
  name: string;
  category: string;
  provider: string;
  description: string;
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
  runs: { id: string; operation: string; environment: string; status: string; message: string; createdAt: Date }[];
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
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-slate-900 p-3 text-white"><Cable className="h-6 w-6" /></div>
        <div><h1 className="text-2xl font-bold">Conexões e Integrações</h1><p className="text-sm text-muted-foreground">Catálogo central de ambientes, parâmetros e testes. Segredos ficam apenas no cofre externo.</p></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-xl border bg-white p-3">
          {catalog.map((connection) => {
            const configured = connections.find((item) => item.code === connection.code);
            return <button key={connection.code} onClick={() => selectConnection(connection.code)} className={`mb-1 w-full rounded-lg p-3 text-left ${selectedCode === connection.code ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`}><div className="flex justify-between gap-2"><span className="font-semibold">{connection.name}</span><span className="text-xs">{configured?.environment ?? "NOVA"}</span></div><span className={`text-xs ${selectedCode === connection.code ? "text-slate-300" : "text-muted-foreground"}`}>{connection.category}</span></button>;
          })}
        </aside>

        {selectedDefinition && <section className="rounded-xl border bg-white p-6">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-xl font-bold">{selectedDefinition.name}</h2><p className="text-sm text-muted-foreground">{selectedDefinition.provider}. {selectedDefinition.description}</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{selectedConnection?.status ?? "NÃO CONFIGURADA"}</span></div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Ambiente</Label><select className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={form.environment} onChange={(event) => setForm({ ...form, environment: event.target.value as FormState["environment"] })}><option value="MOCK">Mock local</option><option value="HOMOLOGACAO">Homologação</option><option value="PRODUCAO">Produção</option></select></div>
            <div className="space-y-2"><Label>URL base</Label><Input placeholder="https://api.fornecedor.gov.br" value={form.baseUrl} onChange={(event) => setForm({ ...form, baseUrl: event.target.value })} /></div>
            <div className="space-y-2"><Label>Referência de credencial</Label><Input placeholder="secret://cliente/tce-pb" value={form.credentialReference} onChange={(event) => setForm({ ...form, credentialReference: event.target.value })} /></div>
            <label className="flex items-center gap-2 pt-7 text-sm"><input type="checkbox" checked={form.enabled} onChange={(event) => setForm({ ...form, enabled: event.target.checked })} /> Habilitar conector</label>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2"><div className="space-y-2"><Label>Parâmetros públicos (JSON)</Label><Textarea className="min-h-36 font-mono text-xs" value={form.configurationJson} onChange={(event) => setForm({ ...form, configurationJson: event.target.value })} placeholder='{"layoutVersion":"2026"}' /></div><div className="space-y-2"><Label>Cenário mock (JSON)</Label><Textarea className="min-h-36 font-mono text-xs" value={form.mockScenarioJson} onChange={(event) => setForm({ ...form, mockScenarioJson: event.target.value })} /></div></div>
          <div className="mt-5 flex flex-wrap gap-3"><Button onClick={save} disabled={pending}><Save className="mr-2 h-4 w-4" />Salvar conexão</Button><Button variant="outline" onClick={test} disabled={pending || !selectedConnection}><FlaskConical className="mr-2 h-4 w-4" />Testar</Button></div>
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"><ShieldCheck className="mr-2 inline h-4 w-4" />Nunca informe segredo, senha, token, chave privada ou certificado neste painel. Informe somente uma referência `env:`, `vault:` ou `secret://`.</div>
          {selectedConnection?.runs.length ? <div className="mt-6"><h3 className="mb-2 font-semibold">Últimos testes</h3>{selectedConnection.runs.map((run) => <div key={run.id} className="mb-2 rounded border p-3 text-sm"><div className="flex justify-between"><span className="font-medium">{run.operation} · {run.environment}</span><span>{run.status}</span></div><p className="text-muted-foreground">{run.message}</p></div>)}</div> : null}
        </section>}
      </div>
    </div>
  );
}
