type FinancialReportAccessUser = {
  role: string;
  permissions?: string | null;
};

const SYSTEM_ADMINISTRATOR_ROLE = "Administrador";

function parsePermissions(value: string | null | undefined) {
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null;
  } catch {
    return null;
  }
}

export function canIssueFinancialReports(user: FinancialReportAccessUser) {
  const permissions = parsePermissions(user.permissions);
  if (user.role === SYSTEM_ADMINISTRATOR_ROLE && permissions?.acesso === "total") return true;

  const modules = permissions?.modules;
  if (!modules || typeof modules !== "object" || Array.isArray(modules)) return false;
  const financeiro = (modules as Record<string, unknown>).FINANCEIRO;
  if (!financeiro || typeof financeiro !== "object" || Array.isArray(financeiro)) return false;

  const permission = financeiro as Record<string, unknown>;
  return permission.blocked !== true
    && permission.issueReports === true
    && (permission.create === true || permission.update === true || permission.delete === true);
}
