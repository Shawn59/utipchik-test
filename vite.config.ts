import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filePath);

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@atoms': path.resolve(__dirname, 'src/_atoms'), // Убедитесь, что путь правильный
    },
  },
  /*  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),

      /!* '@atoms': ['src/_atoms'],
      '@molecules': ['src/_molecules'],
      '@components': ['src/_components'],
      '@views': ['src/views'],
      '@utils': ['src/utils'],
      '@services': ['src/services'],
      '@api': ['src/api'],
      '@svg': ['src/_svg'],
      '@layouts': ['src/layouts'],
      '@interfaces': ['src/interfaces'],
      '@constants': ['src/constants'],
      '@hooks': ['src/hooks'],*!/
    },
  },*/
  plugins: [react()],
});
