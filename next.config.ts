import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a self-contained .next/standalone/server.js — the entry point
  // Hostinger's Node.js App hosting (or any generic Node host) needs to run
  // this app, since it doesn't rely on `next start` or the full node_modules tree.
  output: "standalone",
};

export default nextConfig;
