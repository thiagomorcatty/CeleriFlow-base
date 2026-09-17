import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/platform/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().max(120).optional(),
  organization: z.string().trim().min(2).max(160),
  city: z.string().trim().min(2).max(120),
  state: z.string().trim().min(2).max(32),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(8).max(64),
  moduleInterest: z.string().trim().max(160).optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "É necessário aceitar a política de privacidade",
  }),
});

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const rateLimit = checkRateLimit(`lead:${ip}`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `Muitas tentativas. Tente novamente em ${rateLimit.retryAfterSeconds} segundos.` },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
    );
  }

  const body: unknown = await req.json().catch(() => null);
  const parsedData = leadSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      { error: "Dados da solicitação inválidos. Revise os campos e tente novamente." },
      { status: 400 }
    );
  }

  try {
    // Importação dinâmica do Prisma: só carrega quando a rota é chamada em runtime.
    const { prisma } = await import("@/lib/prisma");

    await prisma.lead.create({
      data: {
        name: parsedData.data.name,
        role: parsedData.data.role,
        organization: parsedData.data.organization,
        city: parsedData.data.city,
        state: parsedData.data.state,
        email: parsedData.data.email,
        phone: parsedData.data.phone,
        moduleInterest: parsedData.data.moduleInterest,
        message: parsedData.data.message,
        consent: parsedData.data.consent,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar lead:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
