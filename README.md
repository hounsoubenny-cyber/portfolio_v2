# Portfolio — Benny Samuel HOUNSOU

Portfolio personnel de **Benny Samuel HOUNSOU** — IA, automatisation, systèmes fullstack et cybersécurité augmentée par l'IA.

🔗 **Live** : [myportfolio.hounsoubenny.workers.dev](https://myportfolio.hounsoubenny.workers.dev)

---

## À propos

Ce site présente mon parcours, mes compétences techniques et mes projets (IA, machine learning, cybersécurité, fullstack), ainsi que des articles techniques sur mon blog. Bilingue (FR/EN), thème clair/sombre, entièrement responsive.

## Stack technique

| Domaine | Techno |
|---|---|
| Framework | [Astro](https://astro.build) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Contenu | Content Collections Astro (Markdown + frontmatter typé) |
| SEO | Sitemap auto (`@astrojs/sitemap`), Open Graph, JSON-LD |
| Backend | Route serveur `/api/contact` (Astro + adapter Cloudflare) |
| Emails | [Resend](https://resend.com) |
| Déploiement | Cloudflare Workers |

## Fonctionnalités

- 🌍 Bilingue FR/EN (bascule instantanée, sans rechargement)
- 🌗 Thème clair / sombre
- 📱 Responsive (mobile, tablette, desktop)
- 📝 Projets & articles de blog gérés via Markdown (Content Collections)
- 🔍 Filtres par tag sur la page Projets
- 🔎 SEO : sitemap, meta OG/Twitter, données structurées JSON-LD
- ⚡ Pages pré-générées (rapides) + une seule route serveur : le formulaire de contact
- 📬 Formulaire de contact sécurisé : honeypot, validation serveur, rate limiting, secrets côté serveur uniquement

## Démarrer en local

**Prérequis** : Node.js 18+

```bash
npm install
npm run dev
```

Le site tourne alors sur `http://localhost:3000` (ou le premier port disponible).

### Build de production

```bash
npm run build   # génère le site (pages pré-rendues + worker) dans dist/
npm run preview # prévisualise le build de production en local
```

### Variables d'environnement

Le site s'affiche sans aucune variable. Elles ne servent qu'au formulaire de contact (`/api/contact`) :

| Variable | Obligatoire | Rôle |
|---|---|---|
| `RESEND_API_KEY` | oui | Clé API Resend |
| `CONTACT_TO_EMAIL` | oui | Adresse qui reçoit les messages |
| `CONTACT_FROM_EMAIL` | non | Expéditeur, ex. `Portfolio <contact@ton-domaine.com>` (domaine vérifié sur Resend). Par défaut : `onboarding@resend.dev` |

**En local** : crée un fichier `.dev.vars` à la racine (déjà ignoré par git) :

```
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=toi@exemple.com
```

**En production** :

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_TO_EMAIL
```

### Sécurité du formulaire de contact

- Honeypot anti-bot, validation des types et des longueurs, corps limité en taille
- Refus des requêtes venant d'un autre site (contrôle de l'en-tête `Origin`)
- Rate limiting : binding Cloudflare `CONTACT_LIMITER` (5 requêtes / 60 s / IP, voir `wrangler.jsonc`). Sans ce binding, un limiteur en mémoire prend le relais (moins fiable)
- Les erreurs renvoyées au navigateur sont génériques ; les détails vont uniquement dans les logs (`npx wrangler tail`)

## Structure du projet

```
src/
├── assets/images/       # Images optimisées par Astro (photos de profil, etc.)
├── content/
│   ├── projets/*.md     # Un fichier = un projet (frontmatter : titre, stack, cover...)
│   ├── blog/*.md         # Un fichier = un article
│   └── parcours/bio.md  # Texte de la bio (page Parcours)
├── data.ts               # Compétences (page Expertise) & jalons (page Parcours)
├── layouts/Layout.astro  # Layout global (head, nav, footer, SEO, lang/theme switch)
├── site.ts               # Email de contact et liens sociaux (source unique)
├── pages/                # Une route par fichier (index, parcours, expertise, projets/, blog/, contact)
│   └── api/contact.ts    # Seule route serveur : envoi des mails via Resend
└── types.ts              # Types TypeScript partagés (Skill, TimelineItem)

public/
├── images/projets/       # Covers des projets
├── images/blog/          # Covers des articles
├── images/og-image.png   # Image de partage par défaut (réseaux sociaux)
└── robots.txt
```

### Ajouter un projet

Crée un fichier `src/content/projets/mon-projet.md` avec le frontmatter attendu (voir un fichier existant comme modèle : `titre`, `description`, `date_debut`, `status`, `tags`, `image_cover`, `stack`, `featured`), suivi du contenu Markdown en deux sections `## fr` et `## en`.

### Ajouter un article de blog

Même principe dans `src/content/blog/`, avec `title`, `date`, `tags`, `image_cover`, `resume`, `temps_lecture`.

## Déploiement (Cloudflare Workers)

```bash
npm run build
npx wrangler deploy
```

Le nom du déploiement (et donc le sous-domaine `*.workers.dev`) est défini dans `wrangler.jsonc` (`name`).

Pense à définir les secrets (voir plus haut) avant le premier déploiement, sinon le formulaire de contact renverra une erreur.

⚠️ Après tout changement de domaine final, penser à mettre à jour :
- `site` dans `astro.config.mjs`
- l'URL du sitemap dans `public/robots.txt`

## Licence

Code sous licence MIT. Contenu (textes, projets, articles) © Benny Samuel HOUNSOU — tous droits réservés.

## Contact

- Email : hounsoubenny@gmail.com
- GitHub : [@hounsoubenny-cyber](https://github.com/hounsoubenny-cyber)
- LinkedIn : [Benny Samuel HOUNSOU](https://linkedin.com/in/benny-samuel-hounsou-631023249)
