"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import {
  FileText,
  FolderKanban,
  Landmark,
  ReceiptText,
  Search,
  ShoppingCart,
  FileSignature,
  UserRound,
  Sparkles,
  Award,
  CheckCircle2,
  Send,
  Coins
} from "lucide-react";
import { submitCulturalProjectAction, submitAccountabilityAction } from "../fomento-projetos/fomento-actions";

export type CulturaProjetoListItem = {
  id: string;
  numero: string;
  nome: string;
  descricao: string | null;
  categoria: string;
  status: string;
  valorSolicitado: number | null;
  createdAt: string;
  agente: {
    nome: string;
    tipo: string;
    segmento: string;
    pessoaNome: string | null;
    empresaNome: string | null;
  };
  appropriation: { id: string; code: string } | null;
  commitment: { id: string; number: string } | null;
  purchaseProcess: { id: string; number: string } | null;
  contract: { id: string; number: string } | null;
  documentCount: number;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function nomeProponente(projeto: CulturaProjetoListItem) {
  return projeto.agente.pessoaNome ?? projeto.agente.empresaNome ?? projeto.agente.nome;
}

function VinculosProjeto({ projeto }: { projeto: CulturaProjetoListItem }) {
  const temVinculo = projeto.appropriation || projeto.commitment || projeto.purchaseProcess || projeto.contract;

  if (!temVinculo) {
    return <span className="text-xs text-slate-500 dark:text-slate-400">Sem vínculos registrados</span>;
  }

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs font-medium">
      {projeto.appropriation && (
        <Link href="/financeiro/orcamento" className="inline-flex items-center gap-1 text-indigo-700 hover:underline dark:text-indigo-300">
          <Landmark className="h-3.5 w-3.5" />
          Dotação {projeto.appropriation.code}
        </Link>
      )}
      {projeto.commitment && (
        <Link href="/financeiro/empenhos" className="inline-flex items-center gap-1 text-emerald-700 hover:underline dark:text-emerald-300">
          <ReceiptText className="h-3.5 w-3.5" />
          Empenho {projeto.commitment.number}
        </Link>
      )}
      {projeto.purchaseProcess && (
        <Link href={`/compras/processos/${projeto.purchaseProcess.id}`} className="inline-flex items-center gap-1 text-amber-700 hover:underline dark:text-amber-300">
          <ShoppingCart className="h-3.5 w-3.5" />
          Processo {projeto.purchaseProcess.number}
        </Link>
      )}
      {projeto.contract && (
        <Link href={`/compras/contratos/${projeto.contract.id}`} className="inline-flex items-center gap-1 text-rose-700 hover:underline dark:text-rose-300">
          <FileSignature className="h-3.5 w-3.5" />
          Contrato {projeto.contract.number}
        </Link>
      )}
    </div>
  );
}

export default function CulturaProjetosClient({ projetos }: { projetos: CulturaProjetoListItem[] }) {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [status, setStatus] = useState("todos");
  const buscaAdiada = useDeferredValue(busca);

  // Estados Fomento Cultural (Aldir Blanc 2 / Paulo Gustavo / PNAB)
  const [edital, setEdital] = useState("EDITAL-01/2026 - PNAB (Política Nacional Aldir Blanc)");
  const [tituloProjeto, setTituloProjeto] = useState("");
  const [proponenteNome, setProponenteNome] = useState("");
  const [proponenteCpf, setProponenteCpf] = useState("");
  const [categoriaCultural, setCategoriaCultural] = useState("Audiovisual");
  const [valorSolicitado, setValorSolicitado] = useState<number>(25000.0);
  const [loadingFomento, setLoadingFomento] = useState(false);
  const [fomentoResult, setFomentoResult] = useState<any | null>(null);

  async function handleSubmitCulturalProject(e: React.FormEvent) {
    e.preventDefault();
    setLoadingFomento(true);
    setFomentoResult(null);

    const res = await submitCulturalProjectAction({
      codigoEdital: edital.split(" ")[0],
      nomeEdital: edital,
      tituloProjeto,
      proponenteNome,
      proponenteCpfCnpj: proponenteCpf,
      categoriaCultural,
      valorSolicitado,
    });

    setLoadingFomento(false);

    if (res.data) {
      setFomentoResult(res.data);
    } else {
      alert(res.error || "Erro ao cadastrar projeto.");
    }
  }

  async function handleAccountability() {
    if (!fomentoResult) return;
    setLoadingFomento(true);

    const res = await submitAccountabilityAction(fomentoResult.id, "NF-88239");
    setLoadingFomento(false);

    if (res.data) {
      alert(`Prestação de contas homologada com sucesso! Recibo: ${res.data.recibo}`);
      setFomentoResult({ ...fomentoResult, prestacaoContasStatus: "HOMOLOGADA", status: "CONCLUIDO" });
    }
  }

  const categorias = Array.from(new Set(projetos.map((projeto) => projeto.categoria))).sort((a, b) => a.localeCompare(b));
  const statusDisponiveis = Array.from(new Set(projetos.map((projeto) => projeto.status))).sort((a, b) => a.localeCompare(b));
  const termoBusca = buscaAdiada.trim().toLocaleLowerCase("pt-BR");
  const projetosFiltrados = projetos.filter((projeto) => {
    const correspondeBusca = !termoBusca || [
      projeto.numero,
      projeto.nome,
      projeto.descricao ?? "",
      projeto.categoria,
      projeto.status,
      projeto.agente.nome,
      projeto.agente.pessoaNome ?? "",
      projeto.agente.empresaNome ?? "",
    ].some((valor) => valor.toLocaleLowerCase("pt-BR").includes(termoBusca));

    return correspondeBusca
      && (categoria === "todas" || projeto.categoria === categoria)
      && (status === "todos" || projeto.status === status);
  });

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-100 p-2.5 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
            <FolderKanban className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Fomento e Projetos</h1>
            <p className="text-slate-500 dark:text-slate-400">Acompanhamento dos projetos culturais e de seus vínculos orçamentários e de contratação.</p>
          </div>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="grid gap-3 border-b border-slate-100 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/50 md:grid-cols-[minmax(0,1fr)_12rem_12rem] md:p-6">
          <label className="relative block">
            <span className="sr-only">Buscar projetos</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Buscar projeto, número ou proponente..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
          </label>
          <select
            aria-label="Filtrar por categoria"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
          >
            <option value="todas">Todas as categorias</option>
            {categorias.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select
            aria-label="Filtrar por status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
          >
            <option value="todos">Todos os status</option>
            {statusDisponiveis.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <p className="border-b border-slate-100 px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400 md:px-6">
          {projetosFiltrados.length} {projetosFiltrados.length === 1 ? "projeto encontrado" : "projetos encontrados"}
        </p>

        {projetosFiltrados.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FolderKanban className="mx-auto mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="font-medium text-slate-800 dark:text-slate-200">Nenhum projeto encontrado</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ajuste os filtros ou a busca para consultar outros registros.</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-slate-100 dark:divide-slate-700 lg:hidden">
              {projetosFiltrados.map((projeto) => (
                <article key={projeto.id} className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{projeto.nome}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{projeto.numero} · Cadastro em {dateFormatter.format(new Date(projeto.createdAt))}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">{projeto.status}</span>
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    <p className="inline-flex items-center gap-1.5 font-medium"><UserRound className="h-4 w-4 text-slate-400" />{nomeProponente(projeto)}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{projeto.agente.tipo} · {projeto.agente.segmento}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{projeto.categoria}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{projeto.valorSolicitado === null ? "Valor não informado" : currencyFormatter.format(projeto.valorSolicitado)}</span>
                  </div>
                  <VinculosProjeto projeto={projeto} />
                  <p className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"><FileText className="h-4 w-4" />{projeto.documentCount} {projeto.documentCount === 1 ? "documento" : "documentos"}</p>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[960px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Projeto e proponente</th>
                    <th className="px-6 py-4 font-medium">Categoria e status</th>
                    <th className="px-6 py-4 font-medium">Valor e documentos</th>
                    <th className="px-6 py-4 font-medium">Vínculos financeiros e de compras</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {projetosFiltrados.map((projeto) => (
                    <tr key={projeto.id} className="align-top transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900 dark:text-white">{projeto.nome}</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{projeto.numero} · Cadastro em {dateFormatter.format(new Date(projeto.createdAt))}</p>
                        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300"><UserRound className="h-4 w-4 text-slate-400" />{nomeProponente(projeto)}</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{projeto.agente.tipo} · {projeto.agente.segmento}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-700 dark:text-slate-300">{projeto.categoria}</p>
                        <span className="mt-2 inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">{projeto.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900 dark:text-white">{projeto.valorSolicitado === null ? "Valor não informado" : currencyFormatter.format(projeto.valorSolicitado)}</p>
                        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"><FileText className="h-4 w-4" />{projeto.documentCount} {projeto.documentCount === 1 ? "documento" : "documentos"}</p>
                      </td>
                      <td className="px-6 py-4"><VinculosProjeto projeto={projeto} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
