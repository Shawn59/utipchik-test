import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filePath);

//const additionalData = `@use "${path.resolve(__dirname, './src/styles/varibles.scss')}" as *;`;

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@atoms': path.resolve(__dirname, 'src/_atoms'),
      '@components': path.resolve(__dirname, 'src/_components'),
      '@molecules': path.resolve(__dirname, 'src/_molecules'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@apiMoke': path.resolve(__dirname, 'src/api-moke'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
    },
  },

  plugins: [react()],
  css: {
    preprocessorOptions: {
      // какие-то проблемы конфликтующие связанные с подключением url  у vite v1.5.4 (и выше по версии) и sass, поэтому подключаем api: 'legacy'
      scss: {
        /*additionalData: `@import 'src/styles/mixins.scss'; @import 'src/styles/varibles.scss';`,*/
        /*additionalData: additionalData,*/
        api: 'legacy', // or "modern", "legacy"
      },
    },
  },
});
