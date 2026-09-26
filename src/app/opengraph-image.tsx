// src/app/opengraph-image.tsx
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ishara Dhanushan — Software Engineer";

export default function Image() {
  return renderOgImage(
    "Software Engineer · Full-Stack Development",
    "Ishara Dhanushan",
    ["Next.js", "React", "Node.js", "TypeScript"]
  );
}
