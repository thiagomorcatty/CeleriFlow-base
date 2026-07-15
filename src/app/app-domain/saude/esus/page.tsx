import React from 'react';
import { Activity } from 'lucide-react';

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Activity className="h-6 w-6 text-emerald-600" />
        Integração e-SUS
      </h1>
      
      <div className="bg-white p-6 rounded shadow flex flex-col gap-4">
        <p className="text-gray-500">Ferramenta para exportação de arquivos no formato Thrift para o e-SUS APS.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-fit">Gerar Lote e-SUS</button>
      </div>
    
    </div>
  );
}