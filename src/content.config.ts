import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projetsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/projets" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date_debut: z.string(),
    date_fin: z.string().nullable(),
    status: z.enum(['en cours', 'terminé', 'en pause']),
    tags: z.array(z.string()),
    image_cover: z.string(),
    lien_github: z.string().nullable(),
    lien_demo: z.string().nullable(),
    featured: z.boolean(),
    stack: z.array(z.string())
  })
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    image_cover: z.string(),
    resume: z.string(),
    temps_lecture: z.number()
  })
});

const parcoursCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/parcours" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional()
  })
});

export const collections = {
  projets: projetsCollection,
  blog: blogCollection,
  parcours: parcoursCollection
};
