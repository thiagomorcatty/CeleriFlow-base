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
  { name: "Administração", description: "Gestão interna e controle", href: "/administracao", icon: Building2, color: "text-slate-600", bg: "bg-slate-500/10" },
  { name: "Cadastros", description: "Pessoas, empresas e locais", href: "/cadastros", icon: Database, color: "text-zinc-600", bg: "bg-zinc-500/10" },
  { name: "Processos e Protocolo", description: "Gestão de trâmites", href: "/processos", icon: Files, color: "text-blue-600", bg: "bg-blue-500/10" },
  { name: "Documentos / GED", description: "Arquivos e emissões", href: "/documentos", icon: FileText, color: "text-amber-600", bg: "bg-amber-500/10" },
  { name: "Atendimento", description: "Ouvidoria e chamados", href: "/atendimento", icon: HeadphonesIcon, color: "text-orange-600", bg: "bg-orange-500/10" },
  { name: "Portal e Transparência", description: "Acesso à informação", href: "/transparencia", icon: Eye, color: "text-cyan-600", bg: "bg-cyan-500/10" },
  { name: "Tributário", description: "Impostos e taxas", href: "/tributario", icon: Landmark, color: "text-emerald-600", bg: "bg-emerald-500/10" },
  { name: "Financeiro e Contábil", description: "Orçamento e caixa", href: "/financeiro", icon: CircleDollarSign, color: "text-green-600", bg: "bg-green-500/10" },
  { name: "Compras e Contratos", description: "Licitações e gestão", href: "/compras", icon: ShoppingCart, color: "text-purple-600", bg: "bg-purple-500/10" },
  { name: "RH e Folha", description: "Servidores e pagamentos", href: "/rh", icon: Users, color: "text-rose-600", bg: "bg-rose-500/10" },
  { name: "Patrimônio", description: "Bens e almoxarifado", href: "/patrimonio", icon: Package, color: "text-yellow-600", bg: "bg-yellow-500/10" },
  { name: "Educação", description: "Escolas e alunos", href: "/educacao", icon: GraduationCap, color: "text-indigo-600", bg: "bg-indigo-500/10" },
  { name: "Saúde", description: "SUS, postos e pacientes", href: "/saude", icon: HeartPulse, color: "text-red-600", bg: "bg-red-500/10" },
  { name: "Assistência Social", description: "Benefícios e CRAS", href: "/social", icon: Handshake, color: "text-pink-600", bg: "bg-pink-500/10" },
  { name: "Meio Ambiente", description: "Licenças e fiscalização", href: "/meio-ambiente", icon: Leaf, color: "text-lime-600", bg: "bg-lime-500/10" },
  { name: "Saneamento", description: "Água e esgoto", href: "/saneamento", icon: Droplets, color: "text-sky-600", bg: "bg-sky-500/10" },
  { name: "Câmara Municipal", description: "Processo legislativo", href: "/legislativo", icon: Gavel, color: "text-stone-600", bg: "bg-stone-500/10" },
  { name: "Configurações", description: "Sistema e integrações", href: "/configuracoes", icon: Settings, color: "text-slate-800", bg: "bg-slate-500/20" },
];

export default function PainelPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto pt-2 pb-4 px-2 md:px-4 flex flex-col">
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="block group outline-none">
            <div className="h-full bg-card border border-border/40 shadow-sm rounded-2xl transition-all duration-300 hover:shadow-md hover:border-primary/30 hover:bg-accent/20 hover:-translate-y-1 active:scale-95 active:shadow-sm active:translate-y-0 flex flex-col justify-center text-center py-5 px-2 cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className={`p-3 rounded-2xl ${item.bg} shadow-sm ring-1 ring-inset ring-black/5 transition-transform duration-300 group-hover:scale-110`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-tight text-foreground/90 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-tight line-clamp-1 mt-1.5 px-2">
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
