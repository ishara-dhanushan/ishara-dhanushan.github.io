// src/utils/assetPrefix.ts
const isExportMode = process.env.NEXT_PUBLIC_IS_EXPORT === "true";
const isProduction = process.env.NODE_ENV === "production";

const prefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || "";

export const assetPrefix =
  isExportMode && isProduction
    ? prefix === "/"
      ? ""
      : prefix
    : "";
