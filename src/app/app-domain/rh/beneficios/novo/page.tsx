import { BeneficioForm } from "../BeneficioForm";
import { prisma } from "@/lib/prisma";

export default async function NovoBeneficioPage() {
  const suppliers = await prisma.supplier.findMany({ orderBy: { company: { corporateName: 'asc' } } });
  
  return (
    <BeneficioForm suppliers={suppliers} />
  );
}
