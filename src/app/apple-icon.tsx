import { ImageResponse } from "next/og";
import { LogoMark } from "./components/Layout/logo";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon: the mark on a full-bleed tile (iOS rounds the corners itself). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#16161a" }}>
        <LogoMark tile="#16161a" size={180} />
      </div>
    ),
    size,
  );
}
