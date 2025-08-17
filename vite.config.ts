import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      all: true,
      exclude: [
        'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
        'src/tests/**',
        '**/types/**',
        '**/*.d.ts',
        'src/**/index.{js,jsx,ts,tsx}',
        'src/main.{js,jsx,ts,tsx}',
      ],
      extension: ['.ts', '.tsx'],
      include: ['src/**/*'],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 80,
        lines: 50,
        functions: 50,
        branches: 50,
      },
    },
    typecheck: {
      enabled: true,
      include: ['**/*.test-d.ts'],
    },
    css: {
      modules: { classNameStrategy: 'non-scoped' },
    },
    exclude: ['**/node_modules/**', '**/e2e/**'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    maxConcurrency: 4,
    setupFiles: ['./vitest.setup.mjs'],
    cache: { dir: './node_modules/.vite/.vitest-cache' },
  },
});
