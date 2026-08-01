import { createHash, createSign, createVerify } from "node:crypto";

export type DigitalSignatureResult = {
  documentId: string;
  signatureHash: string;
  signedAt: Date;
  certificateIssuer: string;
  isValid: boolean;
};

// Simulação e adaptador para Assinatura ICP-Brasil A1/A3
export function signDocumentICPBrasil(
  documentId: string,
  content: string,
  certificateSubject: string = "CN=PREFEITURA MUNICIPAL DE LAGOA SECA:08.740.505/0001-01, OU=ICP-Brasil",
): DigitalSignatureResult {
  const hash = createHash("sha256")
    .update(content + documentId + certificateSubject)
    .digest("hex");

  return {
    documentId,
    signatureHash: `ICP-BR-A1:${hash}`,
    signedAt: new Date(),
    certificateIssuer: certificateSubject,
    isValid: true,
  };
}

export function signBatchICPBrasil(
  documents: { id: string; content: string }[],
  certificateSubject?: string,
): DigitalSignatureResult[] {
  return documents.map((doc) => signDocumentICPBrasil(doc.id, doc.content, certificateSubject));
}

export function verifyICPBrasilSignature(result: DigitalSignatureResult): boolean {
  return result.signatureHash.startsWith("ICP-BR-A1:") && result.isValid;
}
