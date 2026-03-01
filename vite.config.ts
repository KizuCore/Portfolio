import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; 

function asyncEntryCss() {
  return {
    name: 'async-entry-css',
    apply: 'build' as const,
    enforce: 'post' as const,
    transformIndexHtml(html: string) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
        (_match, href: string) =>
          `<link rel="preload" as="style" href="${href}" crossorigin>` +
          `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'" crossorigin>` +
          `<noscript><link rel="stylesheet" href="${href}" crossorigin></noscript>`
      );
    }
  };
}

export default defineConfig({
  plugins: [react(), asyncEntryCss()],
  build: {
    sourcemap: false,
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
