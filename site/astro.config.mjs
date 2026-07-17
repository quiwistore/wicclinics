import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://wicclinics.com',
  outDir: '../dist',
  build: { format: 'directory', inlineStylesheets: 'always' }
});
