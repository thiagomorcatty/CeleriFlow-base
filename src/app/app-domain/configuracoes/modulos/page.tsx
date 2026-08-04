import React from "react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { ensureDefaultModulos } from "../actions";
import ModulosClient from "./ModulosClient";

export const dynamic = "force-dynamic";

export default async function ModulosPage() {
  const { prisma } = await getTenantContextForModule("CONFIGURACOES");
  
  // Auto-seed missing system modules if needed
  try {
    await ensureDefaultModulos();
  } catch (err) {
    console.warn("Notice: ensureDefaultModulos failed or already seeded", err);
  }

  const modulos = await prisma.configuracaoModulo.findMany({
    orderBy: { nome: "asc" },
  });

  return <ModulosClient initialModulos={modulos} />;
}
