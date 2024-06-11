import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    body: z.object({
      fullName: z.string().min(3, { message: 'Full name must be at least 3 characters long' }).optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      username: z.string().min(3, { message: 'Username must be at least 3 characters long' }).optional(),
      profileImg: z.string().optional(),
      coverImg: z.string().optional(),
      bio: z.string().optional(),
      currentPassword: z.string().optional(),
      newPassword: z.string().optional(),
      link: z.string().optional(),
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
