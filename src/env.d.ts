/// <reference types="astro/client" />

// Types minimaux pour le module virtuel fourni par le runtime Cloudflare Workers
// (utilisé dans src/pages/api/contact.ts pour accéder au binding CONTACT_LIMITER).
declare module 'cloudflare:workers' {
  export const env: Record<string, unknown>;
}
