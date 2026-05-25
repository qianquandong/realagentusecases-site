import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt =
  "Agent 101 · Episode 01 — «Agent» means three different things to three different people";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          color: "#f2f2f2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "70px 80px",
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}
      >
        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 22,
            color: "#a3a3a3",
            letterSpacing: 3,
          }}
        >
          <div style={{ color: "#2d5e44" }}>AGENT 101</div>
          <div>·</div>
          <div>EPISODE 01</div>
          <div>·</div>
          <div>2026.03.17</div>
        </div>

        {/* Main headline — pushed near vertical center via auto margin */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
              <div style={{ color: "#2d5e44" }}>«Agent»</div>
              <div>means</div>
            </div>
            <div>three different things</div>
            <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
              <div>to</div>
              <div style={{ color: "#2d5e44" }}>three different people.</div>
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              marginTop: 36,
              fontSize: 26,
              color: "#a3a3a3",
              lineHeight: 1.4,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            90 min · 9 real workflows · The no-bullshit edition.
          </div>
        </div>

        {/* Bottom: brand mark */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 60,
            fontSize: 22,
            color: "#a3a3a3",
            letterSpacing: 2,
          }}
        >
          <div>REALAGENTUSECASES.COM / AGENT-101</div>
          <div
            style={{
              width: 16,
              height: 16,
              background: "#2d5e44",
              borderRadius: 999,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
