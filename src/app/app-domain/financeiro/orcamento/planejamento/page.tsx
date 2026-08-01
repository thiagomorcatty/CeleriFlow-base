import { canEditModule, getTenantContextForModule, isSystemAdministrator } from "@/lib/platform/tenant-context";
import PlanejamentoClient from "./PlanejamentoClient";

export const dynamic = "force-dynamic";

export default async function PlanejamentoPage() {
  const context = await getTenantContextForModule("FINANCEIRO");
  const budgetUnitFilter = isSystemAdministrator(context.user)
    ? {}
    : { id: { in: context.user.allowedBudgetUnitIds } };
  const [plans, financialYears, budgetUnits, expenseNatures, resourceSources] = await Promise.all([
    context.prisma.multiYearPlan.findMany({
      include: {
        programs: { include: { actions: true }, orderBy: { code: "asc" } },
        budgetGuidelines: {
          include: {
            financialYear: { select: { year: true, status: true } },
            annualBudgetLaws: {
              include: {
                expenseFixations: {
                  include: {
                    appropriations: { select: { id: true, initialValue: true, initialValueDecimal: true, code: true, programPPA: { select: { code: true, name: true } }, actionPPA: { select: { code: true, name: true } } } },
                  },
                },
                cmdSchedules: { orderBy: { month: "asc" } },
                mbaTargets: { orderBy: { bimonth: "asc" } },
              },
            },
          },
        },
      },
      orderBy: { startYear: "desc" },
    }),
    context.prisma.financialYear.findMany({ select: { id: true, year: true, status: true }, orderBy: { year: "desc" } }),
    context.prisma.budgetUnit.findMany({ where: budgetUnitFilter, select: { id: true, code: true, name: true }, orderBy: { code: "asc" } }),
    context.prisma.expenseNature.findMany({ select: { id: true, code: true, name: true }, orderBy: { code: "asc" } }),
    context.prisma.resourceSource.findMany({ select: { id: true, code: true, name: true }, orderBy: { code: "asc" } }),
  ]);

  const budgetUnitById = new Map(budgetUnits.map((unit) => [unit.id, unit]));
  const fixations = plans.flatMap((plan) => plan.budgetGuidelines.flatMap((guideline) => guideline.annualBudgetLaws.flatMap((law) => law.expenseFixations.map((fixation) => {
    const allocated = fixation.appropriations.reduce((total, appropriation) => total + Number(appropriation.initialValueDecimal ?? appropriation.initialValue), 0);
    return {
      id: fixation.id,
      code: fixation.code,
      name: fixation.name,
      fixedValue: Number(fixation.fixedValue),
      allocatedValue: allocated,
      annualBudgetLaw: { lawNumber: law.lawNumber, financialYear: guideline.financialYear.year },
      plan: { code: plan.code, name: plan.name },
    };
  }))));

  return <PlanejamentoClient
    plans={plans.map((plan) => ({
      id: plan.id,
      code: plan.code,
      name: plan.name,
      startYear: plan.startYear,
      endYear: plan.endYear,
      programs: plan.programs.map((program) => ({ id: program.id, code: program.code, name: program.name, actions: program.actions.map((action) => ({ id: action.id, code: action.code, name: action.name })) })),
      guidelines: plan.budgetGuidelines.map((guideline) => ({
        id: guideline.id,
        financialYear: guideline.financialYear,
        laws: guideline.annualBudgetLaws.map((law) => ({
          id: law.id,
          lawNumber: law.lawNumber,
          publicationDate: law.publicationDate.toISOString(),
          cmdSchedules: law.cmdSchedules.map((schedule) => ({ id: schedule.id, month: schedule.month, limitValue: Number(schedule.limitValue), budgetUnit: budgetUnitById.get(schedule.budgetUnitId) ?? { code: "UG removida", name: "Unidade nao encontrada" } })),
          mbaTargets: law.mbaTargets.map((target) => ({ id: target.id, bimonth: target.bimonth, targetValue: Number(target.targetValue) })),
        })),
      })),
    }))}
    financialYears={financialYears}
    fixations={fixations}
    budgetUnits={budgetUnits}
    expenseNatures={expenseNatures}
    resourceSources={resourceSources}
    canEdit={canEditModule(context.user, "FINANCEIRO")}
  />;
}
