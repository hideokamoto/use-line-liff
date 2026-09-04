import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'UseLineLiff',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@line/liff', '@line/liff-mock'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@line/liff': 'liff',
          '@line/liff-mock': 'LiffMockPlugin',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
