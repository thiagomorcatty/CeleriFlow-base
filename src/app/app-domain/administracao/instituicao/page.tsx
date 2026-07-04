import { prisma } from "@/lib/prisma";
import { InstitutionForm } from "./InstitutionForm";

export default async function InstituicaoPage() {
  const institution = await prisma.institution.findFirst();

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Prefeitura / Entidade Principal</h1>
        <p className="text-slate-500 mt-1">Configure os dados institucionais que aparecerão em relatórios e documentos oficiais.</p>
      </div>

      <InstitutionForm institution={institution} />
    </div>
  );
}
