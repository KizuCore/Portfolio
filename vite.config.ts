import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; 

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (/node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) {
              return "vendor-react";
            }

            if (id.includes("react-pdf") || id.includes("pdfjs-dist")) {
              return "vendor-pdf";
            }

            if (id.includes("@tsparticles") || id.includes("tsparticles")) {
              return "vendor-particles";
            }

            if (id.includes("framer-motion") || id.includes("motion")) {
              return "vendor-motion";
            }

            return undefined;
          }

          return undefined;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@image': path.resolve(__dirname, 'src/assets/images'),
      '@style': path.resolve(__dirname, 'src/assets/styles'),
      '@styleHome': path.resolve(__dirname, 'src/assets/styles/Home'),
      '@pdf': path.resolve(__dirname, 'src/assets/pdf'),
      '@sound': path.resolve(__dirname, 'src/assets/sound'),
      '@component': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@media': path.resolve(__dirname, 'src/assets/media'),
    }
  }
});
