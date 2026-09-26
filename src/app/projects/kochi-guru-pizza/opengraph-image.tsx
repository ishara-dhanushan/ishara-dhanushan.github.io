// src/app/projects/kochi-guru-pizza/opengraph-image.tsx
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Kochi Guru Pizza Case Study";

export default function Image() {
  return renderOgImage(
    "Case Study · Full-Stack Client Project",
    "Kochi Guru Pizza",
    ["Next.js", "Express.js", "MongoDB", "JWT"]
  );
}
