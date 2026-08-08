"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

type PersonUpdateData = {
  fullName?: string;
  cpf?: string;
  email?: string | null;
  phonePrimary?: string | null;
  isTaxpayer?: boolean;
  municipalInsc?: string;
};

type CompanyUpdateData = {
  corporateName?: string;
  cnpj?: string;
  emailPrimary?: string | null;
  phone?: string | null;
  isTaxpayer?: boolean;
  municipalInsc?: string;
};

type RealEstateUpdateData = {
  municipalInsc?: string | null;
  propertyType?: string | null;
  streetName?: string | null;
  number?: string | null;
};

type SupplierUpdateData = {
  businessBranch?: string | null;
};

type DocumentUpdateData = {
  title?: string;
  documentType?: string;
};

async function getTenantPrisma() {
  return (await getTenantContextForModuleEdit("CADASTROS")).prisma;
}

// Person
export async function updatePerson(id: string, data: PersonUpdateData) {
  const prisma = await getTenantPrisma();
  const { isTaxpayer, municipalInsc, ...personData } = data;
  
  const result = await prisma.person.update({ where: { id }, data: personData });
  
  if (isTaxpayer !== undefined) {
    if (isTaxpayer) {
      await prisma.taxpayer.upsert({
        where: { personId: id },
        update: { municipalInsc: municipalInsc || null },
        create: { personId: id, taxpayerType: 'PF', municipalInsc: municipalInsc || null }
      });
    } else {
      await prisma.taxpayer.deleteMany({ where: { personId: id } });
    }
  }
  
  revalidatePath("/cadastros/pessoas-fisicas");
  return result;
}
export async function deactivatePerson(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.person.update({ where: { id }, data: { status: 'Inativo' } });
  revalidatePath("/cadastros/pessoas-fisicas");
  return result;
}
export async function activatePerson(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.person.update({ where: { id }, data: { status: 'Ativo' } });
  revalidatePath("/cadastros/pessoas-fisicas");
  return result;
}

// Company
export async function updateCompany(id: string, data: CompanyUpdateData) {
  const prisma = await getTenantPrisma();
  const { isTaxpayer, municipalInsc, ...companyData } = data;
  
  const result = await prisma.company.update({ where: { id }, data: companyData });
  
  if (isTaxpayer !== undefined) {
    if (isTaxpayer) {
      await prisma.taxpayer.upsert({
        where: { companyId: id },
        update: { municipalInsc: municipalInsc || null },
        create: { companyId: id, taxpayerType: 'PJ', municipalInsc: municipalInsc || null }
      });
    } else {
      await prisma.taxpayer.deleteMany({ where: { companyId: id } });
    }
  }
  
  revalidatePath("/cadastros/pessoas-juridicas");
  return result;
}
export async function deactivateCompany(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.company.update({ where: { id }, data: { status: 'Inativo' } });
  revalidatePath("/cadastros/pessoas-juridicas");
  return result;
}
export async function activateCompany(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.company.update({ where: { id }, data: { status: 'Ativo' } });
  revalidatePath("/cadastros/pessoas-juridicas");
  return result;
}

// Taxpayer endpoints removed as it's now handled by Person/Company

// RealEstate
export async function updateRealEstate(id: string, data: RealEstateUpdateData) {
  const prisma = await getTenantPrisma();
  const result = await prisma.realEstate.update({ where: { id }, data });
  revalidatePath("/cadastros/imoveis");
  return result;
}
export async function deactivateRealEstate(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.realEstate.update({ where: { id }, data: { status: 'Inativo' } });
  revalidatePath("/cadastros/imoveis");
  return result;
}
export async function activateRealEstate(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.realEstate.update({ where: { id }, data: { status: 'Regular' } });
  revalidatePath("/cadastros/imoveis");
  return result;
}

// Supplier
export async function updateSupplier(id: string, data: SupplierUpdateData) {
  const prisma = await getTenantPrisma();
  const result = await prisma.supplier.update({ where: { id }, data });
  revalidatePath("/cadastros/fornecedores");
  return result;
}
export async function deactivateSupplier(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.supplier.update({ where: { id }, data: { status: 'Inativo' } });
  revalidatePath("/cadastros/fornecedores");
  return result;
}
export async function activateSupplier(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.supplier.update({ where: { id }, data: { status: 'Ativo' } });
  revalidatePath("/cadastros/fornecedores");
  return result;
}

// Address endpoints removed as they don't have a standalone page anymore

// Document
export async function updateDocument(id: string, data: DocumentUpdateData) {
  const prisma = await getTenantPrisma();
  const result = await prisma.document.update({ where: { id }, data });
  revalidatePath("/cadastros/documentos");
  return result;
}
export async function deleteDocument(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.document.delete({ where: { id } });
  revalidatePath("/cadastros/documentos");
  return result;
}
