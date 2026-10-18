import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5 utilise encore les imports Sass historiques.
        silenceDeprecations: ["import", "global-builtin", "color-functions", "if-function"],
        quietDeps: true,
      },
    },
  },
  build: {
    sourcemap: true,
    // Le manifeste permet de vérifier le poids initial et les dépendances différées.
    manifest: true,
    rollupOptions: {
      output: {
        // Groupe uniquement le socle React, sans y aspirer react-pdf ou react-github-calendar.
        manualChunks(id) {
          if (/\/node_modules\/(react|react-dom|scheduler)\//.test(id) || id.includes("commonjsHelpers")) {
            return "vendor-react";
          }
          if (/\/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id)) {
            return "vendor-motion";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      // Garde les imports entre fonctionnalités stables lorsque les fichiers changent de dossier.
      "@": path.resolve(__dirname, "src"),
      "@image": path.resolve(__dirname, "src/assets/images"),
      "@sound": path.resolve(__dirname, "src/assets/sound"),
      "@media": path.resolve(__dirname, "src/assets/media"),
    },
  },
});
