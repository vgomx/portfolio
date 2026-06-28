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
    hidden: z.boolean().optional(),
    summary: z.string(),
    imageLabel: z.string().optional(),
    coverImage: z.string().optional(),
    role: z.string().optional(),
    team: z.string().optional(),
    country: z.string().optional(),
    quotes: z.array(z.object({ text: z.string(), author: z.string(), after: z.string() })).optional(),
    embeds: z.array(z.object({ src: z.string(), after: z.string(), label: z.string().optional(), layout: z.enum(['landscape', 'mobile']).optional(), ratio: z.string().optional() })).optional(),
    steps: z.array(z.string()).optional(),
    overview: z.string().optional(),
    overviewBody: z.array(z.string()).optional(),
    challenge: z.string().optional(),
    challengeBody: z.array(z.object({ body: z.string(), lead: z.string().optional() })).optional(),
    roleIntro: z.string().optional(),
    roleItems: z.array(z.object({ heading: z.string(), body: z.string() })).optional(),
    processIntro: z.string().optional(),
    processNote: z.string().optional(),
    processStepsDetail: z.array(z.object({ lead: z.string(), body: z.string() })).optional(),
    decisionItems: z.array(z.object({ heading: z.string(), paragraphs: z.array(z.string()), image: z.string().optional() })).optional(),
    systemsBody: z.string().optional(),
    learningsParagraphs: z.array(z.string()).optional(),
    statusNote: z.string().optional(),
    outcomes: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    template: z.enum(['default', 'alt']).optional(),
    bodyImages: z.array(z.object({
      src: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
      after: z.string(),
      layout: z.enum(['full', 'offset', 'offset-left', 'wide', 'duo', 'trio']).optional(),
    })).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { work, blog };
