import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recordRpaOperationResult, rpaResultStatuses } from "@/lib/financeiro/rpa-integration";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const callbackSchema = z.object({
  operationId: z.string().min(1).max(200),
  status: z.enum(rpaResultStatuses),
  message: z.string().min(1).max(2_000),
  details: z.record(z.string(), z.unknown()).optional(),
  occurredAt: z.string().datetime(),
});

function isAuthorized(received: string | null, expected: string) {
  if (!received) return false;
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return receivedBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
}

export async function POST(request: NextRequest) {
  const secret = process.env.RPA_CALLBACK_KEY;
  if (!secret) return NextResponse.json({ error: "RPA callback key is not configured." }, { status: 503 });
  if (!isAuthorized(request.headers.get("x-rpa-callback-key"), secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const input = callbackSchema.parse(await request.json());
    const result = await recordRpaOperationResult(prisma, { ...input, occurredAt: new Date(input.occurredAt) });
    if (!result.found) return NextResponse.json({ error: "Operação RPA não encontrada." }, { status: 404 });
    if (result.conflict) return NextResponse.json({ error: "A operação RPA já possui resultado final diferente." }, { status: 409 });
    return NextResponse.json({ accepted: true, duplicate: result.duplicate });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Payload de callback inválido." }, { status: 400 });
    return NextResponse.json({ error: error instanceof Error ? error.message : "Falha ao registrar resultado do RPA." }, { status: 500 });
  }
}
