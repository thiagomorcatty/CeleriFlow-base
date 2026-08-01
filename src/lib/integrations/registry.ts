export type IntegrationEnvironment = "MOCK" | "HOMOLOGACAO" | "PRODUCAO";

export type IntegrationDefinition = {
  code: string;
  name: string;
  category: "GOVERNAMENTAL" | "FISCAL" | "BANCARIA" | "COMUNICACAO" | "ASSINATURA" | "PUBLICACAO";
  provider: string;
  description: string;
};

export const integrationCatalog: readonly IntegrationDefinition[] = [
  { code: "TCE_PB_SAGRES", name: "TCE-PB / SAGRES", category: "GOVERNAMENTAL", provider: "Tribunal de Contas da Paraíba", description: "Remessas, validações, protocolos e retornos do SAGRES." },
  { code: "SICONFI", name: "SICONFI", category: "GOVERNAMENTAL", provider: "STN", description: "MSC, DCA, RREO e RGF." },
  { code: "ESOCIAL", name: "eSocial", category: "GOVERNAMENTAL", provider: "Receita Federal", description: "Eventos de prestadores e folha quando aplicável." },
  { code: "EFD_REINF", name: "EFD-Reinf", category: "GOVERNAMENTAL", provider: "Receita Federal", description: "Eventos de retenções e pagamentos." },
  { code: "DIRF_SEFIP", name: "DIRF e SEFIP", category: "GOVERNAMENTAL", provider: "Receita Federal", description: "Arquivos por competência, quando exigidos." },
  { code: "PNCP", name: "PNCP", category: "GOVERNAMENTAL", provider: "Portal Nacional de Contratações Públicas", description: "Publicação e consulta de contratações." },
  { code: "NFE_CTE", name: "NF-e e CT-e", category: "FISCAL", provider: "SEFAZ", description: "Consulta, captura e validação de documentos fiscais." },
  { code: "NFSE", name: "NFS-e", category: "FISCAL", provider: "Provedor nacional ou municipal", description: "Emissão, consulta e captura de notas de serviço." },
  { code: "BANCO_CNAB", name: "CNAB", category: "BANCARIA", provider: "Instituição financeira", description: "Remessa, retorno e liquidação bancária." },
  { code: "BANCO_OFX", name: "OFX", category: "BANCARIA", provider: "Instituição financeira", description: "Importação de extratos e conciliação." },
  { code: "BANCO_API", name: "API Bancária", category: "BANCARIA", provider: "Instituição financeira", description: "Saldos, extratos e pagamentos via API." },
  { code: "PIX_BOLETO", name: "PIX e Boleto", category: "BANCARIA", provider: "PSP ou banco contratado", description: "Cobrança, consulta e webhook de liquidação." },
  { code: "EMAIL_SMTP", name: "E-mail institucional", category: "COMUNICACAO", provider: "Servidor SMTP", description: "Notificações e comunicações do sistema." },
  { code: "WHATSAPP", name: "WhatsApp", category: "COMUNICACAO", provider: "Meta ou BSP contratado", description: "Notificações e atendimento registrado." },
  { code: "ICP_BRASIL", name: "Assinatura ICP-Brasil", category: "ASSINATURA", provider: "ICP-Brasil", description: "Assinatura A1/A3 e validação de cadeia." },
  { code: "DIARIO_OFICIAL", name: "Diário Oficial", category: "PUBLICACAO", provider: "Canal definido pelo município", description: "Publicação, protocolo e retorno de documentos oficiais." },
] as const;

export function getIntegrationDefinition(code: string) {
  return integrationCatalog.find((integration) => integration.code === code);
}

export function runMockIntegration(code: string, operation: string) {
  const definition = getIntegrationDefinition(code);
  if (!definition) throw new Error("Conector externo não reconhecido.");

  const externalId = `MOCK-${code}-${Date.now()}`;
  return {
    status: "SUCESSO",
    message: `${definition.name}: ${operation} simulado com sucesso. Nenhuma conexão externa foi realizada.`,
    externalId,
    payload: { simulated: true, code, operation, externalId },
  };
}
