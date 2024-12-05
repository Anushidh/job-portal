import { z } from 'zod';

export const EmployerSignupSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  companyWebsite: z.string().url("Invalid URL").optional(),
  industry: z.string().optional(),
});

export const EmployerSigninSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});



export type EmployerSignupInput = z.infer<typeof EmployerSignupSchema>;
export type EmployerSigninInput = z.infer<typeof EmployerSigninSchema>;