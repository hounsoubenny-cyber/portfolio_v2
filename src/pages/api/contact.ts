import type { APIRoute } from 'astro';

// Cette route s'exécute côté serveur (pas pré-générée)
export const prerender = false;

// ─── Limites ────────────────────────────────────────────────────────────────
const MAX_BODY_BYTES = 12_000; // un message valide fait au plus ~5,5 Ko
const MAX = { name: 100, email: 254, subject: 200, message: 5000 } as const;

// Fallback si le binding Cloudflare CONTACT_LIMITER n'est pas configuré :
// 5 messages / 10 min / IP, par isolate (best-effort, voir wrangler.jsonc).
const FALLBACK_WINDOW_MS = 10 * 60 * 1000;
const FALLBACK_MAX_HITS = 5;
const fallbackHits = new Map<string, number[]>();

type RateLimiter = { limit(opts: { key: string }): Promise<{ success: boolean }> };

// ─── Helpers ────────────────────────────────────────────────────────────────
const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Les erreurs renvoyées au navigateur sont des codes génériques :
// les détails (clé API manquante, erreur Resend...) restent dans les logs serveur.
const json = (body: Record<string, unknown>, status = 200, extra: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extra },
  });

const isString = (v: unknown): v is string => typeof v === 'string';

/** Refuse les POST venant d'un autre site (spam cross-origin). Absence d'Origin = autorisé (curl, etc. restent limités par le rate limit). */
const isSameOrigin = (request: Request) => {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
};

const fallbackLimited = (key: string) => {
  const now = Date.now();
  const recent = (fallbackHits.get(key) ?? []).filter((t) => now - t < FALLBACK_WINDOW_MS);
  if (recent.length >= FALLBACK_MAX_HITS) {
    fallbackHits.set(key, recent);
    return true;
  }
  recent.push(now);
  fallbackHits.set(key, recent);
  if (fallbackHits.size > 1000) {
    // évite que la Map grossisse indéfiniment
    for (const [k, v] of fallbackHits) {
      if (v.every((t) => now - t >= FALLBACK_WINDOW_MS)) fallbackHits.delete(k);
    }
  }
  return false;
};

const isRateLimited = async (request: Request) => {
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  try {
    const { env } = await import('cloudflare:workers');
    const limiter = (env as unknown as { CONTACT_LIMITER?: RateLimiter }).CONTACT_LIMITER;
    if (limiter) {
      const { success } = await limiter.limit({ key: ip });
      return !success;
    }
  } catch (e) {
    console.error('Rate limiter indisponible, fallback mémoire :', e);
  }
  return fallbackLimited(ip);
};

// ─── Handler ────────────────────────────────────────────────────────────────
export const POST: APIRoute = async ({ request }) => {
  try {
    if (!isSameOrigin(request)) return json({ ok: false, error: 'forbidden' }, 403);

    if (!(request.headers.get('content-type') ?? '').includes('application/json')) {
      return json({ ok: false, error: 'invalid_request' }, 415);
    }

    if (await isRateLimited(request)) {
      return json({ ok: false, error: 'rate_limited' }, 429, { 'Retry-After': '60' });
    }

    // Lecture bornée du corps (on ne fait pas confiance à Content-Length seul)
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
      return json({ ok: false, error: 'too_long' }, 413);
    }

    let data: Record<string, unknown>;
    try {
      const parsed = JSON.parse(raw);
      if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error();
      data = parsed as Record<string, unknown>;
    } catch {
      return json({ ok: false, error: 'invalid_request' }, 400);
    }

    // 🍯 Honeypot : si ce champ caché est rempli, c'est un bot (on fait semblant d'avoir réussi)
    if (data.website) return json({ ok: true });

    const { name, email, subject, message } = data;

    // ✅ Validation côté serveur (types, présence, longueurs, format)
    if (![name, email, subject, message].every(isString)) {
      return json({ ok: false, error: 'missing_fields' }, 400);
    }
    const n = (name as string).trim();
    const e = (email as string).trim();
    const s = (subject as string).replace(/[\r\n]+/g, ' ').trim(); // pas de saut de ligne dans le sujet
    const m = (message as string).trim();

    if (!n || !e || !s || !m) return json({ ok: false, error: 'missing_fields' }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return json({ ok: false, error: 'invalid_email' }, 400);
    if (n.length > MAX.name || e.length > MAX.email || s.length > MAX.subject || m.length > MAX.message) {
      return json({ ok: false, error: 'too_long' }, 400);
    }

    // 📦 Imports dynamiques : si l'un plante, l'erreur est capturée plus bas
    const { Resend } = await import('resend');
    const { getSecret } = await import('astro:env/server');

    const apiKey = getSecret('RESEND_API_KEY');
    const toEmail = getSecret('CONTACT_TO_EMAIL');
    // Optionnel : une fois ton domaine vérifié sur Resend (ex. "Portfolio <contact@ton-domaine.com>")
    const fromEmail = getSecret('CONTACT_FROM_EMAIL') || 'Portfolio <onboarding@resend.dev>';

    if (!apiKey || !toEmail) {
      console.error('Config manquante :', { hasApiKey: Boolean(apiKey), hasToEmail: Boolean(toEmail) });
      return json({ ok: false, error: 'server_error' }, 500);
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: e,
      subject: `[Portfolio] ${s}`,
      html: `
        <h2>Nouveau message depuis ton portfolio</h2>
        <p><strong>Nom :</strong> ${escapeHtml(n)}</p>
        <p><strong>Email :</strong> ${escapeHtml(e)}</p>
        <p><strong>Sujet :</strong> ${escapeHtml(s)}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(m)}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return json({ ok: false, error: 'send_failed' }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error('Erreur /api/contact:', err);
    return json({ ok: false, error: 'server_error' }, 500);
  }
};
