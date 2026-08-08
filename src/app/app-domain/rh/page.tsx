import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Users, 
  FileText, 
  Clock, 
  Banknote,
  GraduationCap,
  HeartPulse,
  Briefcase
} from "lucide-react"
import Link from "next/link"
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export default async function RHDashboard() {
  const { prisma } = await getTenantContextForModule("RH");
  const totalEmployees = await prisma.employee.count().catch(() => 0)
  const activeEmployees = await prisma.employee.count({ where: { isActive: true } }).catch(() => 0)
  const totalRoles = await prisma.role.count().catch(() => 0)
  const activeRoles = await prisma.role.count({ where: { isActive: true } }).catch(() => 0)

  const activePayrolls = await prisma.payroll.count({ where: { status: "Aberta" } }).catch(() => 0)
  const vacationRequests = await prisma.vacation.count({ where: { status: "Programada" } }).catch(() => 0)
  const totalAttendances = await prisma.attendanceRecord.count().catch(() => 0)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">RH e Folha</h2>
        <div className="flex items-center space-x-2">
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Servidores Ativos</CardTitle>
            <Users className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmployees}</div>
            <p className="text-xs text-muted-foreground">
              de {totalEmployees} servidores no total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Folhas Abertas</CardTitle>
            <Banknote className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePayrolls}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando fechamento
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Férias Solicitadas</CardTitle>
            <HeartPulse className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vacationRequests}</div>
            <p className="text-xs text-muted-foreground">
              Programadas para aprovação
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cargos Ativos</CardTitle>
            <Briefcase className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRoles}</div>
            <p className="text-xs text-muted-foreground">
              de {totalRoles} cargos cadastrados
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>
              Acesso rápido às rotinas do módulo de Recursos Humanos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/rh/servidores" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Users className="h-6 w-6 mr-4 text-emerald-500" />
                <div>
                  <div className="font-semibold">Servidores</div>
                  <div className="text-sm text-muted-foreground">Gestão de pessoal</div>
                </div>
              </Link>
              <Link href="/rh/folha" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Banknote className="h-6 w-6 mr-4 text-blue-500" />
                <div>
                  <div className="font-semibold">Folha de Pagamento</div>
                  <div className="text-sm text-muted-foreground">Cálculos e holerites</div>
                </div>
              </Link>
              <Link href="/rh/ponto" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Clock className="h-6 w-6 mr-4 text-amber-500" />
                <div>
                  <div className="font-semibold">Controle de Ponto</div>
                  <div className="text-sm text-muted-foreground">Frequência e espelho ({totalAttendances} registros)</div>
                </div>
              </Link>
              <Link href="/rh/ferias" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <HeartPulse className="h-6 w-6 mr-4 text-rose-500" />
                <div>
                  <div className="font-semibold">Férias e Licenças</div>
                  <div className="text-sm text-muted-foreground">Afastamentos legais</div>
                </div>
              </Link>
              <Link href="/rh/cargos" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Briefcase className="h-6 w-6 mr-4 text-indigo-500" />
                <div>
                  <div className="font-semibold">Cargos e Salários</div>
                  <div className="text-sm text-muted-foreground">Estrutura organizacional</div>
                </div>
              </Link>
              <Link href="/rh/treinamentos" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <GraduationCap className="h-6 w-6 mr-4 text-slate-500" />
                <div>
                  <div className="font-semibold">Treinamentos</div>
                  <div className="text-sm text-muted-foreground">Capacitação contínua</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Últimas Movimentações</CardTitle>
            <CardDescription>
              Acompanhamento de eventos recentes no RH.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground">
                <FileText className="h-8 w-8 mb-4 opacity-20" />
                <p>Nenhum evento recente encontrado.</p>
                <p className="text-sm">As movimentações de pessoal e folha aparecerão aqui automaticamente.</p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
