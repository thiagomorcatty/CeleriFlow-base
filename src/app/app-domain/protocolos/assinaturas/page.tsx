import { getProtocolContext, protocolScope } from "@/lib/protocols/access";
import AssinaturasClient from "./AssinaturasClient";

export const dynamic = "force-dynamic";

export default async function AssinaturasPage() {
  const context = await getProtocolContext();
  const { prisma } = context;
  const documentos = await prisma.processDocument.findMany({
    where: {
      document: {
        status: "Pendente Assinatura",
        signatures: { none: { status: "SIGNED" } },
      },
      process: { is: protocolScope(context) },
    },
    include: {
      process: { select: { id: true, protocolNumber: true } },
      document: { select: { id: true, title: true, documentType: true, createdAt: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return <AssinaturasClient initialDocuments={documentos.filter((item) => item.document !== null)} />;
}
