import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { ObrasProjetosClient } from "../components/ObrasProjetosClient";

export default async function ObrasProjetosPage() {
  const { prisma } = await getTenantContextForModule("OBRAS");
  const obras = await prisma.obrasObra.findMany({
    select: {
      id: true,
      numero: true,
      nome: true,
      descricao: true,
      local: true,
      tipo: true,
      valorEstimado: true,
      status: true,
      active: true,
    },
    orderBy: [{ numero: "asc" }, { id: "asc" }],
  });

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Obras e Projetos</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestão de obras públicas, projetos de engenharia e convênios federais/estaduais.</p>
        </div>
      </div>
      <ObrasProjetosClient obras={obras} />
    </div>
  );
}
