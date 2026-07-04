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
  Settings
} from "lucide-react";

const menuItems = [
  { name: "Processos", description: "Gestão e acompanhamento", href: "/app-domain/processos", icon: Files, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Atendimento", description: "Suporte e chamados", href: "/app-domain/atendimento", icon: HeadphonesIcon, color: "text-green-500", bg: "bg-green-500/10" },
  { name: "Documentos", description: "Emissão e controle", href: "/app-domain/documentos", icon: FileText, color: "text-amber-500", bg: "bg-amber-500/10" },
  { name: "Compras", description: "Licitações e contratos", href: "/app-domain/compras", icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-500/10" },
  { name: "Transparência", description: "Acesso à informação", href: "/app-domain/transparencia", icon: Eye, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { name: "Indicadores", description: "Relatórios e metas", href: "/app-domain/indicadores", icon: BarChart3, color: "text-rose-500", bg: "bg-rose-500/10" },
  { name: "Administração", description: "Gestão interna", href: "/app-domain/administracao", icon: Building2, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { name: "Configurações", description: "Ajustes do sistema", href: "/app-domain/configuracoes", icon: Settings, color: "text-slate-500", bg: "bg-slate-500/10" },
];

export default function PainelPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto w-full pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel de Controle</h1>
        <p className="text-muted-foreground mt-2">
          Selecione a área que deseja acessar.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="block group">
            <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <div className={`p-3 rounded-xl ${item.bg}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">{item.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="pt-2">{item.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
