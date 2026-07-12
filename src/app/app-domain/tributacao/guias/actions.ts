"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function payGuide(guideId: string, amount: number) {
  // Atualiza o status da guia e lança o pagamento
  const result = await prisma.taxGuide.update({
    where: { id: guideId },
    data: { status: "Paga" }
  });

  await prisma.taxPayment.create({
    data: {
      guideId,
      amountPaid: amount,
      paymentDate: new Date(),
      paymentMethod: "Manual"
    }
  });

  revalidatePath("/tributacao/guias");
  return result;
}

export async function cancelGuide(guideId: string) {
  const result = await prisma.taxGuide.update({
    where: { id: guideId },
    data: { status: "Cancelada" }
  });

  revalidatePath("/tributacao/guias");
  return result;
}

export async function createMockGuide() {
  // Ensure we have a Tax
  let tax = await prisma.tax.findFirst({ where: { name: "IPTU" } });
  if (!tax) {
    tax = await prisma.tax.create({
      data: { name: "IPTU", taxType: "Imposto" }
    });
  }

  // Ensure we have a Taxpayer
  let taxpayer = await prisma.taxpayer.findFirst();
  if (!taxpayer) {
    // Create a dummy person and taxpayer if none exists
    const person = await prisma.person.create({
      data: { fullName: "Contribuinte Teste", cpf: "000.000.000-00", status: "Ativo" }
    });
    taxpayer = await prisma.taxpayer.create({
      data: { taxpayerType: "PF", personId: person.id }
    });
  }

  const assessment = await prisma.taxAssessment.create({
    data: {
      year: 2026,
      originalValue: 1500.50,
      taxId: tax.id,
      taxpayerId: taxpayer.id,
    }
  });

  await prisma.taxGuide.create({
    data: {
      assessmentId: assessment.id,
      totalValue: 1500.50,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
      barcode: `81600000015-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Emitida"
    }
  });

  revalidatePath("/tributacao/guias");
}
