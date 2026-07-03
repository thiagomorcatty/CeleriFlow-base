import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, FileText, CheckCircle2 } from "lucide-react";

export default function PainelPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel de Controle</h1>
        <p className="text-muted-foreground mt-2">Visão geral e indicadores do sistema.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processos Ativos</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.450</div>
            <p className="text-xs text-muted-foreground">+18% em relação ao mês passado</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendências</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Requerem sua atenção imediata</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos Emitidos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+3.200</div>
            <p className="text-xs text-muted-foreground">Nesta semana</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Taxa de resolução no prazo</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Últimos Acessos e Atividades</CardTitle>
            <CardDescription>Um resumo das movimentações mais recentes no seu setor.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center border border-dashed rounded-md bg-muted/20">
              <span className="text-muted-foreground">Gráfico ou lista em desenvolvimento</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Alertas Importantes</CardTitle>
            <CardDescription>Avisos do sistema e de prazos.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center border border-dashed rounded-md bg-muted/20">
              <span className="text-muted-foreground">Sem alertas no momento</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
