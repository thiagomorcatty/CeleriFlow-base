"use server";

import { Prisma } from "@prisma/client";
import { getIntegrationDefinition, runMockIntegration, type IntegrationEnvironment } from "@/lib/integrations/registry";
import { getTenantContextForSystemAdministration } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ActionResult = { error?: string; data?: { id: string; message: string } };

const connectionSchema = z.object({
  code: z.string().min(1),
  environment: z.enum(["MOCK", "HOMOLOGACAO", "PRODUCAO"]),
  baseUrl: z.string().trim().max(500).optional(),
  credentialReference: z.string().trim().max(250).optional(),
  configurationJson: z.string().max(20_000).optional(),
  mockScenarioJson: z.string().max(20_000).optional(),
  enabled: z.boolean(),
});

function assertNoSecretValues(value: unknown) {
  if (Array.isArray(value)) {
    value.forEach(assertNoSecretValues);
    return;
  }
  if (!value || typeof value !== "object") return;

  for (const [key, nestedValue] of Object.entries(value)) {
    if (/(secret|senha|password|token|api.?key|private.?key|certificate|certificado|authorization|credential|bearer)/i.test(key)) {
      throw new Error("Use apenas a referência do segredo. Chaves, senhas, tokens e certificados não podem ser gravados nesta configuração.");
    }
    assertNoSecretValues(nestedValue);
  }
}

function parsePublicJson(value: string | undefined, field: string): Prisma.InputJsonValue | undefined {
  if (!value?.trim()) return undefined;
  try {
    const parsed: unknown = JSON.parse(value);
    assertNoSecretValues(parsed);
    return parsed as Prisma.InputJsonValue;
  } catch (error) {
    if (error instanceof Error && error.message.includes("segredo")) throw error;
    throw new Error(`${field} deve conter JSON válido.`);
  }
}

function validateConnectionInput(input: z.infer<typeof connectionSchema>) {
  const definition = getIntegrationDefinition(input.code);
  if (!definition) throw new Error("Conector externo inválido.");

  if (input.baseUrl) {
    try {
      new URL(input.baseUrl);
    } catch {
      throw new Error("A URL base da integração é inválida.");
    }
  }

  if (input.credentialReference && !/^(env:|vault:|secret:\/\/)/.test(input.credentialReference)) {
    throw new Error("A referência de credencial deve apontar para env:, vault: ou secret://; não informe o segredo diretamente.");
  }
  return definition;
}

export async function saveIntegrationConnection(rawInput: unknown): Promise<ActionResult> {
  try {
    const input = connectionSchema.parse(rawInput);
    const definition = validateConnectionInput(input);
    const context = await getTenantContextForSystemAdministration();
    const connection = await context.prisma.integrationConnection.upsert({
      where: { code: definition.code },
      create: {
        code: definition.code,
        name: definition.name,
        category: definition.category,
        provider: definition.provider,
        environment: input.environment,
        status: input.enabled ? "CONFIGURANDO" : "DESATIVADA",
        baseUrl: input.baseUrl || undefined,
        credentialReference: input.credentialReference || undefined,
        configuration: parsePublicJson(input.configurationJson, "Parâmetros públicos"),
        mockScenario: parsePublicJson(input.mockScenarioJson, "Cenário mock"),
      },
      update: {
        name: definition.name,
        category: definition.category,
        provider: definition.provider,
        environment: input.environment,
        status: input.enabled ? "CONFIGURANDO" : "DESATIVADA",
        baseUrl: input.baseUrl || null,
        credentialReference: input.credentialReference || null,
        configuration: parsePublicJson(input.configurationJson, "Parâmetros públicos") ?? Prisma.JsonNull,
        mockScenario: parsePublicJson(input.mockScenarioJson, "Cenário mock") ?? Prisma.JsonNull,
      },
    });
    revalidatePath("/configuracoes/integracoes");
    revalidatePath("/configuracoes");
    return { data: { id: connection.id, message: "Conexão salva. Execute o teste antes de ativar o fluxo operacional." } };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível salvar a conexão." };
  }
}

export async function testIntegrationConnection(connectionId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForSystemAdministration();
    const connection = await context.prisma.integrationConnection.findUnique({ where: { id: z.string().min(1).parse(connectionId) } });
    if (!connection) throw new Error("Conexão não encontrada.");
    if (connection.status === "DESATIVADA") throw new Error("Ative a conexão antes de executar o teste.");

    const environment = connection.environment as IntegrationEnvironment;
    const result = environment === "MOCK"
      ? runMockIntegration(connection.code, "TESTE_DE_CONEXAO")
      : {
          status: "PENDENTE",
          message: "O adaptador real ainda deve ser homologado com o fornecedor e a referência de credencial configurada.",
          externalId: undefined,
          payload: { simulated: false, code: connection.code, operation: "TESTE_DE_CONEXAO" },
        };

    await context.prisma.$transaction([
      context.prisma.integrationConnection.update({
        where: { id: connection.id },
        data: {
          status: result.status === "SUCESSO" ? "ATIVA" : "CONFIGURANDO",
          lastTestedAt: new Date(),
          lastTestStatus: result.status,
          lastTestMessage: result.message,
        },
      }),
      context.prisma.integrationRun.create({
        data: {
          connectionId: connection.id,
          operation: "TESTE_DE_CONEXAO",
          environment,
          status: result.status,
          message: result.message,
          externalId: result.externalId,
          payload: result.payload,
        },
      }),
    ]);
    revalidatePath("/configuracoes/integracoes");
    revalidatePath("/configuracoes");
    return { data: { id: connection.id, message: result.message } };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível testar a conexão." };
  }
}
