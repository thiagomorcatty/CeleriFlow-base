"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveCatalogItem(formData: any) {
  try {
    if (formData.id) {
      await prisma.catalogItem.update({
        where: { id: formData.id },
        data: {
          code: formData.code,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          unit: formData.unit,
          estimatedValue: formData.estimatedValue,
          isActive: formData.isActive
        }
      });
    } else {
      await prisma.catalogItem.create({
        data: {
          code: formData.code,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          unit: formData.unit,
          estimatedValue: formData.estimatedValue,
          isActive: formData.isActive
        }
      });
    }
    revalidatePath("/compras/catalogo");
    return { success: true };
  } catch (error) {
    console.error("Error saving catalog item:", error);
    return { success: false, error: "Falha ao salvar o item do catálogo." };
  }
}

export async function toggleCatalogItemStatus(id: string, isActive: boolean) {
  try {
    await prisma.catalogItem.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/compras/catalogo");
    return { success: true };
  } catch (error) {
    console.error("Error toggling catalog item status:", error);
    return { success: false, error: "Falha ao alterar o status do item." };
  }
}
