import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email("Email formati noto'g'ri"),
  name: z.string().min(2, "Ism juda qisqa"),
  password: z.string().min(6, "Parol kamida 6 ta belgi bo'lishi kerak"),
});

export const LoginSchema = RegisterSchema.pick({
  email: true,
  password: true,
});

export type User = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
