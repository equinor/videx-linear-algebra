import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['test/**/*.test.ts'],
    reporters: ['default', 'junit'],
    outputFile: {
      junit: 'test-results/junit.xml',
    },
    coverage: {
      provider: 'v8',
      reporter: [['cobertura', { file: 'Cobertura.xml' }]],
      reportsDirectory: 'coverage',
    },
  },
});
