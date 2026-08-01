import { AssetLifecycleClient } from "./AssetLifecycleClient";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

function currency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export default async function AssetLifecyclePage() {
  const { prisma } = await getTenantContextForModule("PATRIMONIO");
  const [assets, writeOffs] = await Promise.all([
    prisma.asset.findMany({
      orderBy: { patrimonyNumber: "asc" },
      include: {
        category: { select: { name: true, lifeSpan: true } },
        valueHistory: { orderBy: { referenceMonth: "desc" }, take: 1 },
      },
    }),
    prisma.assetWriteOff.findMany({
      orderBy: { date: "desc" },
      take: 20,
      include: { asset: { select: { patrimonyNumber: true, name: true } } },
    }),
  ]);
  const activeAssets = assets.filter((asset) => asset.status !== "Baixado");
  const totalBookValue = activeAssets.reduce((total, asset) => total + asset.currentValue, 0);
  const initialCompetence = new Date().toISOString().slice(0, 7);

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Ciclo de Vida dos Bens</h2>
        <p className="mt-1 text-muted-foreground">Depreciação, valor contábil e evidências de baixa patrimonial.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-white p-4"><p className="text-sm text-muted-foreground">Bens em operação</p><p className="text-2xl font-bold">{activeAssets.length}</p></div>
        <div className="rounded-lg border bg-white p-4"><p className="text-sm text-muted-foreground">Valor contábil ativo</p><p className="text-2xl font-bold">{currency(totalBookValue)}</p></div>
        <div className="rounded-lg border bg-white p-4"><p className="text-sm text-muted-foreground">Baixas registradas</p><p className="text-2xl font-bold">{writeOffs.length}</p></div>
      </div>

      <AssetLifecycleClient
        assets={activeAssets.map((asset) => ({ id: asset.id, patrimonyNumber: asset.patrimonyNumber, name: asset.name, currentValue: asset.currentValue }))}
        initialCompetence={initialCompetence}
      />

      <section className="rounded-lg border bg-white">
        <div className="border-b p-4"><h3 className="font-semibold">Posição e último lançamento</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground"><tr><th className="p-3">Tombamento</th><th className="p-3">Categoria</th><th className="p-3">Valor contábil</th><th className="p-3">Última competência</th><th className="p-3">Depreciação</th><th className="p-3">Status</th></tr></thead>
            <tbody>
              {assets.map((asset) => {
                const history = asset.valueHistory[0];
                return <tr key={asset.id} className="border-t"><td className="p-3 font-medium">{asset.patrimonyNumber}<br /><span className="font-normal text-muted-foreground">{asset.name}</span></td><td className="p-3">{asset.category.name}<br /><span className="text-muted-foreground">{asset.category.lifeSpan} meses</span></td><td className="p-3">{currency(asset.currentValue)}</td><td className="p-3">{history ? history.referenceMonth.toLocaleDateString("pt-BR", { month: "2-digit", year: "numeric", timeZone: "UTC" }) : "Sem lançamento"}</td><td className="p-3">{history ? currency(history.depreciation) : "-"}</td><td className="p-3">{asset.status}</td></tr>;
              })}
              {assets.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Nenhum bem patrimonial encontrado.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border bg-white">
        <div className="border-b p-4"><h3 className="font-semibold">Evidências de baixa e alienação</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm"><thead className="bg-muted text-muted-foreground"><tr><th className="p-3">Data</th><th className="p-3">Bem</th><th className="p-3">Tipo</th><th className="p-3">Valor contábil</th><th className="p-3">Recebido</th><th className="p-3">Ganho/perda</th></tr></thead><tbody>
            {writeOffs.map((writeOff) => <tr key={writeOff.id} className="border-t"><td className="p-3">{writeOff.date.toLocaleDateString("pt-BR", { timeZone: "UTC" })}</td><td className="p-3">{writeOff.asset.patrimonyNumber} - {writeOff.asset.name}</td><td className="p-3">{writeOff.type}</td><td className="p-3">{currency(writeOff.bookValue)}</td><td className="p-3">{currency(writeOff.disposalValue)}</td><td className="p-3">{currency(writeOff.gainLoss)}</td></tr>)}
            {writeOffs.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Nenhuma baixa registrada.</td></tr>}
          </tbody></table>
        </div>
      </section>
    </div>
  );
}
