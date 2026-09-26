// src/app/projects/fuelwise/opengraph-image.tsx
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "FuelWise.lk Case Study";

export default function Image() {
  return renderOgImage("Case Study · Web & Mobile", "FuelWise.lk", [
    "Spring Boot",
    "React",
    "Flutter",
    "MySQL",
  ]);
}
