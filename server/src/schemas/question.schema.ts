import { TypeOf, z } from 'zod';

export const createQuestionSchema = z.object({
  body: z.object({
    text: z
      .string()
      .min(1, 'Question is required')
      .max(100, 'Question must be less than 100 characters'),
    options: z.string().optional(),
    file: z
      .any()
      .transform((e) => (!e ? undefined : e))
      .optional(),
    type: z.enum(['text', 'single-select', 'multi-select', 'file']),
  }),
});

export type CreateQuestionSchema = TypeOf<typeof createQuestionSchema>['body'];
