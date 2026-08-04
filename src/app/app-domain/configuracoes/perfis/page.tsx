import { getTenantContextForSystemAdministration } from "@/lib/platform/tenant-context";
import PerfisClient from "./PerfisClient";

export const dynamic = "force-dynamic";

export default async function PerfisPage() {
  const { prisma } = await getTenantContextForSystemAdministration();

  // Fetch profiles ordered by name
  const allPerfis = await prisma.configuracaoPerfil.findMany({
    orderBy: { createdAt: "asc" },
  });

  // Deduplicate by normalized profile name (e.g. "Administrador", "Contador", etc.)
  const seenNames = new Map<string, typeof allPerfis[0]>();
  const duplicateIdsToDelete: string[] = [];

  for (const perfil of allPerfis) {
    const key = perfil.nome.trim().toLowerCase();
    if (!seenNames.has(key)) {
      seenNames.set(key, perfil);
    } else {
      // Keep the one that has description or valid permissions json
      const existing = seenNames.get(key)!;
      if (!existing.descricao && perfil.descricao) {
        duplicateIdsToDelete.push(existing.id);
        seenNames.set(key, perfil);
      } else {
        duplicateIdsToDelete.push(perfil.id);
      }
    }
  }

  // Cleanup duplicates in background if any found
  if (duplicateIdsToDelete.length > 0) {
    try {
      await prisma.configuracaoPerfil.deleteMany({
        where: { id: { in: duplicateIdsToDelete } },
      });
    } catch (e) {
      console.warn("Deduplication cleanup notice:", e);
    }
  }

  const perfisDeduplicados = Array.from(seenNames.values()).sort((a, b) => a.nome.localeCompare(b.nome));

  return <PerfisClient perfis={perfisDeduplicados} />;
}
