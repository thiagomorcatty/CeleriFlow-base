import { getProtocolContext, protocolScope } from "@/lib/protocols/access";
import ProcessosClient from "./ProcessosClient";

export const dynamic = "force-dynamic";

export default async function ProcessosPage() {
  const context = await getProtocolContext();
  const { prisma, user } = context;
  const canViewSectorBox = context.protocolAccess.isAdmin || Boolean(user.departmentId);
  const processos = await prisma.process.findMany({
    where: canViewSectorBox ? protocolScope(context) : { id: "__sem-departamento__" },
    include: {
      processType: true,
      subject: true,
      person: true,
      company: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return <ProcessosClient initialProcessos={processos} canReceive={context.protocolAccess.canEdit && Boolean(user.departmentId)} canCreate={context.protocolAccess.canEdit} />;
}
