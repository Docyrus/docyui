import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    published: z.boolean().default(true),
    component: z.boolean().default(false),
  }),
});

const components = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(true),
    radix: z.object({
      link: z.string(),
      api: z.string(),
    }).optional(),
    links: z.object({
      doc: z.string(),
      api: z.string(),
    }).optional(),
  }),
});

export const collections = { docs, components };