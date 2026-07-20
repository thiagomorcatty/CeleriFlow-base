import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";

function getEncryptionKey() {
  const value = process.env.PLATFORM_ENCRYPTION_KEY;
  if (!value) throw new Error("PLATFORM_ENCRYPTION_KEY nao configurada.");

  const key = Buffer.from(value, "base64");
  if (key.length !== 32) {
    throw new Error("PLATFORM_ENCRYPTION_KEY deve conter 32 bytes em Base64.");
  }

  return key;
}

export function encryptDatabaseUrl(databaseUrl: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(databaseUrl, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return [iv, authTag, encrypted].map((part) => part.toString("base64url")).join(".");
}

export function decryptDatabaseUrl(value: string) {
  const [ivValue, authTagValue, encryptedValue] = value.split(".");
  if (!ivValue || !authTagValue || !encryptedValue) {
    throw new Error("A URL de banco criptografada e invalida.");
  }

  const decipher = createDecipheriv(ALGORITHM, getEncryptionKey(), Buffer.from(ivValue, "base64url"));
  decipher.setAuthTag(Buffer.from(authTagValue, "base64url"));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedValue, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}
