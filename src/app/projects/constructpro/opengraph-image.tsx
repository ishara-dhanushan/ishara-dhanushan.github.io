// src/app/projects/constructpro/opengraph-image.tsx
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "ConstructPro ERP Case Study";

export default function Image() {
  return renderOgImage(
    "Case Study · ERP / Full-Stack Engineering",
    "ConstructPro ERP",
    ["NestJS", "PostgreSQL", "Prisma", "Docker"]
  );
}
