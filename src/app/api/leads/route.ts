import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

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
  consent: z.literal(true),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validação
    const parsedData = leadSchema.parse(body);

    // Salvar no Banco
    const lead = await prisma.lead.create({
      data: parsedData,
    });

    // TODO: Enviar email usando Resend aqui, quando chave estiver disponível

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
