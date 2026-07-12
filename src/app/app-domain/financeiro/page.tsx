import { getFinanceiroDashboardStats } from "./dashboard-actions"
import FinanceiroDashboardClient from "./FinanceiroDashboardClient"

export default async function FinanceiroDashboard() {
  const currentYear = new Date().getFullYear().toString()
  const initialStats = await getFinanceiroDashboardStats("", currentYear)

  return <FinanceiroDashboardClient initialStats={initialStats} />
}
