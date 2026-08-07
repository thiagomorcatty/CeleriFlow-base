import type { PrismaClient } from "@prisma/client";

export const auditEventTypes = {
  sessionLogin: "SESSION_LOGIN",
  sessionLogout: "SESSION_LOGOUT",
  documentDownload: "DOCUMENT_DOWNLOAD",
  financialReportExport: "FINANCIAL_REPORT_EXPORT",
  pageView: "PAGE_VIEW",
  uiInteraction: "UI_INTERACTION",
  formSubmit: "FORM_SUBMIT",
} as const;

type AuditEventType = (typeof auditEventTypes)[keyof typeof auditEventTypes];

type AuditEventInput = {
  actorUsuarioId: string;
  eventType: AuditEventType;
  targetType: string;
  targetId: string;
};

// Deliberately persist only stable identifiers; request bodies, URLs, IPs, and report data are excluded.
export async function writeAuditEvent(prisma: PrismaClient, input: AuditEventInput) {
  await prisma.auditEvent.create({
    data: {
      actorUsuarioId: input.actorUsuarioId,
      eventType: input.eventType,
      targetType: input.targetType,
      targetId: input.targetId,
    },
  });
}
