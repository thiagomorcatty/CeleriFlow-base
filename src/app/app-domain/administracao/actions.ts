"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Secretariats ---
export async function deactivateSecretariat(id: string) {
  await prisma.secretariat.update({
    where: { id },
    data: { isActive: false }
  });
  revalidatePath("/administracao/secretarias");
}

export async function updateSecretariat(id: string, data: { name: string, acronym: string, managerName: string }) {
  await prisma.secretariat.update({
    where: { id },
    data
  });
  revalidatePath("/administracao/secretarias");
}

// --- Departments ---
export async function deactivateDepartment(id: string) {
  await prisma.department.update({
    where: { id },
    data: { isActive: false }
  });
  revalidatePath("/administracao/departamentos");
}

export async function updateDepartment(id: string, data: { name: string, description: string }) {
  await prisma.department.update({
    where: { id },
    data
  });
  revalidatePath("/administracao/departamentos");
}

// --- Roles ---
export async function deactivateRole(id: string) {
  await prisma.role.update({
    where: { id },
    data: { isActive: false }
  });
  revalidatePath("/administracao/cargos");
}

export async function updateRole(id: string, data: { name: string, level: string, canSign: boolean }) {
  await prisma.role.update({
    where: { id },
    data
  });
  revalidatePath("/administracao/cargos");
}

// --- Employees ---
export async function deactivateEmployee(id: string) {
  await prisma.employee.update({
    where: { id },
    data: { isActive: false }
  });
  revalidatePath("/administracao/servidores");
}

export async function updateEmployee(id: string, data: { name: string, email: string }) {
  await prisma.employee.update({
    where: { id },
    data
  });
  revalidatePath("/administracao/servidores");
}
