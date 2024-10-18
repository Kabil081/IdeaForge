import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shadcn/ui': path.resolve(__dirname, 'node_modules/@shadcn/ui'),
    },
  },
  define: {
    'process.env': process.env,
  },
});
