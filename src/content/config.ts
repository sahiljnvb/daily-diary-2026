import { defineCollection, z } from 'astro:content';

const diary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    day: z.string(),
    periods: z.array(z.object({
      period: z.number(),
      class_name: z.string(),
      subject: z.string(),
      topic: z.string(),
      remarks: z.string().optional(),
    })).optional(),
    absentees: z.string().optional(),
    homework_given: z.string().optional(),
    general_notes: z.string().optional(),
  }),
});

export const collections = { diary };
