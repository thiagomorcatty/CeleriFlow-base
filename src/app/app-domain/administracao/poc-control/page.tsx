import { getPocDataMetricsAction } from "./actions";
import PocControlClient from "./PocControlClient";

export const dynamic = "force-dynamic";

export default async function PocControlPage() {
  const { counts = {} } = await getPocDataMetricsAction();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PocControlClient initialCounts={counts} />
    </div>
  );
}
