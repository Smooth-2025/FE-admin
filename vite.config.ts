import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@emotion'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@fonts': path.resolve(__dirname, './src/assets/fonts'),
      '@api': path.resolve(__dirname, './src/shared/api'),
      '@components': path.resolve(__dirname, './src/shared/components'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@store': path.resolve(__dirname, './src/shared/store'),
      '@styles': path.resolve(__dirname, './src/shared/styles'),
      '@utils': path.resolve(__dirname, './src/shared/utils'),
      '@login': path.resolve(__dirname, '/src/pages/login'),
      '@pothole': path.resolve(__dirname, './src/pages/pothole'),
      '@report': path.resolve(__dirname, './src/pages/report'),
      '@notfound': path.resolve(__dirname, './src/pages/notfound'),
    },
  },
});
