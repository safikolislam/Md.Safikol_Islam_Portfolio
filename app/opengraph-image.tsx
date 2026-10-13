import { ImageResponse } from "next/og";

export const alt = "Md. Safikol Islam, Full-stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "white",
          background: "linear-gradient(135deg, #05060d 0%, #1a1240 55%, #0a3a4a 100%)",
        }}
      >
        <div style={{ fontSize: 28, color: "#22d3ee", letterSpacing: 6, textTransform: "uppercase" }}>Portfolio</div>
        <div style={{ fontSize: 88, fontWeight: 800, marginTop: 16 }}>Md. Safikol Islam</div>
        <div style={{ fontSize: 40, marginTop: 12, color: "#c4b5fd" }}>Full-stack Web Developer</div>
        <div style={{ fontSize: 28, marginTop: 40, color: "#94a3b8" }}>
          Next.js · TypeScript · Node.js · Prisma · PostgreSQL · MongoDB
        </div>
      </div>
    ),
    size,
  );
}
