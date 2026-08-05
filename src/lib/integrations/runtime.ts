import "server-only";

import type { PrismaClient } from "@prisma/client";
import { bankIntegrationClient } from "@/lib/financeiro/bank-integration-client";
import { runMockIntegration, type IntegrationEnvironment } from "./registry";

export class IntegrationExecutionError extends Error {}

export async function executeConfiguredIntegration(
  prisma: PrismaClient,
  code: string,
  operation: string,
) {
  const connection = await prisma.integrationConnection.findUnique({ where: { code } });
  if (!connection || connection.status !== "ATIVA") {
    throw new IntegrationExecutionError(`A integração ${code} não está ativa nesta instalação.`);
  }

  const environment = connection.environment as IntegrationEnvironment;
  if (environment === "MOCK") return runMockIntegration(code, operation);
  if (environment === "SANDBOX" && code === "BANCO_API") {
    await bankIntegrationClient.checkSandboxHealth();
    return {
      status: "SUCESSO",
      message: "Banco simulado externo disponível e autenticado para a POC.",
      externalId: undefined,
      payload: { simulated: false, environment: "SANDBOX", operation },
    };
  }

  throw new IntegrationExecutionError(
    `O adaptador real de ${code} ainda não foi homologado. Configure-o e implemente o conector específico antes de enviar dados para ${environment.toLowerCase()}.`,
  );
}
