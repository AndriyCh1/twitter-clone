import { z } from 'zod';

export const createPostSchema = z
  .object({
    body: z.object({
      text: z.string().optional(),
      img: z.string().optional(),
    }),
  })
  .refine(({ body }) => body.img || body.text, {
    message: 'Post must have text or image',
    path: ['body.img', 'body.text'],
  });

export type CreatePostDto = z.TypeOf<typeof createPostSchema>['body'];
