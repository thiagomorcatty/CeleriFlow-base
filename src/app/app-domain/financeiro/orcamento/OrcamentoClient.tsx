"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

type Appropriation = {
  id: string;
  code: string;
  budgetUnit: { name: string; code: string; };
  expenseNature: { name: string; code: string; };
  resourceSource: { name: string; code: string; };
  initialValue: number;
  updatedValue: number;
  committedValue: number;
};

export default function OrcamentoClient({
  appropriations
}: {
  appropriations: Appropriation[];
}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orçamento e Plano de Contas</h2>
          <p className="text-muted-foreground">Gestão de dotações orçamentárias</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listagem de Dotações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código da Dotação</TableHead>
                <TableHead>Natureza da Despesa</TableHead>
                <TableHead>Unidade Orçamentária</TableHead>
                <TableHead>Fonte</TableHead>
                <TableHead className="text-right">Valor Atualizado (R$)</TableHead>
                <TableHead className="text-right">Valor Empenhado (R$)</TableHead>
                <TableHead className="text-right">Saldo (R$)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appropriations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground h-32">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="h-8 w-8 mb-2 opacity-20" />
                      Nenhuma dotação encontrada.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                appropriations.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.code}</TableCell>
                    <TableCell>{app.expenseNature.code} - {app.expenseNature.name}</TableCell>
                    <TableCell>{app.budgetUnit.code} - {app.budgetUnit.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{app.resourceSource.code}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-emerald-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(app.updatedValue)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-amber-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(app.committedValue)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-blue-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(app.updatedValue - app.committedValue)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
