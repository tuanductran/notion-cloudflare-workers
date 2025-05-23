import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'notion-api-worker',
  entry: ['src/index.ts'],
  platform: 'neutral',
  format: 'esm',
  target: 'ESNext',
  clean: true,
  outExtension: () => ({ js: '.js' }),
})
