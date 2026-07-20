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

export function validateUpload(file: File) {
  if (!file.name || file.size === 0) throw new Error("Selecione um arquivo valido.");
  if (file.size > MAX_FILE_SIZE_BYTES) throw new Error("O arquivo deve ter no maximo 20 MB.");
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
