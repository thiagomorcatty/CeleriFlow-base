import { Prisma, type PrismaClient } from "@prisma/client";
import { FinanceActor, FinanceError } from "./index";

type Db = PrismaClient | Prisma.TransactionClient;

export type RetentionType = "INSS" | "IR" | "ISS" | "SEST" | "SENAT" | "SENAR" | "RAT";

export type RetentionRuleInput = {
  type: RetentionType;
  description: string;
  calculationBasePercentage: number; // ex: 100% ou 20%
  ratePercentage: number; // ex: 11% INSS, 1.5% IR
  active: boolean;
};

// Motor de cálculo de retenções
export function calculateRetentions(
  grossValue: Prisma.Decimal | number,
  rules: { type: RetentionType; calculationBasePercentage: number; ratePercentage: number }[],
) {
  const gross = new Prisma.Decimal(grossValue);

  return rules.map((rule) => {
    const base = gross.mul(rule.calculationBasePercentage).div(100);
    const retainedValue = base.mul(rule.ratePercentage).div(100).toDecimalPlaces(2);

    return {
      type: rule.type,
      baseValue: base.toDecimalPlaces(2),
      retainedValue,
      ratePercentage: rule.ratePercentage,
    };
  });
}

export async function getActiveRetentionRules(tx: Db) {
  // Regras de retenção tributárias municipais e federais padrão
  return [
    { type: "INSS" as RetentionType, description: "Retenção INSS Serviços (11%)", calculationBasePercentage: 100, ratePercentage: 11.0 },
    { type: "IR" as RetentionType, description: "Retenção Imposto de Renda (1.5%)", calculationBasePercentage: 100, ratePercentage: 1.5 },
    { type: "ISS" as RetentionType, description: "Retenção ISSQN Municipal (5%)", calculationBasePercentage: 100, ratePercentage: 5.0 },
    { type: "SEST" as RetentionType, description: "Retenção SEST (1.5%)", calculationBasePercentage: 100, ratePercentage: 1.5 },
    { type: "SENAT" as RetentionType, description: "Retenção SENAT (1.0%)", calculationBasePercentage: 100, ratePercentage: 1.0 },
  ];
}
