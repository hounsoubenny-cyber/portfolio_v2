import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// ⚠️ A remplace par mon vrai domaine une fois déployé (Vercel/Render/Cloudflare...).
// Nécessaire pour que le sitemap et les URLs canoniques/OG soient corrects.

const SITE_URL = 'https://myportfolio.hounsoubenny.workers.dev/';

export default defineConfig({
  site: SITE_URL,
  srcDir: './src',
  outDir: './dist',
  publicDir: './public',
  integrations: [sitemap()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    }
  }
});
