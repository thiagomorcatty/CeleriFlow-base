import "dotenv/config";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { auditEventTypes, writeAuditEvent } from "../src/lib/platform/audit-evidence.ts";
import { prisma } from "../src/lib/prisma.ts";

test("persists payload-free audit evidence with only actor, event, and target identifiers", async () => {
  let data: unknown;
  const prisma = {
    auditEvent: {
      create: async ({ data: receivedData }: { data: unknown }) => {
        data = receivedData;
      },
    },
  } as never;

  await writeAuditEvent(prisma, {
    actorUsuarioId: "user-1",
    eventType: auditEventTypes.documentDownload,
    targetType: "DOCUMENT",
    targetId: "document-1",
  });

  assert.deepEqual(data, {
    actorUsuarioId: "user-1",
    eventType: "DOCUMENT_DOWNLOAD",
    targetType: "DOCUMENT",
    targetId: "document-1",
  });
});

test("defines the Group A session, download, and finance-export event types", () => {
  assert.deepEqual(Object.values(auditEventTypes), [
    "SESSION_LOGIN",
    "SESSION_LOGOUT",
    "DOCUMENT_DOWNLOAD",
    "FINANCIAL_REPORT_EXPORT",
  ]);
});

test("migration protects audit evidence from mutation and indexes retention queries", async () => {
  const migration = await readFile(
    new URL("../prisma/migrations/20260802130000_add_audit_evidence_events/migration.sql", import.meta.url),
    "utf8",
  );

  assert.match(migration, /ON DELETE RESTRICT ON UPDATE CASCADE/);
  assert.match(migration, /CREATE INDEX "AuditEvent_createdAt_idx"/);
  assert.match(migration, /CREATE INDEX "AuditEvent_actorUsuarioId_createdAt_idx"/);
  assert.match(migration, /BEFORE UPDATE OR DELETE ON "AuditEvent"/);
});

test("database rejects mutation of audit evidence", async () => {
  const actor = await prisma.usuario.findFirst({ select: { id: true } });
  assert.ok(actor, "A test actor is required to verify the audit foreign key.");

  await assert.rejects(
    prisma.$transaction(async (tx) => {
      const event = await tx.auditEvent.create({
        data: {
          actorUsuarioId: actor.id,
          eventType: auditEventTypes.sessionLogin,
          targetType: "SESSION",
          targetId: actor.id,
        },
      });
      await tx.auditEvent.update({
        where: { id: event.id },
        data: { eventType: auditEventTypes.sessionLogout },
      });
    }),
    /append-only/,
  );
});
