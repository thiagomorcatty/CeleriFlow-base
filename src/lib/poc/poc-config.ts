export interface PocConfig {
  enabled: boolean;
  environmentName: string;
  watermarkText: string;
  notificationSandbox: boolean;
  lastResetAt: string | null;
}

// The São João do Ivaí demonstration uses only this external test bank.
export const pocVirtualBank = {
  name: "001 - Banco Virtual Robonuvem",
  agency: "0001",
  accountNumbers: ["10001-0", "20001-1", "90001-4"],
  baseUrl: "https://banco-virtual-robonuvem.vercel.app/api/bank",
} as const;

export function isPocVirtualBank(bankName: string | null | undefined) {
  return bankName === pocVirtualBank.name;
}

export function isPocVirtualBankAccount(accountNumber: string | null | undefined) {
  return Boolean(accountNumber && pocVirtualBank.accountNumbers.includes(accountNumber as (typeof pocVirtualBank.accountNumbers)[number]));
}

export const defaultPocConfig: PocConfig = {
  enabled: true,
  environmentName: "Demonstração & POC",
  watermarkText: "DOCUMENTO DE DEMONSTRAÇÃO - CELERIFLOW POC",
  notificationSandbox: true,
  lastResetAt: null,
};

export function isPocModeEnabled(): boolean {
  return process.env.NEXT_PUBLIC_POC_MODE === "true" || process.env.NODE_ENV !== "production";
}
