import React from "react";
import { Leaf, Building2, FileText, AlertTriangle, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function MeioAmbienteDashboardPage() {
  const [
    totalEnterprises,
    totalLicenses,
    totalComplaints,
    totalInspections
  ] = await Promise.all([
    prisma.envEnterprise.count(),
    prisma.envLicense.count(),
    prisma.envComplaint.count(),
    prisma.envInspection.count(),
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Leaf className="h-8 w-8 text-green-600" />
          Meio Ambiente
        </h1>
        <p className="text-gray-500 mt-2">
          Gestão ambiental municipal: licenciamento, fiscalização e denúncias.
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
            <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Empreendimentos</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalEnterprises}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Licenças Emitidas</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalLicenses}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Denúncias</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalComplaints}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
            <Search className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Vistorias</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalInspections}</p>
          </div>
        </div>
      </div>

      {/* Acessos Rápidos */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Acesso Rápido</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/app-domain/meio-ambiente/empreendimentos" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <Building2 className="h-8 w-8 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Empreendimentos</h3>
            <p className="text-sm text-gray-500">Cadastro de empresas, imóveis e atividades sujeitas a controle ambiental.</p>
          </div>
        </Link>

        <Link href="/app-domain/meio-ambiente/licenciamento" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <ShieldCheck className="h-8 w-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Licenciamento</h3>
            <p className="text-sm text-gray-500">Gestão de licenças (LP, LI, LO), autorizações e certidões.</p>
          </div>
        </Link>

        <Link href="/app-domain/meio-ambiente/solicitacoes" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <FileText className="h-8 w-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Solicitações e Podas</h3>
            <p className="text-sm text-gray-500">Pedidos de poda, supressão vegetal e serviços ambientais gerais.</p>
          </div>
        </Link>

        <Link href="/app-domain/meio-ambiente/denuncias" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <AlertTriangle className="h-8 w-8 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Denúncias Ambientais</h3>
            <p className="text-sm text-gray-500">Registro e acompanhamento de irregularidades (descarte, queimada, etc).</p>
          </div>
        </Link>

        <Link href="/app-domain/meio-ambiente/fiscalizacao" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <Search className="h-8 w-8 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Fiscalização e Vistorias</h3>
            <p className="text-sm text-gray-500">Agendamento de vistorias, notificações, autos de infração e multas.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
