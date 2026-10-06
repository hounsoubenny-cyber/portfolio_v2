import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// ⚠️ A remplacer par ton vrai domaine une fois déployé.
// Nécessaire pour que le sitemap et les URLs canoniques/OG soient corrects.

const SITE_URL = 'https://myportfolio.hounsoubenny.workers.dev/';

export default defineConfig({
  site: SITE_URL,
  srcDir: './src',
  outDir: './dist',
  publicDir: './public',

    // ☁️ Permet d'exécuter /api/contact côté serveur sur Cloudflare
    adapter: cloudflare(),

    integrations: [sitemap()],

    // 🔐 Variables d'environnement serveur (jamais envoyées au navigateur)
    env: {
      schema: {
        RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret' }),
      },
    },

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
