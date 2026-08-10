"use client";

import { useState } from "react";
import { 
  ShieldCheck, Plus, Search, X, Pencil, CheckCircle2, SlidersHorizontal, 
  Building2, Users, FileText, HeadphonesIcon, ShoppingCart, FileSpreadsheet, DollarSign, 
  Package, Receipt, Stethoscope, GraduationCap, HeartHandshake, HardHat, 
  Trees, Shield, Droplets, Landmark, Palette, Share2, Settings, Lock, CheckSquare, Square
} from "lucide-react";
import { upsertPerfil, togglePerfilStatus } from "./actions";

type Perfil = {
  id: string;
  nome: string;
  descricao: string | null;
  permissoes: string | null;
  ativo: boolean;
  legacyModuleCodes: string[];
};

// Modules that can appear on the dashboard or have their own access boundary.
const MODULES_LIST = [
  { code: "ADMINISTRACAO", label: "Administração Geral & Entidades", icon: Building2, color: "text-blue-500" },
  { code: "RH", label: "Recursos Humanos & Servidores", icon: Users, color: "text-indigo-500" },
  { code: "CADASTROS", label: "Pessoas & Cadastros Gerais", icon: FileText, color: "text-purple-500" },
  { code: "DOCUMENTOS", label: "Documentos, GED & Emissões", icon: FileText, color: "text-amber-500" },
  { code: "ATENDIMENTO", label: "Atendimento, Ouvidoria & Chamados", icon: HeadphonesIcon, color: "text-orange-500" },
  { code: "COMPRAS", label: "Compras, Licitações & Cotações", icon: ShoppingCart, color: "text-emerald-500" },
  { code: "CONTRATOS", label: "Gestão de Contratos Públicos", icon: FileSpreadsheet, color: "text-teal-500" },
  { code: "FINANCEIRO", label: "Financeiro, Orçamento & Tesouraria", icon: DollarSign, color: "text-green-500" },
  { code: "PATRIMONIO", label: "Patrimônio, Almoxarifado & Estoque", icon: Package, color: "text-amber-500" },
  { code: "TRIBUTACAO", label: "Tributação, Arrecadação & IPTU", icon: Receipt, color: "text-orange-500" },
  { code: "PROCESSOS", label: "Processos Administrativos & Protocolos", icon: Share2, color: "text-cyan-500" },
  { code: "SAUDE", label: "Saúde Pública & UBSs", icon: Stethoscope, color: "text-rose-500" },
  { code: "EDUCACAO", label: "Educação Pública & Escolas", icon: GraduationCap, color: "text-yellow-500" },
  { code: "SOCIAL", label: "Assistência Social & CRAS", icon: HeartHandshake, color: "text-pink-500" },
  { code: "OBRAS", label: "Obras Públicas & Vistorias", icon: HardHat, color: "text-lime-500" },
  { code: "MEIO_AMBIENTE", label: "Meio Ambiente & Licenciamento", icon: Trees, color: "text-emerald-600" },
  { code: "SEGURANCA", label: "Segurança Pública & Guarda Municipal", icon: Shield, color: "text-slate-500" },
  { code: "SANEAMENTO", label: "Saneamento, Água & Esgoto", icon: Droplets, color: "text-blue-600" },
  { code: "CAMARA", label: "Câmara Municipal & Legislação", icon: Landmark, color: "text-violet-500" },
  { code: "CULTURA", label: "Cultura, Esporte & Turismo", icon: Palette, color: "text-fuchsia-500" },
  { code: "TRANSPARENCIA", label: "Portal da Transparência & LAI", icon: Share2, color: "text-sky-500" },
  { code: "CONFIGURACOES", label: "Configurações do Sistema & Integrações", icon: Settings, color: "text-slate-600" },
];

type ModulePermission = {
  showDashboardCard: boolean;
  blocked: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  issueReports: boolean;
};

type PermissionKey = keyof Omit<ModulePermission, "blocked">;
const ACTIONS_LABELS: { key: Exclude<PermissionKey, "showDashboardCard">; label: string }[] = [
  { key: "create", label: "Criar" },
  { key: "update", label: "Editar" },
  { key: "delete", label: "Excluir" },
];

const emptyPermission = (): ModulePermission => ({
  showDashboardCard: false,
  blocked: true,
  create: false,
  update: false,
  delete: false,
  issueReports: false,
});

export default function PerfisClient({ perfis }: { perfis: Perfil[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"dados" | "matriz">("matriz");

  const [formData, setFormData] = useState<{
    id?: string;
    nome: string;
    descricao: string;
    ativo: boolean;
    accessLevel: "operacional" | "total";
    permissionsMap: Record<string, ModulePermission>;
  }>({
    nome: "",
    descricao: "",
    ativo: true,
    accessLevel: "operacional",
    permissionsMap: {},
  });

  const filtered = perfis.filter((p) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.descricao && p.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  function parsePermissionsJSON(jsonStr: string | null, legacyModuleCodes: string[] = []): { accessLevel: "operacional" | "total"; map: Record<string, ModulePermission> } {
    const map = Object.fromEntries(MODULES_LIST.map((moduleItem) => [moduleItem.code, emptyPermission()])) as Record<string, ModulePermission>;
    if (!jsonStr) return { accessLevel: "operacional", map };
    try {
      const parsed = JSON.parse(jsonStr) as Record<string, unknown>;
      if (parsed.ALL) {
        MODULES_LIST.forEach((m) => {
          map[m.code] = { showDashboardCard: true, blocked: false, create: true, update: true, delete: true, issueReports: false };
        });
        return { accessLevel: "total", map };
      }
      if (parsed.acesso === "total" && !parsed.modules) {
        MODULES_LIST.forEach((moduleItem) => {
          map[moduleItem.code] = { showDashboardCard: true, blocked: false, create: true, update: true, delete: true, issueReports: false };
        });
        return { accessLevel: "total", map };
      }
      const modules = parsed.modules;
      if (modules && typeof modules === "object" && !Array.isArray(modules)) {
        for (const moduleItem of MODULES_LIST) {
          const raw = (modules as Record<string, unknown>)[moduleItem.code];
          if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
          const permission = raw as Partial<ModulePermission>;
          const blocked = permission.blocked === true;
          map[moduleItem.code] = {
            showDashboardCard: permission.showDashboardCard === true,
            blocked,
            create: !blocked && permission.create === true,
            update: !blocked && permission.update === true,
            delete: !blocked && permission.delete === true,
            issueReports: !blocked && moduleItem.code === "FINANCEIRO" && permission.issueReports === true,
          };
        }
        return { accessLevel: parsed.acesso === "total" ? "total" : "operacional", map };
      }
      const blockedModules = Array.isArray(parsed.modulosBloqueados) ? parsed.modulosBloqueados : [];
      const allowedModules = Array.isArray(parsed.modulosPermitidos) ? parsed.modulosPermitidos : null;
      for (const moduleItem of MODULES_LIST) {
        const legacyActions = Array.isArray(parsed[moduleItem.code]) ? parsed[moduleItem.code] as string[] : [];
        const blocked = blockedModules.includes(moduleItem.code);
        const allowed = allowedModules
          ? allowedModules.includes(moduleItem.code)
          : legacyActions.length > 0 || legacyModuleCodes.includes(moduleItem.code);
        map[moduleItem.code] = {
          showDashboardCard: !blocked && allowed,
          blocked,
          create: !blocked && legacyActions.includes("create"),
          update: !blocked && legacyActions.includes("update"),
          delete: !blocked && legacyActions.includes("delete"),
          issueReports: false,
        };
      }
      return { accessLevel: parsed.acesso === "total" ? "total" : "operacional", map };
    } catch {
      return { accessLevel: "operacional", map };
    }
  }

  function serializePermissionsJSON(accessLevel: "operacional" | "total", map: Record<string, ModulePermission>): string {
    return JSON.stringify({
      acesso: accessLevel,
      modules: map,
      modulosBloqueados: MODULES_LIST.filter((moduleItem) => map[moduleItem.code]?.blocked).map((moduleItem) => moduleItem.code),
    });
  }

  function openNew() {
    const defaultMap: Record<string, ModulePermission> = {};
    MODULES_LIST.forEach((m) => {
      defaultMap[m.code] = emptyPermission();
    });
    setFormData({ nome: "", descricao: "", ativo: true, accessLevel: "operacional", permissionsMap: defaultMap });
    setActiveTab("matriz");
    setIsModalOpen(true);
  }

  function openEdit(p: Perfil) {
    const parsed = parsePermissionsJSON(p.permissoes, p.legacyModuleCodes);
    setFormData({ id: p.id, nome: p.nome, descricao: p.descricao ?? "", ativo: p.ativo, accessLevel: parsed.accessLevel, permissionsMap: parsed.map });
    setActiveTab("matriz");
    setIsModalOpen(true);
  }

  const toggleAction = (moduleCode: string, action: PermissionKey) => {
    setFormData((prev) => {
      const current = prev.permissionsMap[moduleCode] || emptyPermission();
      return {
        ...prev,
        permissionsMap: { ...prev.permissionsMap, [moduleCode]: { ...current, [action]: !current[action] } },
      };
    });
  };

  const toggleBlocked = (moduleCode: string) => {
    setFormData((prev) => {
      const current = prev.permissionsMap[moduleCode] || emptyPermission();
      const blocked = !current.blocked;
      return {
        ...prev,
        permissionsMap: {
          ...prev.permissionsMap,
          [moduleCode]: blocked ? { ...current, blocked, create: false, update: false, delete: false } : { ...current, blocked },
        },
      };
    });
  };

  const toggleAllModuleActions = (moduleCode: string) => {
    setFormData((prev) => {
      const current = prev.permissionsMap[moduleCode] || emptyPermission();
      const allSelected = !current.blocked && current.showDashboardCard && current.create && current.update && current.delete;
      const updated = allSelected
        ? emptyPermission()
        : { showDashboardCard: true, blocked: false, create: true, update: true, delete: true, issueReports: false };
      return {
        ...prev,
        permissionsMap: { ...prev.permissionsMap, [moduleCode]: updated },
      };
    });
  };

  const applyPreset = (preset: "FULL" | "READ_ONLY" | "CLEAR") => {
    const newMap: Record<string, ModulePermission> = {};
    MODULES_LIST.forEach((m) => {
      if (preset === "FULL") {
        newMap[m.code] = { showDashboardCard: true, blocked: false, create: true, update: true, delete: true, issueReports: false };
      } else if (preset === "READ_ONLY") {
        newMap[m.code] = { showDashboardCard: true, blocked: false, create: false, update: false, delete: false, issueReports: false };
      } else {
        newMap[m.code] = emptyPermission();
      }
    });
    setFormData((prev) => ({ ...prev, permissionsMap: newMap }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    const jsonPerms = serializePermissionsJSON(formData.accessLevel, formData.permissionsMap);
    const result = await upsertPerfil({
      id: formData.id,
      nome: formData.nome,
      descricao: formData.descricao,
      ativo: formData.ativo,
      permissoes: jsonPerms,
    });
    if (result.error) {
      alert(result.error);
    } else {
      setIsModalOpen(false);
    }
    setIsSubmitting(false);
  }

  async function handleToggle(id: string, ativo: boolean) {
    await togglePerfilStatus(id, !ativo);
  }

  return (
    <div className="flex-1 p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-xl border border-indigo-500/20">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gestão de Perfis & Permissões</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
                {perfis.length} Perfis Cadastrados
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Defina os níveis de acesso e matriz de permissões granulares por módulo para os usuários do sistema.
            </p>
          </div>
        </div>
        <button
          onClick={openNew}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-md transition-all whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          Criar Novo Perfil
        </button>
      </div>

      {/* Search and Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar perfil..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Nome do Perfil</th>
                <th className="px-6 py-4 font-semibold">Descrição</th>
                <th className="px-6 py-4 font-semibold">Cobertura de Módulos</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Nenhum perfil encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map((perfil) => {
                  const permMap = parsePermissionsJSON(perfil.permissoes, perfil.legacyModuleCodes).map;
                  const activeModulesCount = MODULES_LIST.filter((moduleItem) => {
                    const permission = permMap[moduleItem.code];
                    return permission && !permission.blocked;
                  }).length;

                  return (
                    <tr key={perfil.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Lock className="w-4 h-4 text-indigo-500 shrink-0" />
                        {perfil.nome}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                        {perfil.descricao || "Perfil de acesso padrão do sistema municipal."}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
                           {activeModulesCount === MODULES_LIST.length ? `Todos os ${MODULES_LIST.length} Módulos` : `${activeModulesCount} de ${MODULES_LIST.length} Módulos`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggle(perfil.id, perfil.ativo)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            perfil.ativo
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                          }`}
                        >
                          {perfil.ativo ? "Ativo" : "Inativo"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => openEdit(perfil)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900 text-xs font-bold transition-colors"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Configurar Permissões
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Config Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-lg">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {formData.id ? `Configurar Perfil: ${formData.nome}` : "Novo Perfil de Acesso"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Defina as permissões granulares por módulo para os usuários vinculados.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Tabs Header & Quick Presets */}
            <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("matriz")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "matriz"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  🛡️ Matriz de Permissões ({MODULES_LIST.length} Módulos)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("dados")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "dados"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  📝 Dados do Perfil
                </button>
              </div>

              {activeTab === "matriz" && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold mr-1">Presets Rápidos:</span>
                  <button
                    type="button"
                    onClick={() => applyPreset("FULL")}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:opacity-90"
                  >
                    ⚡ Acesso Total
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset("READ_ONLY")}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-800 hover:opacity-90"
                  >
                    Sem ações operacionais
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset("CLEAR")}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:opacity-90"
                  >
                    🧹 Limpar Tudo
                  </button>
                </div>
              )}
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === "dados" && (
                <div className="space-y-4 max-w-xl mx-auto py-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nome do Perfil *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="Ex: Fiscal de Obras / Gestor de Compras"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Descrição & Responsabilidades
                    </label>
                    <textarea
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      rows={3}
                      className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                      placeholder="Descreva as atribuições deste perfil no sistema público..."
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="ativo-check"
                      checked={formData.ativo}
                      onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="ativo-check" className="text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                      Perfil Habilitado no Sistema
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "matriz" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {MODULES_LIST.map((moduleItem) => {
                      const IconComponent = moduleItem.icon;
                       const permission = formData.permissionsMap[moduleItem.code] || emptyPermission();
                       const isAllSelected = !permission.blocked && permission.showDashboardCard && permission.create && permission.update && permission.delete;

                      return (
                        <div
                          key={moduleItem.code}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-indigo-500/30 transition-all space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${moduleItem.color}`}>
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="font-bold text-sm text-slate-900 dark:text-white">{moduleItem.label}</span>
                                <span className="text-[11px] block text-slate-400 font-mono">Código: {moduleItem.code}</span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleAllModuleActions(moduleItem.code)}
                              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                            >
                              {isAllSelected ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                              {isAllSelected ? "Desmarcar Módulo" : "Marcar Todas"}
                            </button>
                          </div>

                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                             <label className="flex items-center gap-2 p-2 rounded-lg border text-xs font-medium cursor-pointer bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                               <input type="checkbox" checked={permission.showDashboardCard} onChange={() => toggleAction(moduleItem.code, "showDashboardCard")} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" />
                               <span>Exibir card no dashboard</span>
                             </label>
                             <label className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium cursor-pointer ${permission.blocked ? "bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900 text-rose-800 dark:text-rose-200" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"}`}>
                               <input type="checkbox" checked={permission.blocked} onChange={() => toggleBlocked(moduleItem.code)} className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 w-3.5 h-3.5" />
                               <span>Bloquear acesso ao módulo</span>
                             </label>
                           </div>
                            {!permission.blocked ? (
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                             {ACTIONS_LABELS.map((act) => {
                               const isChecked = permission[act.key];
                              return (
                                <label
                                  key={act.key}
                                  className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                                    isChecked
                                      ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200"
                                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleAction(moduleItem.code, act.key)}
                                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                                  />
                                  <span>{act.label}</span>
                                </label>
                             );
                              })}
                              {moduleItem.code === "FINANCEIRO" && (
                                <label className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                                  permission.issueReports
                                    ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200"
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}>
                                  <input
                                    type="checkbox"
                                    checked={permission.issueReports}
                                    onChange={() => toggleAction(moduleItem.code, "issueReports")}
                                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                                  />
                                  <span>Emitir relatórios internos consolidados</span>
                                </label>
                              )}
                            </div>
                           ) : (
                             <p className="text-xs text-rose-700 dark:text-rose-300">Módulo bloqueado: as permissões operacionais ficam indisponíveis até o desbloqueio.</p>
                           )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </form>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                As permissões definidas neste perfil serão aplicadas a todos os usuários vinculados.
              </span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center gap-2 shadow-md"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  Salvar Matriz de Permissões
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
