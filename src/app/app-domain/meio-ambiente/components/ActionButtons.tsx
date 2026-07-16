"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash, Loader2 } from "lucide-react";

interface ActionButtonsProps {
  id: string;
  onDelete: (id: string) => Promise<{ success?: boolean; error?: string }>;
  onEdit?: () => void;
  deleteLabel?: string;
}

export function ActionButtons({
  id,
  onDelete,
  onEdit,
  deleteLabel = "Excluir",
}: ActionButtonsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleDelete = () => {
    if (!confirm("Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.")) return;
    setError("");
    startTransition(async () => {
      const result = await onDelete(id);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="flex justify-end gap-2 items-center">
      {error && (
        <span className="text-xs text-red-600 max-w-[140px] text-right">{error}</span>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
          title="Editar"
          type="button"
        >
          <Pencil className="w-4 h-4" />
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        title={deleteLabel}
        type="button"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

