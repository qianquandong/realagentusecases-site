import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt =
  "Agent 101 · Episode 02 — Multi-agent and Skills · One agent isn't enough";
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
          <div>EPISODE 02</div>
          <div>·</div>
          <div>2026.05.17</div>
        </div>

        {/* Main headline */}
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
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
              <div>One</div>
              <div style={{ color: "#2d5e44" }}>Agent</div>
              <div>isn&rsquo;t</div>
            </div>
            <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
              <div>enough for</div>
              <div style={{ color: "#2d5e44" }}>real work.</div>
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
            Multi-agent &amp; Skills · 6 real workflows · Decision tree.
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
          <div>REALAGENTUSECASES.COM / AGENT-101 / EP-02</div>
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
