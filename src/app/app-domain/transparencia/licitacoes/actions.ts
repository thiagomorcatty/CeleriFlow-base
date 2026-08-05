"use server"

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModuleEdit("TRANSPARENCIA")).prisma;
}

export async function uploadBiddingsCsv(formData: FormData) {
  const prisma = await getTenantPrisma();
  const file = formData.get("file") as File;
  if (!file) throw new Error("Nenhum arquivo enviado.");

  const text = await file.text();
  const rows = text.split('\n').filter(row => row.trim().length > 0);
  
  if (rows.length < 2) throw new Error("Arquivo vazio ou sem registros.");

  // header: numero,objeto,valorEstimado,dataPublicacao,modalidade
  const lines = rows.slice(1);
  let count = 0;

  // Garantir que existe uma secretaria padrao
  let sec = await prisma.secretariat.findFirst();
  if (!sec) {
    sec = await prisma.secretariat.create({ data: { name: "Secretaria Geral", acronym: "SG" } });
  }

  for (const line of lines) {
    const cols = line.split(',');
    if (cols.length >= 5) {
      const [numero, objeto, valorEstimado, dataPublicacao, modalidade] = cols;

      const val = parseFloat(valorEstimado.trim());
      
      const p = await prisma.purchaseProcess.create({
        data: {
          number: `PRC-${Date.now()}-${count}`,
          object: objeto.trim(),
          type: "Outros",
          modality: modalidade.trim(),
          estimatedValue: isNaN(val) ? 0 : val,
          status: "Em Licitação",
          secretariatId: sec.id,
        }
      });

      await prisma.bidding.create({
        data: {
          number: numero.trim(),
          modality: modalidade.trim(),
          status: "Em Elaboração",
          publicationDate: new Date(dataPublicacao.trim()),
          sessionDate: new Date(new Date(dataPublicacao.trim()).getTime() + 15 * 24 * 60 * 60 * 1000), // + 15 days
          processId: p.id,
        }
      });
      count++;
    }
  }

  revalidatePath("/transparencia/licitacoes");
  return count;
}
