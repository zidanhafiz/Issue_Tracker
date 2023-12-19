import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required!').max(255),
  description: z.string().min(1),
});

export const updateIssueSchema = z.object({
  title: z.string().min(1, 'Title is required!').max(255),
  description: z.string().min(1),
  status: z.string(),
});
