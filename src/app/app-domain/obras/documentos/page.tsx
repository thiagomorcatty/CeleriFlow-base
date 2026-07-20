import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { ObrasDocumentosClient } from "../components/ObrasDocumentosClient";

export default async function DocumentosPage() {
  const { prisma } = await getTenantContextForModule("OBRAS");
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
