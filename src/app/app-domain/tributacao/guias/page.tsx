import { prisma } from "@/lib/prisma";
import GuiasClient from "./GuiasClient";

export const dynamic = "force-dynamic";

export default async function GuiasPage() {
  const guias = await prisma.taxGuide.findMany({
    include: {
      assessment: {
        include: {
          taxpayer: { include: { person: true, company: true } },
          tax: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 30
  });

  return (
    <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <GuiasClient guias={guias as any} />
    </div>
  );
}
