import ReceitasConstitucionaisClient from "./ReceitasConstitucionaisClient";
import { getConstitutionalRulesAction, getExceptionQueueAction } from "./regras-receitas-actions";

export default async function ReceitasConstitucionaisPage() {
  const rulesRes = await getConstitutionalRulesAction();
  const exceptionsRes = await getExceptionQueueAction();

  const rules = rulesRes.data || [];
  const exceptions = exceptionsRes.data || [];

  return (
    <ReceitasConstitucionaisClient
      initialRules={JSON.parse(JSON.stringify(rules))}
      initialExceptions={JSON.parse(JSON.stringify(exceptions))}
    />
  );
}
