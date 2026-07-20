import React from "react";
import { 
  Leaf, 
  Building2, 
  FileText, 
  AlertTriangle, 
  Search, 
  ShieldCheck, 
  Sprout, 
  Trash2, 
  GraduationCap, 
  FolderOpen 
} from "lucide-react";
import Link from "next/link";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export const dynamic = "force-dynamic";

export default async function MeioAmbienteDashboardPage() {
  const { prisma } = await getTenantContextForModule("MEIO_AMBIENTE");
  const [
    totalEnterprises,
    totalLicenses,
    totalComplaints,
    totalInspections,
    totalGreenAreas,
    totalWastes,
    totalEduPrograms
  ] = await Promise.all([
    prisma.envEnterprise.count(),
    prisma.envLicense.count(),
    prisma.envComplaint.count(),
    prisma.envInspection.count(),
    prisma.envGreenArea.count(),
    prisma.envWaste.count(),
    prisma.envEduProgram.count()
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Leaf className="h-8 w-8 text-green-600 animate-pulse" />
          Painel do Meio Ambiente
        </h1>
        <p className="text-gray-500 mt-2">
          Gestão ambiental municipal: licenciamento, fiscalização, denúncias e sustentabilidade.
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3.5 bg-green-50 dark:bg-green-950/30 rounded-xl">
            <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Empreendimentos</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-0.5">{totalEnterprises}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3.5 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
            <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Licenças Ativas</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-0.5">{totalLicenses}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3.5 bg-red-50 dark:bg-red-950/30 rounded-xl">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Denúncias</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-0.5">{totalComplaints}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
            <Sprout className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Áreas Preservadas</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-0.5">{totalGreenAreas}</p>
          </div>
        </div>
      </div>

      {/* Acessos Rápidos */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Módulos do Meio Ambiente</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/meio-ambiente/empreendimentos" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-900/50 transition-all h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">Empreendimentos</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Cadastro de indústrias, comércios e postos sujeitos a regulação ambiental.</p>
            </div>
            <span className="text-xs font-bold text-green-600 dark:text-green-400 mt-4 group-hover:underline inline-flex items-center gap-1">Acessar Empreendimentos &rarr;</span>
          </div>
        </Link>

        <Link href="/meio-ambiente/licenciamento" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-900/50 transition-all h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">Licenciamento</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Emissão e controle de licenças prévias (LP), instalação (LI), operação (LO) e condicionantes.</p>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-4 group-hover:underline inline-flex items-center gap-1">Gerenciar Licenças &rarr;</span>
          </div>
        </Link>

        <Link href="/meio-ambiente/solicitacoes" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-900/50 transition-all h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">Solicitações & Podas</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Pedidos de autorização de poda, supressão de árvores e plantios urbanos.</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-4 group-hover:underline inline-flex items-center gap-1">Ver Solicitações &rarr;</span>
          </div>
        </Link>

        <Link href="/meio-ambiente/denuncias" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-900/50 transition-all h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 transition-colors">Denúncias Ambientais</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Registro de queimadas, descarte irregular de entulho e poluição industrial.</p>
            </div>
            <span className="text-xs font-bold text-red-600 dark:text-red-400 mt-4 group-hover:underline inline-flex items-center gap-1">Ver Denúncias &rarr;</span>
          </div>
        </Link>

        <Link href="/meio-ambiente/fiscalizacao" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-900/50 transition-all h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">Fiscalização e Vistorias</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Emissão de notificações, autos de infração, agendamento de vistorias e multas.</p>
            </div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-4 group-hover:underline inline-flex items-center gap-1">Ver Fiscalização &rarr;</span>
          </div>
        </Link>

        <Link href="/meio-ambiente/areas-verdes" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-900/50 transition-all h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sprout className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 transition-colors">Áreas Verdes & Parques</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Controle de áreas protegidas, parques municipais, APPs e arborização urbana.</p>
            </div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-4 group-hover:underline inline-flex items-center gap-1">Ver Áreas Verdes &rarr;</span>
          </div>
        </Link>

        <Link href="/meio-ambiente/residuos" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-900/50 transition-all h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trash2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">Controle de Resíduos</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Gestão da geração de resíduos industriais e construtivos, com destinação final.</p>
            </div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-4 group-hover:underline inline-flex items-center gap-1">Ver Resíduos &rarr;</span>
          </div>
        </Link>

        <Link href="/meio-ambiente/educacao" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-900/50 transition-all h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 transition-colors">Educação Ambiental</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Planejamento e acompanhamento de programas, palestras e campanhas ecológicas.</p>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-4 group-hover:underline inline-flex items-center gap-1">Ver Campanhas &rarr;</span>
          </div>
        </Link>

        <Link href="/meio-ambiente/documentos" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-900/50 transition-all h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FolderOpen className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-slate-600 transition-colors">Documentos Oficiais</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Central de laudos, RIMAs, alvarás ambientais e termos de compromisso.</p>
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-4 group-hover:underline inline-flex items-center gap-1">Ver Documentos &rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
