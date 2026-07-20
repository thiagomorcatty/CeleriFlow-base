import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSession, SESSION_COOKIE_NAME, SESSION_DURATION_MS } from "@/lib/platform/session";
import { resolveTenantContext, TenantAccessError } from "@/lib/platform/tenant-context";

const bodySchema = z.object({
  idToken: z.string().min(100),
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { idToken } = bodySchema.parse(await request.json());
    const sessionCookie = await createSession(idToken);
    const context = await resolveTenantContext(request.headers.get("host"), sessionCookie);
    const response = NextResponse.json({
      tenant: context.tenant,
      modules: context.modules,
    });

    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: Math.floor(SESSION_DURATION_MS / 1000),
      path: "/",
    });

    return response;
  } catch (error) {
    if (error instanceof TenantAccessError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Token de autenticacao invalido." }, { status: 400 });
    }

    console.error("Falha ao criar sessao da plataforma", error);
    return NextResponse.json({ error: "Nao foi possivel iniciar a sessao." }, { status: 500 });
  }
}
