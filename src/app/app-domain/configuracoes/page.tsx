import React from "react";
import { Settings, Building2, Blocks, KeyRound, ArrowRight, ShieldCheck, UserCog, SlidersHorizontal, Cable, ClipboardList } from "lucide-react";
import Link from "next/link";
import { getTenantContextForModule, isSystemAdministrator } from "@/lib/platform/tenant-context";

export default async function ConfiguracoesDashboard() {
  const { prisma, user } = await getTenantContextForModule("CONFIGURACOES");
  const [instancias, totalModulosAtivos, totalPerfis] = await Promise.all([
    prisma.configuracaoInstancia.count(),
    prisma.configuracaoModulo.count({ where: { ativo: true } }),
    prisma.configuracaoPerfil.count()
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="h-8 w-8 text-gray-700 dark:text-gray-300" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações e Integrações</h1>
          <p className="text-gray-500 dark:text-gray-400">Painel administrativo, módulos, usuários e segurança</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Instância Ativa</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{instancias > 0 ? "Sim" : "Não"}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
              <Blocks className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Módulos Ativos</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalModulosAtivos}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
              <KeyRound className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Perfis de Acesso</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalPerfis}</h2>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Acesso Rápido</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/configuracoes/instancia" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Building2 className="h-6 w-6 text-gray-700 dark:text-gray-300 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors flex items-center justify-between">
              Instância da Prefeitura
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Dados oficiais, identidade visual e parâmetros gerais</p>
          </div>
        </Link>

        <Link href="/configuracoes/modulos" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Blocks className="h-6 w-6 text-zinc-700 dark:text-zinc-300 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors flex items-center justify-between">
              Módulos Contratados
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Gerenciamento de módulos e integrações do CeleriFlow</p>
          </div>
        </Link>

        <Link href="/configuracoes/perfis" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <ShieldCheck className="h-6 w-6 text-slate-700 dark:text-slate-300 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors flex items-center justify-between">
              Perfis e Permissões
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Controle de acesso e níveis de segurança</p>
          </div>
        </Link>

        <Link href="/configuracoes/usuarios" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <UserCog className="h-6 w-6 text-gray-700 dark:text-gray-300 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors flex items-center justify-between">
              Usuários
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Gestão de acessos por secretaria e setor</p>
          </div>
        </Link>
        <Link href="/configuracoes/processos" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <SlidersHorizontal className="h-6 w-6 text-indigo-700 dark:text-indigo-300 mb-2" />
          <div><h4 className="font-medium text-gray-900 dark:text-white flex items-center justify-between">Tipos e Assuntos<ArrowRight className="h-4 w-4" /></h4><p className="text-xs text-gray-500 mt-1">Parâmetros operacionais de Protocolos</p></div>
        </Link>
        <Link href="/configuracoes/integracoes" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Cable className="h-6 w-6 text-emerald-700 dark:text-emerald-300 mb-2" />
          <div><h4 className="font-medium text-gray-900 dark:text-white flex items-center justify-between">Conexões e Integrações<ArrowRight className="h-4 w-4" /></h4><p className="text-xs text-gray-500 mt-1">Ambientes mock, homologação e produção</p></div>
        </Link>
        {isSystemAdministrator(user) && (
          <Link href="/configuracoes/auditoria" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
            <ClipboardList className="h-6 w-6 text-amber-700 dark:text-amber-300 mb-2" />
            <div><h4 className="font-medium text-gray-900 dark:text-white flex items-center justify-between">Auditoria de Uso<ArrowRight className="h-4 w-4" /></h4><p className="text-xs text-gray-500 mt-1">Interações, navegações e acessos dos usuários</p></div>
          </Link>
        )}
      </div>
    </div>
  );
}
