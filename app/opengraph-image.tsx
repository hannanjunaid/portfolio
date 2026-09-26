import { ImageResponse } from "next/og";
import { site, siteTitle } from "@/lib/site";

export const alt = siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 80, background: "#171717", color: "#fafafa" }}>
      <div style={{ fontSize: 28, color: "#a1a1aa", marginBottom: 32 }}>PORTFOLIO</div>
      <div style={{ fontSize: 80, fontWeight: 700 }}>{site.name}</div>
      <div style={{ fontSize: 40, marginTop: 24 }}>{site.role}</div>
    </div>,
    size,
  );
}
