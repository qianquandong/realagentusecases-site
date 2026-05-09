import { ImageResponse } from "next/og";

export const alt = "Jack Qian — Field Reports on AI Agents";
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
          padding: "80px",
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}
      >
        <div style={{ fontSize: 24, color: "#a3a3a3", letterSpacing: 2 }}>
          jackqian.com
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Field Reports on AI Agents.
          </div>
          <div style={{ fontSize: 28, marginTop: 28, color: "#a3a3a3" }}>
            How working professionals actually use AI. Free, weekly.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            width: 16,
            height: 16,
            background: "#2d5e44",
            borderRadius: 999,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
