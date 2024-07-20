import { z } from 'zod';

export const savePostSchema = z.object({
  body: z.object({
    postId: z.string({ message: 'Post Id is required' }),
  }),
});

export type SavePostDto = z.infer<typeof savePostSchema>['body'];
