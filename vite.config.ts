import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; 

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@image': path.resolve(__dirname, 'src/assets/images'),
      '@style': path.resolve(__dirname, 'src/assets/style'),
      '@styleHome': path.resolve(__dirname, 'src/assets/style/Home'),
      '@pdf': path.resolve(__dirname, 'src/assets/pdf'),
      '@sound': path.resolve(__dirname, 'src/assets/sound'),
      '@component': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@media': path.resolve(__dirname, 'src/assets/media'),
    }
  }
});
