import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z]/, 'Name must start with uppercase letter'),
    age: z.number().int().positive('Age must be a positive number'),
    email: z.email('Invalid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(passwordRegex, 'Password too weak'),
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female']),
    accept: z
      .boolean()
      .refine((val) => val, 'You must accept Terms and Conditions'),
    image: z.string().optional(),
    country: z.string().min(1, 'Country is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof formSchema>;
