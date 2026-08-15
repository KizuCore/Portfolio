import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

function manualChunks(id: string) {
  if (!id.includes("node_modules")) {
    return undefined;
  }

  if (id.includes("react-pdf") || id.includes("pdfjs-dist")) {
    return "vendor-pdf";
  }

  if (id.includes("tsparticles") || id.includes("@tsparticles")) {
    return "vendor-particles";
  }

  if (id.includes("framer-motion") || id.includes("motion") || id.includes("motion-plus")) {
    return "vendor-motion";
  }

  if (id.includes("react-router") || id.includes("react-helmet-async") || id.includes("react-i18next")) {
    return "vendor-react";
  }

  if (id.includes("i18next")) {
    return "vendor-i18n";
  }

  if (id.includes("react-bootstrap")) {
    return "vendor-react";
  }

  if (id.includes("bootstrap")) {
    return "vendor-ui";
  }

  if (id.includes("@react-icons") || id.includes("react-icons")) {
    return "vendor-icons";
  }

  if (id.includes("react") || id.includes("scheduler")) {
    return "vendor-react";
  }

  return undefined;
}

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
  resolve: {
    alias: {
      "@image": path.resolve(__dirname, "src/assets/images"),
      "@style": path.resolve(__dirname, "src/assets/styles"),
      "@styleHome": path.resolve(__dirname, "src/assets/styles/Home"),
      "@pdf": path.resolve(__dirname, "src/assets/pdf"),
      "@sound": path.resolve(__dirname, "src/assets/sound"),
      "@component": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@media": path.resolve(__dirname, "src/assets/media"),
    },
  },
});
