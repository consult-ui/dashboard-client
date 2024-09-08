import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    sourcemap: true,
    cssMinify: true,
    cssCodeSplit: true,
    minify: true,
    modulePreload: true,
  },
});
