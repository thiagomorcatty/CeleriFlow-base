import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Files, 
  HeadphonesIcon, 
  FileText, 
  ShoppingCart, 
  Eye, 
  BarChart3, 
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
  Gavel
} from "lucide-react";

const menuItems = [
  { name: "Administração Geral", description: "Gestão interna e controle", href: "/administracao", icon: Building2, color: "text-[#2563EB]", bg: "bg-[#DBEAFE]", solid: "bg-[#2563EB]" },
  { name: "Cadastros Gerais", description: "Pessoas, empresas e locais", href: "/cadastros", icon: Database, color: "text-[#64748B]", bg: "bg-[#E2E8F0]", solid: "bg-[#64748B]" },
  { name: "Protocolo e Processos", description: "Gestão de trâmites", href: "/processos", icon: Files, color: "text-[#0EA5E9]", bg: "bg-[#E0F2FE]", solid: "bg-[#0EA5E9]" },
  { name: "Documentos e GED", description: "Arquivos e emissões", href: "/documentos", icon: FileText, color: "text-[#F59E0B]", bg: "bg-[#FEF3C7]", solid: "bg-[#F59E0B]" },
  { name: "Atendimento / Ouvidoria", description: "Ouvidoria e chamados", href: "/atendimento", icon: HeadphonesIcon, color: "text-[#F97316]", bg: "bg-[#FFEDD5]", solid: "bg-[#F97316]" },
  { name: "Portal e Transparência", description: "Acesso à informação", href: "/transparencia", icon: Eye, color: "text-[#06B6D4]", bg: "bg-[#CFFAFE]", solid: "bg-[#06B6D4]" },
  { name: "Tributário", description: "Impostos e taxas", href: "/tributario", icon: Landmark, color: "text-[#059669]", bg: "bg-[#D1FAE5]", solid: "bg-[#059669]" },
  { name: "Financeiro e Contábil", description: "Orçamento e caixa", href: "/financeiro", icon: CircleDollarSign, color: "text-[#16A34A]", bg: "bg-[#DCFCE7]", solid: "bg-[#16A34A]" },
  { name: "Compras e Contratos", description: "Gestão de compras", href: "/compras", icon: ShoppingCart, color: "text-[#9333EA]", bg: "bg-[#F3E8FF]", solid: "bg-[#9333EA]" },
  { name: "RH e Folha", description: "Servidores e folha", href: "/rh", icon: Users, color: "text-[#EC4899]", bg: "bg-[#FCE7F3]", solid: "bg-[#EC4899]" },
  { name: "Patrimônio", description: "Controle de bens", href: "/patrimonio", icon: Package, color: "text-[#D97706]", bg: "bg-[#FEF3C7]", solid: "bg-[#D97706]" },
  { name: "Educação", description: "Escolas e alunos", href: "/educacao", icon: GraduationCap, color: "text-[#6366F1]", bg: "bg-[#E0E7FF]", solid: "bg-[#6366F1]" },
  { name: "Saúde", description: "SUS, postos e pacientes", href: "/saude", icon: HeartPulse, color: "text-[#EF4444]", bg: "bg-[#FEE2E2]", solid: "bg-[#EF4444]" },
  { name: "Assistência Social", description: "Benefícios e CRAS", href: "/social", icon: Handshake, color: "text-[#DB2777]", bg: "bg-[#FCE7F3]", solid: "bg-[#DB2777]" },
  { name: "Meio Ambiente", description: "Licenças e fiscalização", href: "/meio-ambiente", icon: Leaf, color: "text-[#65A30D]", bg: "bg-[#ECFCCB]", solid: "bg-[#65A30D]" },
  { name: "Saneamento", description: "Água e esgoto", href: "/saneamento", icon: Droplets, color: "text-[#0284C7]", bg: "bg-[#E0F2FE]", solid: "bg-[#0284C7]" },
  { name: "Câmara Municipal", description: "Câmara e processos", href: "/legislativo", icon: Gavel, color: "text-[#525252]", bg: "bg-[#F5F5F5]", solid: "bg-[#525252]" },
  { name: "Configurações", description: "Gestão do sistema", href: "/configuracoes", icon: Settings, color: "text-[#475569]", bg: "bg-[#E2E8F0]", solid: "bg-[#475569]" },
];

export default function PainelPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto pt-2 pb-4 px-2 md:px-4 flex flex-col">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="block group outline-none">
            <div className="relative overflow-hidden h-full bg-white dark:bg-slate-950 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.04)] rounded-[18px] transition-all duration-200 hover:shadow-[0_12px_24px_rgba(15,23,42,0.1)] hover:-translate-y-1 hover:border-slate-300 active:scale-[0.98] active:shadow-sm active:translate-y-0 flex flex-col justify-center text-center py-6 px-3 cursor-pointer">
              
              {/* Colored Top Bar */}
              <div className={`absolute top-0 left-0 w-full h-[4px] ${item.solid} opacity-85`} />
              
              <div className="flex flex-col items-center gap-3">
                <div className={`w-[52px] h-[52px] rounded-[16px] flex items-center justify-center ${item.bg} shadow-inner ring-1 ring-inset ring-black/5 transition-transform duration-200 group-hover:scale-110`}>
                  <item.icon className={`h-[22px] w-[22px] ${item.color}`} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[13px] sm:text-[14px] font-bold leading-tight text-slate-800 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] font-medium text-slate-500 leading-tight line-clamp-2 mt-1.5 px-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
