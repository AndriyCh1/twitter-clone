import { z } from 'zod';

export const signupSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'Username is required' }),
    fullName: z.string({ required_error: 'Full name is required' }),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters long' }),
  }),
});

export type SignupDto = z.TypeOf<typeof signupSchema>['body'];
