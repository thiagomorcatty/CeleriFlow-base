import { Landmark, Palette, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { GestaoCulturalClient, type CulturalRecord } from "../components/GestaoCulturalClient";

function assetReference(asset: { patrimonyNumber: string; name: string } | null) {
  return asset ? `${asset.patrimonyNumber} - ${asset.name}` : "Sem vínculo no Patrimônio";
}

function realEstateReference(realEstate: { municipalInsc: string | null; registration: string | null; streetName: string | null; number: string | null } | null) {
  if (!realEstate) return "Sem vínculo no Cadastro Imobiliário";

  const identification = realEstate.municipalInsc
    ? `Inscrição ${realEstate.municipalInsc}`
    : realEstate.registration
      ? `Matrícula ${realEstate.registration}`
      : "Imóvel sem inscrição informada";
  const address = [realEstate.streetName, realEstate.number].filter(Boolean).join(", ");

  return address ? `${identification} - ${address}` : identification;
}

export default async function GestaoCulturalPage() {
  const [agents, spaces, heritages] = await Promise.all([
    prisma.culturaAgente.findMany({
      include: { person: true, company: true },
      orderBy: { nome: "asc" },
    }),
    prisma.culturaEspaco.findMany({
      include: { asset: true, realEstate: true, responsibleEmployee: true },
      orderBy: { nome: "asc" },
    }),
    prisma.culturaPatrimonio.findMany({
      include: { asset: true, realEstate: true },
      orderBy: { nome: "asc" },
    }),
  ]);

  const records: CulturalRecord[] = [
    ...agents.map((agent) => ({
      id: agent.id,
      kind: "Agente" as const,
      name: agent.nome,
      classification: `${agent.tipo} / ${agent.segmento}`,
      status: agent.status,
      active: agent.active,
      references: [
        {
          label: "Cadastro Geral",
          value: agent.person
            ? `Pessoa Física: ${agent.person.fullName}${agent.person.cpf ? ` - CPF ${agent.person.cpf}` : ""}`
            : agent.company
              ? `Pessoa Jurídica: ${agent.company.corporateName}${agent.company.cnpj ? ` - CNPJ ${agent.company.cnpj}` : ""}`
              : "Sem vínculo no Cadastro Geral",
        },
      ],
    })),
    ...spaces.map((space) => ({
      id: space.id,
      kind: "Espaço" as const,
      name: space.nome,
      classification: space.tipo,
      status: space.status,
      active: space.active,
      references: [
        { label: "Patrimônio", value: assetReference(space.asset) },
        { label: "Cadastro Imobiliário", value: realEstateReference(space.realEstate) },
        {
          label: "RH",
          value: space.responsibleEmployee
            ? `${space.responsibleEmployee.name}${space.responsibleEmployee.registration ? ` - Matrícula ${space.responsibleEmployee.registration}` : ""}`
            : "Sem responsável vinculado no RH",
        },
      ],
    })),
    ...heritages.map((heritage) => ({
      id: heritage.id,
      kind: "Patrimônio" as const,
      name: heritage.nome,
      classification: [heritage.tipo, heritage.relevanciaCultural].filter(Boolean).join(" / "),
      status: heritage.status,
      active: heritage.active,
      references: [
        { label: "Patrimônio", value: assetReference(heritage.asset) },
        { label: "Cadastro Imobiliário", value: realEstateReference(heritage.realEstate) },
      ],
    })),
  ];

  const generalRegistryLinks = agents.filter((agent) => agent.personId || agent.companyId).length;
  const patrimonyLinks = [...spaces, ...heritages].filter((item) => item.assetId || item.realEstateId).length;
  const humanResourcesLinks = spaces.filter((space) => space.responsibleEmployeeId).length;

  return (
    <div className="max-w-7xl">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-pink-100 p-2.5 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">
            <Palette className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Gestão Cultural</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Consulta integrada de agentes, espaços culturais e patrimônio.</p>
          </div>
        </div>
      </header>

      <section aria-label="Integrações dos cadastros" className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4 dark:border-sky-900/50 dark:bg-sky-950/20">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">Cadastro Geral</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{generalRegistryLinks}</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Agentes vinculados a pessoa física ou jurídica</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
          <Landmark className="mb-2 h-4 w-4 text-amber-700 dark:text-amber-300" />
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Patrimônio</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{patrimonyLinks}</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Espaços ou bens com ativo ou imóvel vinculado</p>
        </div>
        <div className="rounded-xl border border-violet-100 bg-violet-50/70 p-4 dark:border-violet-900/50 dark:bg-violet-950/20">
          <Users className="mb-2 h-4 w-4 text-violet-700 dark:text-violet-300" />
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">RH</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{humanResourcesLinks}</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Espaços com responsável servidor vinculado</p>
        </div>
      </section>

      <GestaoCulturalClient records={records} />
    </div>
  );
}
