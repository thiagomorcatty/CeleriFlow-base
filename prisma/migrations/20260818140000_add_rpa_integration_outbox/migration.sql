CREATE TABLE "RpaIntegrationOperation" (
  "id" TEXT NOT NULL,
  "sourceType" TEXT NOT NULL,
  "sourceId" TEXT NOT NULL,
  "batchId" TEXT NOT NULL,
  "sourceEventId" TEXT NOT NULL,
  "operationId" TEXT NOT NULL,
  "municipalityId" TEXT NOT NULL,
  "sourceEventType" TEXT NOT NULL,
  "operationType" TEXT NOT NULL,
  "deliveryStatus" TEXT NOT NULL DEFAULT 'PENDENTE_ENVIO',
  "rpaStatus" TEXT,
  "payload" JSONB NOT NULL,
  "payloadHash" TEXT NOT NULL,
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "lastAttemptAt" TIMESTAMP(3),
  "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "centralAcceptedAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "lastError" TEXT,
  "resultPayload" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "RpaIntegrationOperation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "RpaIntegrationOperation_batchId_key" ON "RpaIntegrationOperation"("batchId");
CREATE UNIQUE INDEX "RpaIntegrationOperation_sourceEventId_key" ON "RpaIntegrationOperation"("sourceEventId");
CREATE UNIQUE INDEX "RpaIntegrationOperation_operationId_key" ON "RpaIntegrationOperation"("operationId");
CREATE UNIQUE INDEX "RpaIntegrationOperation_sourceType_sourceId_key" ON "RpaIntegrationOperation"("sourceType", "sourceId");
CREATE INDEX "RpaIntegrationOperation_deliveryStatus_nextAttemptAt_idx" ON "RpaIntegrationOperation"("deliveryStatus", "nextAttemptAt");
CREATE INDEX "RpaIntegrationOperation_rpaStatus_completedAt_idx" ON "RpaIntegrationOperation"("rpaStatus", "completedAt");
