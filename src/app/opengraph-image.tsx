import { ImageResponse } from "next/og";

export const alt = "CeleriFlow: gestão pública integrada em nuvem";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#020617",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#0f766e",
            borderRadius: "999px",
            display: "flex",
            height: "280px",
            opacity: 0.28,
            position: "absolute",
            right: "-90px",
            top: "-90px",
            width: "280px",
          }}
        />
        <div style={{ color: "#5eead4", display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 3 }}>
          CELERIFLOW
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "920px" }}>
          <div style={{ display: "flex", fontSize: 74, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>
            Gestão pública integrada em nuvem
          </div>
          <div style={{ color: "#cbd5e1", display: "flex", fontSize: 32, lineHeight: 1.35, marginTop: 28 }}>
            Processos ágeis, decisões seguras e dados confiáveis.
          </div>
        </div>
        <div style={{ color: "#93c5fd", display: "flex", fontSize: 24 }}>
          5 camadas funcionais • 28 módulos • Implantação assistida
        </div>
      </div>
    ),
    size
  );
}
