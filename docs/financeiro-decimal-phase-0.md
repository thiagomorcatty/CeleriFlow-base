# Financial Decimal Phase 0

This phase adds nullable `Decimal(18,2)` shadow fields. Existing Float fields remain the compatibility source while each Decimal shadow is null. No Float field is removed or changed.

Apply the additive schema change and regenerate the client:

```bash
npx prisma db push
npm run finance:decimal:backfill
```

The backfill is idempotent. It only writes a Decimal field when that field is null, so rerunning it never overwrites a Decimal value set by another process.

Run the read-only reconciliation report at any time:

```bash
npm run finance:decimal:reconcile
```

The report has one row per Float/Decimal pair and includes `missing` Decimal values, `mismatched` Decimal values after two-decimal normalization, and `rounded` Float values that had precision beyond cents. `rounded` is informational: `Decimal(18,2)` necessarily rounds such source values.

Phase 0 fields:

- Financeiro: `BudgetAppropriation.initialValueDecimal`, `updatedValueDecimal`, `committedValueDecimal`; `Revenue.valueDecimal`; `Expense.valueDecimal`; `BudgetReservation.valueDecimal`; `Commitment.valueDecimal`; `Settlement.valueDecimal`; `Payment.valueDecimal`; `BankAccount.currentBalanceDecimal`; `BankReconciliation.systemBalanceDecimal`, `bankBalanceDecimal`; `AccountingEntry.valueDecimal`.
- Tributacao: `TaxAssessment.originalValueDecimal`; `TaxGuide.totalValueDecimal`; `TaxPayment.amountPaidDecimal`; `DebtInstallment.totalValueDecimal`, `downPaymentDecimal`; `ActiveDebt.originalValueDecimal`, `updatedValueDecimal`; `Infraction.penaltyValueDecimal`; `Invoice.serviceValueDecimal`, `deductionsDecimal`, `issValueDecimal`.
