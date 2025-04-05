import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  minify: true,
  platform: 'neutral',
  format: 'esm',
  target: 'ESNext',
  clean: true,
})
