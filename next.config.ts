import type { NextConfig } from "next";
import { assetPrefix } from "@/utils/assetPrefix";
const isProduction = process.env.NODE_ENV === "production";
const isExportMode = process.env.NEXT_PUBLIC_IS_EXPORT === "true";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  output: isExportMode ? "export" : undefined,

  // Only needed if deploying to https://<username>.github.io/<repo-name>/
  // Omit both if this repo is named <username>.github.io (root site)
  basePath: isProduction && assetPrefix ? assetPrefix : undefined,
  assetPrefix: isProduction && assetPrefix ? assetPrefix : undefined,

  images: {
    unoptimized: true, // required — no server to run image optimization
  },
};

export default nextConfig;
