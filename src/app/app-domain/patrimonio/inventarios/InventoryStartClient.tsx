"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createInventorySessionAction } from "./actions";

export function InventoryStartClient({ warehouses }: { warehouses: Array<{ id: string; name: string }> }) {
  const router = useRouter();
  const [warehouseId, setWarehouseId] = useState("");
  const [message, setMessage] = useState<string>();
  const [pending, startTransition] = useTransition();

  function start() {
    setMessage(undefined);
    startTransition(async () => {
      const result = await createInventorySessionAction({ warehouseId });
      setMessage(result.error ?? result.message);
      if (!result.error) router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="grid gap-1 text-sm font-medium">
        Almoxarifado
        <select value={warehouseId} onChange={(event) => setWarehouseId(event.target.value)} className="h-10 min-w-64 rounded-md border bg-white px-3">
          <option value="">Selecione</option>
          {warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
        </select>
      </label>
      <button type="button" onClick={start} disabled={pending || !warehouseId} className="h-10 rounded-md bg-amber-600 px-4 text-sm font-medium text-white disabled:opacity-50">
        {pending ? "Iniciando..." : "Iniciar inventário"}
      </button>
      {message && <p className="basis-full text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
