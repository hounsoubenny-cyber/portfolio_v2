import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Cette route s'exécute côté serveur (pas pré-générée)
export const prerender = false;

const escapeHtml = (s: string) =>
s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
.replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const json = (body: object, status = 200) =>
new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
});

export const POST: APIRoute = async ({ request }) => {
    try {
        const { name, email, subject, message, website } = await request.json();

        // 🍯 Honeypot : si ce champ caché est rempli, c'est un bot
        if (website) return json({ ok: true });

        // ✅ Validation côté serveur (ne jamais faire confiance au client)
        if (!name || !email || !subject || !message) {
            return json({ ok: false, error: 'missing_fields' }, 400);
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return json({ ok: false, error: 'invalid_email' }, 400);
        }
        if (name.length > 100 || subject.length > 200 || message.length > 5000) {
            return json({ ok: false, error: 'too_long' }, 400);
        }

        const resend = new Resend(import.meta.env.RESEND_API_KEY);

        const { error } = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: [import.meta.env.CONTACT_TO_EMAIL],
            replyTo: email, // 👈 tu cliques sur "Répondre" et ça va au visiteur
            subject: `[Portfolio] ${subject}`,
            html: `
            <h2>Nouveau message depuis ton portfolio</h2>
            <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
            <p><strong>Email :</strong> ${escapeHtml(email)}</p>
            <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
            <hr />
            <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return json({ ok: false, error: 'send_failed' }, 500);
        }

        return json({ ok: true });
    } catch (e) {
        console.error(e);
        return json({ ok: false, error: 'server_error' }, 500);
    }
};
