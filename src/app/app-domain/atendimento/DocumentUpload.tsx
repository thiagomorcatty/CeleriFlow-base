"use client";

import { useState } from "react";

export default function DocumentUpload({ entityType, entityId }: { entityType: "ticket" | "ombudsman"; entityId: string }) {
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function upload(formData: FormData) {
    setUploading(true);
    setError("");
    const response = await fetch("/api/atendimento/upload", { method: "POST", body: formData });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error || "Nao foi possivel anexar o arquivo.");
      setUploading(false);
      return;
    }
    window.location.reload();
  }

  return <form action={upload} className="space-y-2">
    <input type="hidden" name="entityType" value={entityType} />
    <input type="hidden" name="entityId" value={entityId} />
    <input name="title" required placeholder="Titulo do documento" className="w-full p-2 border rounded-lg text-sm" />
    <div className="flex gap-2"><input name="documentType" defaultValue="Anexo" className="w-1/2 p-2 border rounded-lg text-sm" /><input name="purpose" placeholder="Finalidade" className="w-1/2 p-2 border rounded-lg text-sm" /></div>
    <input name="file" type="file" required className="w-full text-sm" />
    {error && <p className="text-sm text-red-600">{error}</p>}
    <button disabled={uploading} className="w-full p-2 border rounded-lg text-sm disabled:opacity-50">{uploading ? "Enviando..." : "Anexar via GED"}</button>
  </form>;
}
