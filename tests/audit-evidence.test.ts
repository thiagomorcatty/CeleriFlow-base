import "dotenv/config";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { auditEventTypes, writeAuditEvent } from "../src/lib/platform/audit-evidence.ts";
import { prisma } from "../src/lib/prisma.ts";
import { canEditModule, canShowDashboardCard, canUseInactiveModule, canViewModule, isModuleBlockedForUser, isSystemAdministrator } from "../src/lib/platform/tenant-context.ts";

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

test("defines authentication, protected-operation, and usage-monitoring event types", () => {
  assert.deepEqual(Object.values(auditEventTypes), [
    "SESSION_LOGIN",
    "SESSION_LOGOUT",
    "DOCUMENT_DOWNLOAD",
    "FINANCIAL_REPORT_EXPORT",
    "PAGE_VIEW",
    "UI_INTERACTION",
    "FORM_SUBMIT",
  ]);
});

test("limits audit-log consultation to system administrators with total access", () => {
  const administrator = {
    role: "Administrador",
    permissions: JSON.stringify({ acesso: "total" }),
  } as Parameters<typeof isSystemAdministrator>[0];
  const administratorWithoutTotalAccess = {
    role: "Administrador",
    permissions: JSON.stringify({ acesso: "restrito" }),
  } as Parameters<typeof isSystemAdministrator>[0];
  const nonAdministrator = {
    role: "Gestor",
    permissions: JSON.stringify({ acesso: "total" }),
  } as Parameters<typeof isSystemAdministrator>[0];

  assert.equal(isSystemAdministrator(administrator), true);
  assert.equal(isSystemAdministrator(administratorWithoutTotalAccess), false);
  assert.equal(isSystemAdministrator(nonAdministrator), false);
});

test("uses the same profile permissions for dashboard visibility and route access", () => {
  const profileAuthorized = {
    role: "Gestor",
    permissions: JSON.stringify({ modulosPermitidos: ["FINANCEIRO", "COMPRAS"] }),
    modulePermissions: [],
  } as Parameters<typeof canViewModule>[0];
  const explicitlyBlocked = {
    role: "Gestor",
    permissions: JSON.stringify({ modulosBloqueados: ["COMPRAS"] }),
    modulePermissions: [{ code: "COMPRAS", canView: true, canEdit: true }],
  } as Parameters<typeof canViewModule>[0];

  assert.equal(canViewModule(profileAuthorized, "COMPRAS"), true);
  assert.equal(canViewModule(explicitlyBlocked, "COMPRAS"), false);
});

test("applies dashboard visibility, blocking, and operational module permissions independently", () => {
  const profile = {
    role: "Gestor",
    permissions: JSON.stringify({
      acesso: "operacional",
      modules: {
        FINANCEIRO: { showDashboardCard: false, blocked: false, create: true, update: false, delete: false },
        COMPRAS: { showDashboardCard: true, blocked: true, view: true, create: true, update: true, delete: true },
      },
    }),
    modulePermissions: [],
  } as unknown as Parameters<typeof canViewModule>[0];

  assert.equal(canShowDashboardCard(profile, "FINANCEIRO"), false);
  assert.equal(canViewModule(profile, "FINANCEIRO"), true);
  assert.equal(canEditModule(profile, "FINANCEIRO"), true);
  assert.equal(canShowDashboardCard(profile, "COMPRAS"), true);
  assert.equal(isModuleBlockedForUser(profile, "COMPRAS"), true);
  assert.equal(canViewModule(profile, "COMPRAS"), false);
  assert.equal(canEditModule(profile, "COMPRAS"), false);
});

test("allows non-POC profiles to use modules released in their permission matrix", () => {
  const regularProfile = {
    role: "Gestor",
    permissions: JSON.stringify({ acesso: "operacional" }),
  } as Parameters<typeof canUseInactiveModule>[0];
  const pocEvaluator = {
    role: "POC Avaliador Técnico de TI",
    permissions: JSON.stringify({ acesso: "operacional" }),
  } as Parameters<typeof canUseInactiveModule>[0];

  assert.equal(canUseInactiveModule(regularProfile), true);
  assert.equal(canUseInactiveModule(pocEvaluator), false);
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
