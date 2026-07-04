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
    <div className="w-full max-w-[1600px] mx-auto pb-4 px-2 md:px-4 flex flex-col justify-center min-h-[calc(100vh-8rem)]">
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="block group">
            <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 flex flex-col justify-center text-center py-4 px-2">
              <CardHeader className="flex flex-col items-center gap-2 space-y-0 p-0 pb-1">
                <div className={`p-2.5 rounded-xl ${item.bg}`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <CardTitle className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                  {item.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-[11px] leading-tight line-clamp-1 px-1">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
