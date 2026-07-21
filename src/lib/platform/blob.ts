import { get, put } from "@vercel/blob";

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

function getPlatformBlobToken() {
  const token = process.env.Platform_BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("Platform_BLOB_READ_WRITE_TOKEN nao configurada.");
  return token;
}

function safeFilename(filename: string) {
  const normalized = filename.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  const sanitized = normalized.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return sanitized.slice(0, 120) || "arquivo";
}

function isTenantPath(pathname: string, tenantId: string) {
  return pathname.startsWith(`tenants/${tenantId}/`);
}

// Tipos de arquivo aceitos para upload na plataforma
const ALLOWED_MIME_TYPES = new Set([
  // Documentos
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.oasis.opendocument.text",
  // Planilhas
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.oasis.opendocument.spreadsheet",
  // Apresentações
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  // Imagens
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  // Compactados
  "application/zip",
  "application/x-rar-compressed",
  // Texto
  "text/plain",
  "text/csv",
]);

export function validateUpload(file: File) {
  if (!file.name || file.size === 0) throw new Error("Selecione um arquivo valido.");
  if (file.size > MAX_FILE_SIZE_BYTES) throw new Error("O arquivo deve ter no maximo 20 MB.");
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error(
      "Tipo de arquivo nao permitido. Envie PDF, documentos Office, imagens ou planilhas."
    );
  }
}


export async function uploadTenantFile(tenantId: string, file: File) {
  validateUpload(file);

  return put(`tenants/${tenantId}/documents/${crypto.randomUUID()}-${safeFilename(file.name)}`, file, {
    access: "private",
    token: getPlatformBlobToken(),
  });
}

export async function getTenantFile(tenantId: string, url: string) {
  try {
    const platformFile = await get(url, { access: "private", token: getPlatformBlobToken() });
    return platformFile && isTenantPath(platformFile.blob.pathname, tenantId) ? platformFile : null;
  } catch {
    return null;
  }
}

export function downloadFilename(pathname: string) {
  return safeFilename(pathname.split("/").pop() || "documento");
}
