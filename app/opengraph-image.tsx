import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CollectionatApp — Dile adiós a Excel. Centraliza tu empresa.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at request time with next/og — no static asset to keep in sync with the copy. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#f8fafc",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(8,145,178,0.18) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(245,158,11,0.16) 0%, transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              height: 64,
              width: 64,
              borderRadius: 18,
              backgroundColor: "#0891b2",
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
            Collectionat
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 900,
            color: "#0f172a",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          Dile adiós a Excel. Centraliza tu empresa.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#475569", marginTop: 28, maxWidth: 900 }}>
          Gestión todo en uno, integrada de forma nativa con Microsoft 365.
        </div>
      </div>
    ),
    { ...size },
  );
}
