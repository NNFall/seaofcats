// @ts-check
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nnfall.github.io',
  base: '/seaofcats',
  output: 'static',
  integrations: [react(), sitemap()],
  server: {
    host: '127.0.0.1',
    port: 4327,
  },
  vite: {
    server: {
      strictPort: true,
    },
    preview: {
      host: '127.0.0.1',
      port: 4327,
      strictPort: true,
    },
  },
});
