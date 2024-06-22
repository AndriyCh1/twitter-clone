import { z } from 'zod';

import { bytesToMb } from '../../../common/utils/bytes-to-mb';

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
const MAX_IMAGE_SIZE = 4; // In MB

type File = Express.Multer.File;

export const updateProfileSchema = z
  .object({
    body: z.object({
      fullName: z.string().min(3, { message: 'Full name must be at least 3 characters long' }).optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      username: z.string().min(3, { message: 'Username must be at least 3 characters long' }).optional(),
      bio: z.string().optional(),
      currentPassword: z.string().optional(),
      newPassword: z.string().optional(),
      link: z.string().optional(),
    }),
    files: z.object({
      coverImg: z
        .array(z.custom<File>())
        .optional()
        .refine(
          (files) => (files?.length ? bytesToMb(files[0].size) <= MAX_IMAGE_SIZE : true),
          `The maximum image size is ${MAX_IMAGE_SIZE}MB`
        )
        .refine(
          (files) => (files?.length ? ACCEPTED_IMAGE_TYPES.includes(files[0].mimetype) : true),
          'File type for cover image is not supported'
        ),
      profileImg: z
        .array(z.custom<File>())
        .optional()
        .refine(
          (files) => (files?.length ? bytesToMb(files[0].size) <= MAX_IMAGE_SIZE : true),
          `The maximum image size is ${MAX_IMAGE_SIZE}MB`
        )
        .refine(
          (files) => (files?.length ? ACCEPTED_IMAGE_TYPES.includes(files[0].mimetype) : true),
          'File type for profile image is not supported'
        ),
    }),
  })

  .refine(
    (data) => {
      const { newPassword, currentPassword } = data.body;
      return !((!newPassword && currentPassword) || (!currentPassword && newPassword));
    },
    {
      message: 'Please provide both current password and new password',
      path: ['body.newPassword', 'body.currentPassword'],
    }
  );

export type UpdateProfileDto = z.TypeOf<typeof updateProfileSchema>['body'];
