import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { ServidorRowActions } from "./ServidorRowActions"
import { EmployeeFilters } from "./EmployeeFilters"

export default async function ServidoresPage(
  props: {
    searchParams?: Promise<{
      q?: string;
      status?: string;
      roleId?: string;
      departmentId?: string;
    }>
  }
) {
  const { prisma } = await getTenantContextForModule("RH");
  const searchParams = await props.searchParams;
  const q = searchParams?.q || "";
  const status = searchParams?.status || "";
  const roleId = searchParams?.roleId || "";
  const departmentId = searchParams?.departmentId || "";

  const where: any = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { cpf: { contains: q } },
      { registration: { contains: q } }
    ];
  }
  if (status && status !== 'all') {
    where.isActive = status === 'active';
  }
  if (roleId && roleId !== 'all') {
    where.roleId = roleId;
  }
  if (departmentId && departmentId !== 'all') {
    where.departmentId = departmentId;
  }

  const employees = await prisma.employee.findMany({
    where,
    take: 100, // Limit for UI performance, but better than 10
    orderBy: { name: 'asc' },
    include: {
      role: true,
      department: true
    }
  })

  const roles = await prisma.role.findMany({ orderBy: { name: 'asc' } });
  const departments = await prisma.department.findMany({ orderBy: { name: 'asc' } });

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
        <CardHeader className="pb-4">
          <CardTitle>Lista de Servidores</CardTitle>
          <CardDescription>
            Gestão do quadro de pessoal e colaboradores. Exibindo {employees.length} registros (limite de 100).
          </CardDescription>
        </CardHeader>
        <CardContent>
          
          <EmployeeFilters roles={roles} departments={departments} />

          <div className="rounded-md border overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="font-medium p-2 px-4 whitespace-nowrap">Nome</th>
                  <th className="font-medium p-2 whitespace-nowrap">CPF / Matrícula</th>
                  <th className="font-medium p-2 whitespace-nowrap">Cargo</th>
                  <th className="font-medium p-2 whitespace-nowrap">Setor</th>
                  <th className="font-medium p-2 whitespace-nowrap">Status</th>
                  <th className="font-medium p-2 text-right whitespace-nowrap">Ações</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-muted-foreground">
                      Nenhum servidor encontrado com os filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr key={emp.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-2 px-4 font-medium whitespace-nowrap">{emp.name}</td>
                      <td className="p-2 text-muted-foreground whitespace-nowrap">
                        {emp.cpf || "Sem CPF"} <br/>
                        <span className="text-xs">{emp.registration || "Sem Matrícula"}</span>
                      </td>
                      <td className="p-2 whitespace-nowrap">{emp.role?.name || "-"}</td>
                      <td className="p-2 whitespace-nowrap truncate max-w-[200px]" title={emp.department?.name || ""}>
                        {emp.department?.name || "-"}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <Badge variant={emp.isActive ? "default" : "secondary"} className={emp.isActive ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                          {emp.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                      </td>
                      <td className="p-2 text-right whitespace-nowrap">
                        <ServidorRowActions employee={emp} />
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
