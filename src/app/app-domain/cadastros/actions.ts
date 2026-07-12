"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Person
export async function updatePerson(id: string, data: any) {
  const result = await prisma.person.update({ where: { id }, data });
  revalidatePath("/cadastros/pessoas-fisicas");
  return result;
}
export async function deactivatePerson(id: string) {
  const result = await prisma.person.update({ where: { id }, data: { status: 'Inativo' } });
  revalidatePath("/cadastros/pessoas-fisicas");
  return result;
}
export async function activatePerson(id: string) {
  const result = await prisma.person.update({ where: { id }, data: { status: 'Ativo' } });
  revalidatePath("/cadastros/pessoas-fisicas");
  return result;
}

// Company
export async function updateCompany(id: string, data: any) {
  const result = await prisma.company.update({ where: { id }, data });
  revalidatePath("/cadastros/pessoas-juridicas");
  return result;
}
export async function deactivateCompany(id: string) {
  const result = await prisma.company.update({ where: { id }, data: { status: 'Inativo' } });
  revalidatePath("/cadastros/pessoas-juridicas");
  return result;
}
export async function activateCompany(id: string) {
  const result = await prisma.company.update({ where: { id }, data: { status: 'Ativo' } });
  revalidatePath("/cadastros/pessoas-juridicas");
  return result;
}

// Taxpayer
export async function updateTaxpayer(id: string, data: any) {
  const result = await prisma.taxpayer.update({ where: { id }, data });
  revalidatePath("/cadastros/contribuintes");
  return result;
}
export async function deactivateTaxpayer(id: string) {
  const result = await prisma.taxpayer.update({ where: { id }, data: { status: 'Inativo' } });
  revalidatePath("/cadastros/contribuintes");
  return result;
}
export async function activateTaxpayer(id: string) {
  const result = await prisma.taxpayer.update({ where: { id }, data: { status: 'Ativo' } });
  revalidatePath("/cadastros/contribuintes");
  return result;
}

// RealEstate
export async function updateRealEstate(id: string, data: any) {
  const result = await prisma.realEstate.update({ where: { id }, data });
  revalidatePath("/cadastros/imoveis");
  return result;
}
export async function deactivateRealEstate(id: string) {
  const result = await prisma.realEstate.update({ where: { id }, data: { status: 'Inativo' } });
  revalidatePath("/cadastros/imoveis");
  return result;
}
export async function activateRealEstate(id: string) {
  const result = await prisma.realEstate.update({ where: { id }, data: { status: 'Regular' } });
  revalidatePath("/cadastros/imoveis");
  return result;
}

// Supplier
export async function updateSupplier(id: string, data: any) {
  const result = await prisma.supplier.update({ where: { id }, data });
  revalidatePath("/cadastros/fornecedores");
  return result;
}
export async function deactivateSupplier(id: string) {
  const result = await prisma.supplier.update({ where: { id }, data: { status: 'Inativo' } });
  revalidatePath("/cadastros/fornecedores");
  return result;
}
export async function activateSupplier(id: string) {
  const result = await prisma.supplier.update({ where: { id }, data: { status: 'Ativo' } });
  revalidatePath("/cadastros/fornecedores");
  return result;
}

// Address (Excluir inves de Inativar, pois nao tem status)
export async function updateAddress(id: string, data: any) {
  const result = await prisma.address.update({ where: { id }, data });
  revalidatePath("/cadastros/enderecos");
  return result;
}
export async function deleteAddress(id: string) {
  const result = await prisma.address.delete({ where: { id } });
  revalidatePath("/cadastros/enderecos");
  return result;
}

// Document
export async function updateDocument(id: string, data: any) {
  const result = await prisma.document.update({ where: { id }, data });
  revalidatePath("/cadastros/documentos");
  return result;
}
export async function deleteDocument(id: string) {
  const result = await prisma.document.delete({ where: { id } });
  revalidatePath("/cadastros/documentos");
  return result;
}
