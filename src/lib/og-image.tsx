// src/lib/og-image.tsx
import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function renderOgImage(eyebrow: string, title: string, tags: string[]) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        backgroundColor: "#09090b",
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(59,130,246,0.35), transparent 55%)",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#60a5fa",
          fontWeight: 600,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 24,
                color: "#a1a1aa",
                border: "1px solid #3f3f46",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#71717a" }}>
        Ishara Dhanushan · ishara-dhanushan.github.io
      </div>
    </div>,
    { ...ogImageSize }
  );
}
