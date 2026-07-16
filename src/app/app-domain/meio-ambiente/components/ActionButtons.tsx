"use client";

import { useState } from "react";
import { Pencil, Trash, X } from "lucide-react";

export function ActionButtons({ requireJustification = false }: { requireJustification?: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [justification, setJustification] = useState("");

  const handleInactivateClick = () => {
    if (requireJustification) {
      setIsModalOpen(true);
    } else {
      if (confirm("Tem certeza que deseja inativar/excluir?")) {
        alert("Ação realizada com sucesso!");
      }
    }
  };

  const handleConfirmInactivate = () => {
    if (justification.trim() === "") {
      alert("A justificativa é obrigatória.");
      return;
    }
    alert("Inativado com sucesso! Justificativa: " + justification);
    setIsModalOpen(false);
    setJustification("");
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Editar">
          <Pencil className="w-4 h-4" />
        </button>
        <button onClick={handleInactivateClick} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Inativar/Excluir">
          <Trash className="w-4 h-4" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Inativar Registro</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4 text-left">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Por favor, informe a justificativa para inativar este registro. Esta ação ficará registrada no histórico.
              </p>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Digite a justificativa detalhada..."
                className="w-full p-3 border rounded-lg text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2 bg-gray-50 dark:bg-gray-800/50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmInactivate}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Confirmar Inativação
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
