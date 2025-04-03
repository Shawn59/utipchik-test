import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import sass from 'sass';

const __filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filePath);

const additionalData = `@use "${path.resolve(__dirname, './src/styles/varibles.scss')}" as *;`;

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@atoms': path.resolve(__dirname, 'src/_atoms'),
      '@components': path.resolve(__dirname, 'src/_components'),
      '@molecules': path.resolve(__dirname, 'src/_molecules'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
  },

  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        /*additionalData: `@import 'src/styles/mixins.scss'; @import 'src/styles/varibles.scss';`,*/
        additionalData: additionalData,
      },
    },
  },
});
