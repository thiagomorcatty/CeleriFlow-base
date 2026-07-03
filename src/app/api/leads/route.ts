import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const leadSchema = z.object({
  name: z.string().min(2),
  role: z.string().optional(),
  organization: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  moduleInterest: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "É necessário aceitar a política de privacidade",
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedData = leadSchema.parse(body);

    // Importação dinâmica do Prisma — só carrega quando a rota é chamada em runtime
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();

    const lead = await prisma.lead.create({
      data: {
        name: parsedData.name,
        role: parsedData.role,
        organization: parsedData.organization,
        city: parsedData.city,
        state: parsedData.state,
        email: parsedData.email,
        phone: parsedData.phone,
        moduleInterest: parsedData.moduleInterest,
        message: parsedData.message,
        consent: parsedData.consent,
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: (error as z.ZodError).issues },
        { status: 400 }
      );
    }
    console.error("Erro ao salvar lead:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
