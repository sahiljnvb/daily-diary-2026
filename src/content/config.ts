import { defineCollection, z } from 'astro:content';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const diary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional().default(''),
    // Accept either a string ("2026-09-05") or Date object from YAML and normalize to "YYYY-MM-DD"
    date: z.union([z.string(), z.date()]).transform((val) => {
      if (val instanceof Date) {
        return val.toISOString().split('T')[0];
      }
      return String(val);
    }),
    // Day of week (optional, if omitted we compute it from date)
    day: z.string().optional().default(''),
    periods: z.array(z.object({
      period: z.union([z.number(), z.string()]).transform((v) => Number(v) || 1),
      class_name: z.union([z.string(), z.number()]).transform((v) => String(v || '')),
      subject: z.string().optional().default(''),
      topic: z.string().optional().default(''),
      remarks: z.string().optional().default(''),
    })).optional().default([]),
    absentees: z.string().optional().default(''),
    homework_given: z.string().optional().default(''),
    general_notes: z.string().optional().default(''),
  }).transform((data) => {
    // If day is missing, auto-calculate it from date
    if (!data.day && data.date) {
      const d = new Date(data.date + 'T00:00:00');
      data.day = dayNames[d.getDay()] || '';
    }
    return data;
  }),
});

export const collections = { diary };
