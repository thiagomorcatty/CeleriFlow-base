"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { registerAssetDisposal, runMonthlyDepreciation } from "./actions";

type AssetOption = { id: string; patrimonyNumber: string; name: string; currentValue: number };

export function AssetLifecycleClient({ assets, initialCompetence }: { assets: AssetOption[]; initialCompetence: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [competence, setCompetence] = useState(initialCompetence);
  const [assetId, setAssetId] = useState(assets[0]?.id ?? "");
  const [type, setType] = useState<"Baixa" | "Alienação">("Baixa");
  const [date, setDate] = useState(initialCompetence ? `${initialCompetence}-01` : "");
  const [reason, setReason] = useState("");
  const [justification, setJustification] = useState("");
  const [disposalValue, setDisposalValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function showResult(result: { error?: string; message?: string }) {
    setError(result.error ?? null);
    setMessage(result.message ?? null);
    if (!result.error) router.refresh();
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-lg border bg-white p-4">
        <h3 className="font-semibold">Depreciação mensal</h3>
        <p className="mt-1 text-sm text-muted-foreground">Método linear a partir da competência de aquisição, usando a vida útil da categoria.</p>
        <div className="mt-4 flex flex-wrap items-end gap-2">
          <label className="grid gap-1 text-sm font-medium">
            Competência
            <input className="h-9 rounded-md border px-3" type="month" value={competence} onChange={(event) => setCompetence(event.target.value)} />
          </label>
          <button
            type="button"
            className="h-9 rounded-md bg-amber-600 px-4 text-sm font-medium text-white disabled:opacity-50"
            disabled={isPending || !competence}
            onClick={() => startTransition(async () => showResult(await runMonthlyDepreciation(competence)))}
          >
            Processar competência
          </button>
        </div>
      </section>

      <section className="rounded-lg border bg-white p-4">
        <h3 className="font-semibold">Baixa ou alienação</h3>
        <p className="mt-1 text-sm text-muted-foreground">Registra valor contábil, valor recebido e ganho ou perda apenas como evidência interna.</p>
        {assets.length === 0 ? <p className="mt-4 text-sm text-muted-foreground">Não há bens disponíveis para baixa.</p> : (
          <form className="mt-4 grid gap-2" onSubmit={(event) => {
            event.preventDefault();
            startTransition(async () => {
              const result = await registerAssetDisposal({
                assetId,
                date,
                type,
                reason,
                justification,
                disposalValue,
              });
              showResult(result);
              if (!result.error) {
                setReason("");
                setJustification("");
                setDisposalValue("");
              }
            });
          }}>
            <select className="h-9 rounded-md border px-3 text-sm" value={assetId} onChange={(event) => setAssetId(event.target.value)}>
              {assets.map((asset) => <option key={asset.id} value={asset.id}>{asset.patrimonyNumber} - {asset.name} (R$ {asset.currentValue.toFixed(2)})</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <select className="h-9 rounded-md border px-3 text-sm" value={type} onChange={(event) => setType(event.target.value as "Baixa" | "Alienação")}>
                <option value="Baixa">Baixa</option>
                <option value="Alienação">Alienação</option>
              </select>
              <input className="h-9 rounded-md border px-3 text-sm" type="date" required value={date} onChange={(event) => setDate(event.target.value)} />
            </div>
            <input className="h-9 rounded-md border px-3 text-sm" placeholder="Valor recebido (R$)" inputMode="decimal" disabled={type === "Baixa"} value={disposalValue} onChange={(event) => setDisposalValue(event.target.value)} />
            <input className="h-9 rounded-md border px-3 text-sm" placeholder="Motivo" required value={reason} onChange={(event) => setReason(event.target.value)} />
            <textarea className="min-h-20 rounded-md border px-3 py-2 text-sm" placeholder="Justificativa" required value={justification} onChange={(event) => setJustification(event.target.value)} />
            <button className="h-9 rounded-md border border-amber-600 px-4 text-sm font-medium text-amber-700 disabled:opacity-50" disabled={isPending}>
              Registrar {type.toLowerCase()}
            </button>
          </form>
        )}
      </section>
      {(message || error) && <p className={`lg:col-span-2 text-sm ${error ? "text-red-600" : "text-emerald-700"}`}>{error ?? message}</p>}
    </div>
  );
}
