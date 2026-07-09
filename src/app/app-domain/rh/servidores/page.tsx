import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { 
  Users, 
  Plus, 
  Search,
  Filter
} from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function ServidoresPage() {
  const employees = await prisma.employee.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      role: true,
      department: true
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Servidores</h2>
        <div className="flex items-center space-x-2">
          <Link href="/rh/servidores/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Servidor
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Servidores</CardTitle>
          <CardDescription>
            Gestão do quadro de pessoal e colaboradores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4">Nome</th>
                  <th className="font-medium p-4">CPF / Matrícula</th>
                  <th className="font-medium p-4">Cargo</th>
                  <th className="font-medium p-4">Setor</th>
                  <th className="font-medium p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      Nenhum servidor cadastrado.
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr key={emp.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4 font-medium">{emp.name}</td>
                      <td className="p-4 text-muted-foreground">
                        {emp.cpf || "Sem CPF"} <br/>
                        <span className="text-xs">{emp.registration || "Sem Matrícula"}</span>
                      </td>
                      <td className="p-4">{emp.role?.name || "-"}</td>
                      <td className="p-4">{emp.department?.name || "-"}</td>
                      <td className="p-4">
                        <Badge variant={emp.isActive ? "default" : "secondary"} className={emp.isActive ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                          {emp.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
