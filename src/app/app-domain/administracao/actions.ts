"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModule("ADMINISTRACAO")).prisma;
}

// --- Secretariats ---
export async function deactivateSecretariat(id: string) {
  const prisma = await getTenantPrisma();
  await prisma.secretariat.update({
    where: { id },
    data: { isActive: false }
  });
  revalidatePath("/administracao/secretarias");
}

export async function activateSecretariat(id: string) {
  const prisma = await getTenantPrisma();
  await prisma.secretariat.update({
    where: { id },
    data: { isActive: true }
  });
  revalidatePath("/administracao/secretarias");
}

export async function updateSecretariat(id: string, data: { name: string, acronym: string, managerName: string }) {
  const prisma = await getTenantPrisma();
  await prisma.secretariat.update({
    where: { id },
    data
  });
  revalidatePath("/administracao/secretarias");
}

// --- Departments ---
export async function deactivateDepartment(id: string) {
  const prisma = await getTenantPrisma();
  await prisma.department.update({
    where: { id },
    data: { isActive: false }
  });
  revalidatePath("/administracao/departamentos");
}

export async function activateDepartment(id: string) {
  const prisma = await getTenantPrisma();
  await prisma.department.update({
    where: { id },
    data: { isActive: true }
  });
  revalidatePath("/administracao/departamentos");
}

export async function updateDepartment(id: string, data: { name: string, description: string, secretariatId: string }) {
  const prisma = await getTenantPrisma();
  await prisma.department.update({
    where: { id },
    data
  });
  revalidatePath("/administracao/departamentos");
}

// --- Roles ---
export async function deactivateRole(id: string) {
  const prisma = await getTenantPrisma();
  await prisma.role.update({
    where: { id },
    data: { isActive: false }
  });
  revalidatePath("/administracao/cargos");
}

export async function activateRole(id: string) {
  const prisma = await getTenantPrisma();
  await prisma.role.update({
    where: { id },
    data: { isActive: true }
  });
  revalidatePath("/administracao/cargos");
}

export async function updateRole(id: string, data: { name: string, level: string, canSign: boolean }) {
  const prisma = await getTenantPrisma();
  await prisma.role.update({
    where: { id },
    data
  });
  revalidatePath("/administracao/cargos");
}

// --- Employees ---
export async function deactivateEmployee(id: string) {
  const prisma = await getTenantPrisma();
  await prisma.employee.update({
    where: { id },
    data: { isActive: false }
  });
  revalidatePath("/administracao/servidores");
}

export async function activateEmployee(id: string) {
  const prisma = await getTenantPrisma();
  await prisma.employee.update({
    where: { id },
    data: { isActive: true }
  });
  revalidatePath("/administracao/servidores");
}

export async function updateEmployee(id: string, data: { 
  name: string, 
  email: string,
  cpf: string,
  roleId: string | null,
  secretariatId: string | null,
  departmentId: string | null
}) {
  const prisma = await getTenantPrisma();
  await prisma.employee.update({
    where: { id },
    data
  });
  revalidatePath("/administracao/servidores");
}

// --- Administrative Units ---
export async function updateAdministrativeUnit(id: string, data: { name: string, type: string, managerName: string, secretariatId: string }) {
  const prisma = await getTenantPrisma();
  await prisma.administrativeUnit.update({
    where: { id },
    data
  });
  revalidatePath("/administracao/unidades");
}

// --- Internal Demands ---
export async function updateInternalDemand(id: string, data: { title: string, status: string, priority: string, assigneeId: string | null, secretariatId: string | null, departmentId: string | null }) {
  const prisma = await getTenantPrisma();
  await prisma.internalDemand.update({
    where: { id },
    data
  });
  revalidatePath("/administracao/demandas");
}

// --- Calendar Events ---
export async function deleteCalendarEvent(id: string) {
  const prisma = await getTenantPrisma();
  await prisma.calendarEvent.delete({ where: { id } });
  revalidatePath('/administracao/calendario');
}

export async function updateCalendarEvent(id: string, data: { title: string, description: string, date: Date, type: string, isHoliday: boolean }) {
  const prisma = await getTenantPrisma();
  await prisma.calendarEvent.update({ where: { id }, data });
  revalidatePath('/administracao/calendario');
}
