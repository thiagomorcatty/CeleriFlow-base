import Link from "next/link";
import { 
  Files, 
  HeadphonesIcon, 
  FileText, 
  ShoppingCart, 
  Eye, 
  Building2, 
  Settings,
  Database,
  Landmark,
  CircleDollarSign,
  Users,
  Package,
  GraduationCap,
  HeartPulse,
  Handshake,
  Leaf,
  Droplets,
  HardHat,
  Palette,
  Shield,
  Lock
} from "lucide-react";
import { canShowDashboardCard, canUseInactiveModule, canViewModule, getOptionalTenantContext, isModuleBlockedForUser, isPocEvaluator } from "@/lib/platform/tenant-context";

export const dynamic = "force-dynamic";

type MenuItem = {
  code: string;
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  solid: string;
};

const menuItems: MenuItem[] = [
  { code: "ADMINISTRACAO", name: "Administração", description: "Gestão interna e controle", href: "/administracao", icon: Building2, color: "text-[#2563EB]", bg: "bg-[#DBEAFE]", solid: "bg-[#2563EB]" },
  { code: "CADASTROS", name: "Cadastros", description: "Pessoas, empresas e locais", href: "/cadastros", icon: Database, color: "text-[#64748B]", bg: "bg-[#E2E8F0]", solid: "bg-[#64748B]" },
  { code: "PROCESSOS", name: "Processos e Protocolo", description: "Gestão de trâmites", href: "/protocolos", icon: Files, color: "text-[#0EA5E9]", bg: "bg-[#E0F2FE]", solid: "bg-[#0EA5E9]" },
  { code: "DOCUMENTOS", name: "Documentos / GED", description: "Arquivos e emissões", href: "/documentos", icon: FileText, color: "text-[#F59E0B]", bg: "bg-[#FEF3C7]", solid: "bg-[#F59E0B]" },
  { code: "ATENDIMENTO", name: "Atendimento ao Cidadão", description: "Ouvidoria e chamados", href: "/atendimento", icon: HeadphonesIcon, color: "text-[#F97316]", bg: "bg-[#FFEDD5]", solid: "bg-[#F97316]" },
  { code: "TRANSPARENCIA", name: "Portal e Transparência", description: "Acesso à informação", href: "/transparencia", icon: Eye, color: "text-[#06B6D4]", bg: "bg-[#CFFAFE]", solid: "bg-[#06B6D4]" },
  { code: "TRIBUTACAO", name: "Tributário", description: "Impostos e taxas", href: "/tributacao", icon: Landmark, color: "text-[#059669]", bg: "bg-[#D1FAE5]", solid: "bg-[#059669]" },
  { code: "FINANCEIRO", name: "Financeiro e Contábil", description: "Orçamento e caixa", href: "/financeiro", icon: CircleDollarSign, color: "text-[#16A34A]", bg: "bg-[#DCFCE7]", solid: "bg-[#16A34A]" },
  { code: "COMPRAS", name: "Compras e Contratos", description: "Gestão de compras", href: "/compras", icon: ShoppingCart, color: "text-[#9333EA]", bg: "bg-[#F3E8FF]", solid: "bg-[#9333EA]" },
  { code: "RH", name: "RH e Folha", description: "Servidores e folha", href: "/rh", icon: Users, color: "text-[#EC4899]", bg: "bg-[#FCE7F3]", solid: "bg-[#EC4899]" },
  { code: "PATRIMONIO", name: "Patrimônio e Almoxarifado", description: "Controle de bens", href: "/patrimonio", icon: Package, color: "text-[#D97706]", bg: "bg-[#FEF3C7]", solid: "bg-[#D97706]" },
  { code: "EDUCACAO", name: "Educação", description: "Escolas e alunos", href: "/educacao", icon: GraduationCap, color: "text-[#6366F1]", bg: "bg-[#E0E7FF]", solid: "bg-[#6366F1]" },
  { code: "SAUDE", name: "Saúde", description: "SUS, postos e pacientes", href: "/saude", icon: HeartPulse, color: "text-[#EF4444]", bg: "bg-[#FEE2E2]", solid: "bg-[#EF4444]" },
  { code: "SOCIAL", name: "Assistência Social", description: "Benefícios e CRAS", href: "/social", icon: Handshake, color: "text-[#DB2777]", bg: "bg-[#FCE7F3]", solid: "bg-[#DB2777]" },
  { code: "MEIO_AMBIENTE", name: "Meio Ambiente", description: "Licenças e fiscalização", href: "/meio-ambiente", icon: Leaf, color: "text-[#65A30D]", bg: "bg-[#ECFCCB]", solid: "bg-[#65A30D]" },
  { code: "SANEAMENTO", name: "Água e Saneamento", description: "Água e esgoto", href: "/saneamento", icon: Droplets, color: "text-[#0284C7]", bg: "bg-[#E0F2FE]", solid: "bg-[#0284C7]" },
  { code: "OBRAS", name: "Obras e Serviços", description: "Infraestrutura e urbana", href: "/obras", icon: HardHat, color: "text-[#B45309]", bg: "bg-[#FEF3C7]", solid: "bg-[#B45309]" },
  { code: "CULTURA", name: "Cultura e Lazer", description: "Cultura e esporte", href: "/cultura", icon: Palette, color: "text-[#E11D48]", bg: "bg-[#FFE4E6]", solid: "bg-[#E11D48]" },
  { code: "CAMARA", name: "Câmara Municipal", description: "Gestão Legislativa", href: "/camara", icon: Landmark, color: "text-[#9333EA]", bg: "bg-[#F3E8FF]", solid: "bg-[#9333EA]" },
  { code: "SEGURANCA", name: "Segurança e Mobilidade", description: "Guarda e trânsito", href: "/seguranca", icon: Shield, color: "text-[#0F766E]", bg: "bg-[#CCFBF1]", solid: "bg-[#0F766E]" },
  { code: "CONFIGURACOES", name: "Configurações e Integrações", description: "Gestão do sistema", href: "/configuracoes", icon: Settings, color: "text-[#475569]", bg: "bg-[#E2E8F0]", solid: "bg-[#475569]" },
];

export default async function PainelPage() {
  const context = await getOptionalTenantContext();
  const moduleActivationByCode = new Map<string, boolean>();

  try {
    const modulos = await context?.prisma.configuracaoModulo.findMany({
      select: { codigo: true, ativo: true },
    }) ?? [];
    modulos.forEach((module) => moduleActivationByCode.set(module.codigo.toUpperCase(), module.ativo));
  } catch (err) {
    console.warn("Notice: Failed to fetch configuracaoModulo status", err);
  }

  const visibleMenuItems = menuItems.filter((item) => context && canShowDashboardCard(context.user, item.code));
  const hasFinancialAccess = context ? canViewModule(context.user, "FINANCEIRO") : false;
  const pocEvaluator = context ? isPocEvaluator(context.user) : false;

  return (
    <div className="w-full max-w-[1600px] mx-auto pt-2 pb-4 px-2 md:px-4 flex flex-col">
      <header className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">{pocEvaluator ? "POC São João do Ivaí" : "CeleriFlow"}</p>
          <h1 className="mt-1 text-xl font-bold text-slate-900">Home</h1>
          <p className="mt-1 text-sm text-slate-600">Acesse as funcionalidades disponíveis para o seu perfil.</p>
        </div>
        {hasFinancialAccess && (
          <nav className="flex items-center gap-2" aria-label="Navegação principal da POC">
            <Link href="/dashboard" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Home</Link>
            <Link href="/financeiro/automacoes" className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Automações</Link>
          </nav>
        )}
      </header>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 w-full">
        {visibleMenuItems.map((item) => {
          const isConfig = item.code === "CONFIGURACOES";
          const isProfileBlocked = !context || isModuleBlockedForUser(context.user, item.code) || !canViewModule(context.user, item.code);
          const isLocked = isProfileBlocked || (!isConfig && moduleActivationByCode.get(item.code) === false && !canUseInactiveModule(context.user));

          if (isLocked) {
            return (
              <div
                key={item.name}
                title={isProfileBlocked ? "Acesso bloqueado ou sem permissão de visualização neste perfil." : "Módulo não contratado nesta instância municipal. Ative em Configurações e Integrações > Módulos."}
                className="relative overflow-hidden h-full bg-slate-100/90 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 rounded-[16px] flex flex-col justify-center text-center py-4 px-2 cursor-not-allowed opacity-60 grayscale select-none"
              >
                {/* Top Gray Bar */}
                <div className="absolute top-0 left-0 w-full h-[4px] bg-slate-400/50" />

                {/* Lock Badge */}
                <div className="absolute top-2 right-2 p-1 bg-slate-200 dark:bg-slate-800 rounded-full text-slate-500 shadow-sm">
                  <Lock className="w-3.5 h-3.5" />
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center bg-slate-200 dark:bg-slate-800 ring-1 ring-inset ring-black/5">
                    <item.icon className="h-[20px] w-[20px] text-slate-500" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-[12px] sm:text-[13px] font-bold leading-tight text-slate-600 dark:text-slate-400">
                      {item.name}
                    </h3>
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                       {isProfileBlocked ? "Acesso Bloqueado" : "Não Contratado"}
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Link key={item.name} href={item.href} className="block group outline-none">
              <div className="relative overflow-hidden h-full bg-white dark:bg-slate-950 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.04)] rounded-[16px] transition-all duration-200 hover:shadow-[0_12px_24px_rgba(15,23,42,0.1)] hover:-translate-y-1 hover:border-slate-300 active:scale-[0.98] active:shadow-sm active:translate-y-0 flex flex-col justify-center text-center py-4 px-2 cursor-pointer">
                
                {/* Colored Top Bar */}
                <div className={`absolute top-0 left-0 w-full h-[4px] ${item.solid} opacity-85`} />
                
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-[44px] h-[44px] rounded-[14px] flex items-center justify-center ${item.bg} shadow-inner ring-1 ring-inset ring-black/5 transition-transform duration-200 group-hover:scale-110`}>
                    <item.icon className={`h-[20px] w-[20px] ${item.color}`} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-[12px] sm:text-[13px] font-bold leading-tight text-slate-800 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[10px] font-medium text-slate-500 leading-tight line-clamp-2 mt-1 px-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

