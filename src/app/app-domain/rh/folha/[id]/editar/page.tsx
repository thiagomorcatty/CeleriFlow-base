import { FolhaForm } from "../../FolhaForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditarFolhaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const folha = await prisma.payroll.findUnique({
    where: { id }
  });

  if (!folha) {
    notFound();
  }

  return (
    <FolhaForm data={folha} />
  );
}
