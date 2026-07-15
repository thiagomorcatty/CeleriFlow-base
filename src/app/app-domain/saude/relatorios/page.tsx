import React from 'react';
import { FileText } from 'lucide-react';

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FileText className="h-6 w-6 text-emerald-600" />
        Relatórios Básicos
      </h1>
      
      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-500">Módulo de relatórios em desenvolvimento. Em breve você poderá exportar estatísticas de atendimentos, dispensação e vacinação em PDF e Excel.</p>
      </div>
    
    </div>
  );
}