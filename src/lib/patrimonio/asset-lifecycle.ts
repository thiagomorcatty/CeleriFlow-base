import { Prisma, type PrismaClient } from "@prisma/client";

export class AssetLifecycleError extends Error {}

export type DepreciationInput = {
  acquisitionValue: number;
  bookValue: number;
  lifeSpanMonths: number;
  periodNumber: number;
};

export type AssetDisposalInput = {
  assetId: string;
  date: Date;
  type: "Baixa" | "Alienação";
  reason: string;
  justification: string;
  disposalValue?: number;
};

function roundCurrency(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function normalizeReferenceMonth(value: Date) {
  if (Number.isNaN(value.valueOf())) throw new AssetLifecycleError("Competência de depreciação inválida.");
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), 1, 12));
}

export function calculateStraightLineDepreciation(input: DepreciationInput) {
  if (!Number.isFinite(input.acquisitionValue) || input.acquisitionValue < 0) {
    throw new AssetLifecycleError("O valor de aquisição do bem é inválido.");
  }
  if (!Number.isFinite(input.bookValue) || input.bookValue < 0) {
    throw new AssetLifecycleError("O valor contábil do bem é inválido.");
  }
  if (!Number.isInteger(input.lifeSpanMonths) || input.lifeSpanMonths <= 0) {
    throw new AssetLifecycleError("A categoria do bem deve ter vida útil em meses maior que zero.");
  }
  if (input.periodNumber < 1 || input.periodNumber > input.lifeSpanMonths) return 0;

  const regularInstallment = roundCurrency(input.acquisitionValue / input.lifeSpanMonths);
  const finalInstallment = roundCurrency(input.acquisitionValue - regularInstallment * (input.lifeSpanMonths - 1));
  const scheduledAmount = input.periodNumber === input.lifeSpanMonths ? finalInstallment : regularInstallment;
  return roundCurrency(Math.min(input.bookValue, scheduledAmount));
}

export function calculateAssetDisposal(bookValue: number, disposalValue: number) {
  if (!Number.isFinite(bookValue) || bookValue < 0 || !Number.isFinite(disposalValue) || disposalValue < 0) {
    throw new AssetLifecycleError("Os valores da baixa patrimonial são inválidos.");
  }
  const normalizedBookValue = roundCurrency(bookValue);
  const normalizedDisposalValue = roundCurrency(disposalValue);
  return {
    bookValue: normalizedBookValue,
    disposalValue: normalizedDisposalValue,
    gainLoss: roundCurrency(normalizedDisposalValue - normalizedBookValue),
  };
}

function depreciationPeriod(acquisitionDate: Date, referenceMonth: Date) {
  return (referenceMonth.getUTCFullYear() - acquisitionDate.getUTCFullYear()) * 12
    + referenceMonth.getUTCMonth() - acquisitionDate.getUTCMonth() + 1;
}

export async function depreciateAssetsForMonth(db: PrismaClient, referenceDate: Date) {
  const referenceMonth = normalizeReferenceMonth(referenceDate);
  const assets = await db.asset.findMany({
    where: { status: { not: "Baixado" } },
    select: {
      id: true,
      acquisitionDate: true,
      acquisitionValue: true,
      currentValue: true,
      category: { select: { lifeSpan: true } },
    },
  });

  let processed = 0;
  let skipped = 0;
  for (const asset of assets) {
    const periodNumber = depreciationPeriod(asset.acquisitionDate, referenceMonth);
    const depreciation = calculateStraightLineDepreciation({
      acquisitionValue: asset.acquisitionValue,
      bookValue: asset.currentValue,
      lifeSpanMonths: asset.category.lifeSpan,
      periodNumber,
    });
    if (depreciation === 0) {
      skipped += 1;
      continue;
    }

    try {
      const created = await db.$transaction(async (tx) => {
        const existing = await tx.assetValueHistory.findUnique({
          where: { assetId_referenceMonth: { assetId: asset.id, referenceMonth } },
          select: { id: true },
        });
        if (existing) return false;

        const futureHistory = await tx.assetValueHistory.findFirst({
          where: { assetId: asset.id, referenceMonth: { gt: referenceMonth } },
          select: { id: true },
        });
        if (futureHistory) return false;

        const currentAsset = await tx.asset.findUniqueOrThrow({
          where: { id: asset.id },
          select: { currentValue: true, status: true },
        });
        if (currentAsset.status === "Baixado") return false;

        const actualDepreciation = calculateStraightLineDepreciation({
          acquisitionValue: asset.acquisitionValue,
          bookValue: currentAsset.currentValue,
          lifeSpanMonths: asset.category.lifeSpan,
          periodNumber,
        });
        if (actualDepreciation === 0) return false;
        const closingValue = roundCurrency(currentAsset.currentValue - actualDepreciation);

        await tx.assetValueHistory.create({
          data: {
            assetId: asset.id,
            referenceMonth,
            openingValue: currentAsset.currentValue,
            depreciation: actualDepreciation,
            closingValue,
            lifeSpanMonths: asset.category.lifeSpan,
          },
        });
        await tx.asset.update({ where: { id: asset.id }, data: { currentValue: closingValue } });
        return true;
      });
      if (created) processed += 1;
      else skipped += 1;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        skipped += 1;
        continue;
      }
      throw error;
    }
  }
  return { referenceMonth, processed, skipped };
}

export async function recordAssetDisposal(db: PrismaClient, input: AssetDisposalInput) {
  if (!input.assetId.trim() || !input.reason.trim() || !input.justification.trim()) {
    throw new AssetLifecycleError("Bem, motivo e justificativa são obrigatórios.");
  }
  if (input.type !== "Baixa" && input.type !== "Alienação") {
    throw new AssetLifecycleError("Tipo de baixa patrimonial inválido.");
  }
  if (Number.isNaN(input.date.valueOf())) throw new AssetLifecycleError("Data da baixa inválida.");
  const disposalValue = roundCurrency(input.disposalValue ?? 0);
  if (!Number.isFinite(disposalValue) || disposalValue < 0) {
    throw new AssetLifecycleError("O valor de alienação deve ser maior ou igual a zero.");
  }
  if (input.type === "Baixa" && disposalValue !== 0) {
    throw new AssetLifecycleError("Baixa sem alienação não pode registrar valor recebido.");
  }

  return db.$transaction(async (tx) => {
    const asset = await tx.asset.findUnique({
      where: { id: input.assetId },
      select: { id: true, status: true, currentValue: true },
    });
    if (!asset) throw new AssetLifecycleError("Bem patrimonial não encontrado.");
    if (asset.status === "Baixado") throw new AssetLifecycleError("Este bem já foi baixado.");

    const existing = await tx.assetWriteOff.findFirst({ where: { assetId: asset.id }, select: { id: true } });
    if (existing) throw new AssetLifecycleError("Este bem já possui uma baixa registrada.");

    const calculation = calculateAssetDisposal(asset.currentValue, disposalValue);
    const writeOff = await tx.assetWriteOff.create({
      data: {
        assetId: asset.id,
        date: input.date,
        type: input.type,
        reason: input.reason.trim(),
        justification: input.justification.trim(),
        ...calculation,
      },
    });
    await tx.asset.update({ where: { id: asset.id }, data: { status: "Baixado" } });
    return writeOff;
  });
}
