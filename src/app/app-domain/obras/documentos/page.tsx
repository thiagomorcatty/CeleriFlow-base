import { prisma } from "@/lib/prisma";
import { ObrasDocumentosClient } from "../components/ObrasDocumentosClient";

export default async function DocumentosPage() {
  const documentos = await prisma.obrasServicoDocumento.findMany({
    include: {
      obrasServico: true,
      document: {
        include: { folder: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return <ObrasDocumentosClient documentos={documentos} />;
}
