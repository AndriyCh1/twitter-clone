import { z } from 'zod';

export const pageOptionsSchema = z.object({
  page: z.coerce.number().positive().optional(),
  pageSize: z.coerce.number().nonnegative().max(50).optional(),
});

export type PageOptionsDto = z.TypeOf<typeof pageOptionsSchema>;
