import { z } from 'zod';

export const commentPostSchema = z.object({
  body: z.object({ text: z.string({ message: 'Comment must have text' }) }),
});

export type CommentPostDto = z.infer<typeof commentPostSchema>['body'];
