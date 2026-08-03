export interface PocConfig {
  enabled: boolean;
  environmentName: string;
  watermarkText: string;
  notificationSandbox: boolean;
  lastResetAt: string | null;
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
