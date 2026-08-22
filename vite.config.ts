import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Dev only — proxies API/SSE calls to the local backend so the browser
      // only ever talks to :5173, avoiding CORS entirely (prod goes through
      // vercel.json rewrites or same-origin serving, see main.py's SPA route).
      // The XPulse SSE stream lives under /app/xpulse/stream, so /app alone
      // already covers it — no separate proxy entry needed.
      "/app": { target: "http://localhost:8000", changeOrigin: true },
      "/ws": { target: "http://localhost:8000", changeOrigin: true, ws: true },
    },
  },
  build: {
    // "dist" (défaut Vite/Vercel), pas "../static/dist" comme dans le
    // monorepo xcore-team/Marketplace — là-bas le backend sert le build
    // depuis un dossier static/ frère de frontend/ (voir main.py), mais ce
    // repo autonome n'a pas cette arborescence : "../static/dist" écrivait
    // hors du checkout, Vercel ne trouvait aucun dossier "dist" ensuite.
    outDir: "dist",
    emptyOutDir: true,
  },
});
