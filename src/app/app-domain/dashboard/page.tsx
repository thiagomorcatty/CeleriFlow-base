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
  { name: "Administração Geral", description: "Gestão interna e controle", href: "/administracao", icon: Building2, color: "text-slate-600", bg: "bg-slate-500/10", solid: "bg-slate-500" },
  { name: "Cadastros Gerais", description: "Pessoas, empresas e locais", href: "/cadastros", icon: Database, color: "text-zinc-600", bg: "bg-zinc-500/10", solid: "bg-zinc-500" },
  { name: "Protocolo e Processos", description: "Gestão de trâmites", href: "/processos", icon: Files, color: "text-blue-600", bg: "bg-blue-500/10", solid: "bg-blue-500" },
  { name: "Documentos e GED", description: "Arquivos e emissões", href: "/documentos", icon: FileText, color: "text-amber-600", bg: "bg-amber-500/10", solid: "bg-amber-500" },
  { name: "Atendimento", description: "Ouvidoria e chamados", href: "/atendimento", icon: HeadphonesIcon, color: "text-orange-600", bg: "bg-orange-500/10", solid: "bg-orange-500" },
  { name: "Transparência Pública", description: "Acesso à informação", href: "/transparencia", icon: Eye, color: "text-cyan-600", bg: "bg-cyan-500/10", solid: "bg-cyan-500" },
  { name: "Tributário", description: "Impostos e taxas", href: "/tributario", icon: Landmark, color: "text-emerald-600", bg: "bg-emerald-500/10", solid: "bg-emerald-500" },
  { name: "Financeiro e Contábil", description: "Orçamento e caixa", href: "/financeiro", icon: CircleDollarSign, color: "text-green-600", bg: "bg-green-500/10", solid: "bg-green-500" },
  { name: "Licitações e Contratos", description: "Gestão de compras", href: "/compras", icon: ShoppingCart, color: "text-purple-600", bg: "bg-purple-500/10", solid: "bg-purple-500" },
  { name: "Recursos Humanos", description: "Servidores e folha", href: "/rh", icon: Users, color: "text-rose-600", bg: "bg-rose-500/10", solid: "bg-rose-500" },
  { name: "Patrimônio e Almox.", description: "Controle de bens", href: "/patrimonio", icon: Package, color: "text-yellow-600", bg: "bg-yellow-500/10", solid: "bg-yellow-500" },
  { name: "Educação", description: "Escolas e alunos", href: "/educacao", icon: GraduationCap, color: "text-indigo-600", bg: "bg-indigo-500/10", solid: "bg-indigo-500" },
  { name: "Saúde", description: "SUS, postos e pacientes", href: "/saude", icon: HeartPulse, color: "text-red-600", bg: "bg-red-500/10", solid: "bg-red-500" },
  { name: "Assistência Social", description: "Benefícios e CRAS", href: "/social", icon: Handshake, color: "text-pink-600", bg: "bg-pink-500/10", solid: "bg-pink-500" },
  { name: "Meio Ambiente", description: "Licenças e fiscalização", href: "/meio-ambiente", icon: Leaf, color: "text-lime-600", bg: "bg-lime-500/10", solid: "bg-lime-500" },
  { name: "Saneamento", description: "Água e esgoto", href: "/saneamento", icon: Droplets, color: "text-sky-600", bg: "bg-sky-500/10", solid: "bg-sky-500" },
  { name: "Legislativo Municipal", description: "Câmara e processos", href: "/legislativo", icon: Gavel, color: "text-stone-600", bg: "bg-stone-500/10", solid: "bg-stone-500" },
  { name: "Configurações", description: "Gestão do sistema", href: "/configuracoes", icon: Settings, color: "text-slate-800", bg: "bg-slate-500/20", solid: "bg-slate-800" },
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
