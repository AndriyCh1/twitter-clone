import { z } from 'zod';

import { bytesToMb } from '../../../common/utils/bytes-to-mb';

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
const MAX_IMAGE_SIZE = 4; // In MB

type File = Express.Multer.File;

export const createPostSchema = z
  .object({
    body: z.object({
      text: z.string().optional(),
    }),
    file: z
      .custom<File>()
      .optional()
      .refine(
        (file) => (file ? bytesToMb(file.size) <= MAX_IMAGE_SIZE : true),
        `The maximum image size is ${MAX_IMAGE_SIZE}MB`
      )
      .refine((file) => (file ? ACCEPTED_IMAGE_TYPES.includes(file.mimetype) : true), 'File type is not supported'),
  })
  .refine(({ body, file }) => file || body.text, {
    message: 'Post must have either text or image, or both',
    path: ['body.img', 'body.text'],
  });

export type CreatePostDto = z.TypeOf<typeof createPostSchema>['body'];
