import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/lib/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/__tests__/**',
        'src/test/**',
        'src/lib/test/**',
        'src/types/**',
        'src/components/ui/**',
        'src/middleware.ts',
        'src/data/seedContent.ts',
        'src/lib/data.ts',
        '.next/**',
        'next.config.mjs',
        'postcss.config.mjs',
        'tailwind.config.ts'
      ]
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
      'next/navigation': path.resolve(__dirname, './src/lib/test/next-navigation-mock.ts')
    }
  },
})
