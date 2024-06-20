import { File } from 'buffer';
import { z } from 'zod';

import { bytesToMb } from '../../../common/utils/bytes-to-mb';

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
const MAX_IMAGE_SIZE = 4; // In MB

export const createPostSchema = z
  .object({
    body: z.object({
      text: z.string().optional(),
    }),
    file: z
      .custom<File>()
      .optional()
      .refine((file) => !file, 'Image is required')
      .refine(
        (file) => !file || bytesToMb(file.size) <= MAX_IMAGE_SIZE,
        `The maximum image size is ${MAX_IMAGE_SIZE}MB`
      )
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), 'File type is not supported'),
  })
  .refine(({ body, file }) => !file || body.text, {
    message: 'Post must have text or image',
    path: ['body.img', 'body.text'],
  });

export type CreatePostDto = z.TypeOf<typeof createPostSchema>['body'];
