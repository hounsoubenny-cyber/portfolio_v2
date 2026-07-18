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
| Déploiement | Cloudflare Workers |

## Fonctionnalités

- 🌍 Bilingue FR/EN (bascule instantanée, sans rechargement)
- 🌗 Thème clair / sombre
- 📱 Responsive (mobile, tablette, desktop)
- 📝 Projets & articles de blog gérés via Markdown (Content Collections)
- 🔍 Filtres par tag sur la page Projets
- 🔎 SEO : sitemap, meta OG/Twitter, données structurées JSON-LD
- ⚡ 100% statique — rapide, pas de backend requis

## Démarrer en local

**Prérequis** : Node.js 18+

```bash
npm install
npm run dev
```

Le site tourne alors sur `http://localhost:3000` (ou le premier port disponible).

### Build de production

```bash
npm run build   # génère le site statique dans dist/
npm run preview # prévisualise le build de production en local
```

Aucune variable d'environnement n'est nécessaire — le site est 100% statique.

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
├── pages/                # Une route par fichier (index, parcours, expertise, projets/, blog/, contact)
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

Le nom du déploiement (et donc le sous-domaine `*.workers.dev`) est défini dans `wrangler.toml` / `wrangler.jsonc` (`name`).

⚠️ Après tout changement de domaine final, penser à mettre à jour :
- `site` dans `astro.config.mjs`
- l'URL du sitemap dans `public/robots.txt`

## Licence

Code sous licence MIT. Contenu (textes, projets, articles) © Benny Samuel HOUNSOU — tous droits réservés.

## Contact

- Email : hounsoubenny.cyber@gmail.com
- GitHub : [@hounsoubenny-cyber](https://github.com/hounsoubenny-cyber)
- LinkedIn : [Benny Samuel HOUNSOU](https://linkedin.com/in/benny-samuel-hounsou-631023249)
