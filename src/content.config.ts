import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    discipline: z.string(),
    year: z.number(),
    tags: z.array(z.string()),
    status: z.string(),
    statusLabel: z.string(),
    featured: z.boolean().optional(),
    summary: z.string(),
    imageLabel: z.string().optional(),
    coverImage: z.string().optional(),
    role: z.string().optional(),
    team: z.string().optional(),
    steps: z.array(z.string()).optional(),
    overview: z.string().optional(),
    challenge: z.string().optional(),
    outcomes: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  }),
});

export const collections = { work };
