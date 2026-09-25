import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Base path for GitHub Pages: a project page is served from
// https://<user>.github.io/<repo>/, so the production build needs that
// repo name as its base. Locally (`npm run dev` / a plain `npm run build`)
// this stays "/". CI sets VITE_BASE_PATH to "/<repo-name>/" — see
// .github/workflows/deploy.yml. If you rename the GitHub repo, update the
// workflow's BASE_PATH (or just override VITE_BASE_PATH when building).
const basePath = process.env.VITE_BASE_PATH || "/";

// https://vite.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [react()],
});
