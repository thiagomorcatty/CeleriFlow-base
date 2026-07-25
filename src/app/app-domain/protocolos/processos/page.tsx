import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import ProcessosClient from "./ProcessosClient";

export const dynamic = "force-dynamic";

export default async function ProcessosPage() {
  const { prisma, user } = await getTenantContextForModule("PROTOCOLOS");
  const isAdmin = user.role.toLowerCase().includes("administrador");
  const canViewSectorBox = isAdmin || Boolean(user.departmentId);
  const processos = await prisma.process.findMany({
    where: canViewSectorBox && !isAdmin ? { currentDepartmentId: user.departmentId! } : canViewSectorBox ? undefined : { id: "__sem-departamento__" },
    include: {
      processType: true,
      subject: true,
      person: true,
      company: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return <ProcessosClient initialProcessos={processos} canReceive={Boolean(user.departmentId)} />;
}
