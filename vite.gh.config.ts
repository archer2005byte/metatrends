// Static client-only build for GitHub Pages.
// Usage: GITHUB_PAGES_BASE=/metatrends/ bunx vite build --config vite.gh.config.ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { consultingImplicationsPreview } from "./preview-consulting-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: process.env["GITHUB_PAGES_BASE"] || "/metatrends/",
  plugins: [
    consultingImplicationsPreview(),
    tsConfigPaths(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist-gh",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.gh.html"),
    },
  },
});
