import { z } from "zod";

export const userSchema = z.object({
    name: z.string().max(255).min(3),
    email: z.string().email().min(3),
    password: z.string().min(8),
    photoURL: z.string().optional()
});

export const updateUserSchema = userSchema.omit({ photoURL: true }).partial(); 

export type userDTO = z.infer<typeof userSchema>;
export type updateUserDTO = z.infer<typeof updateUserSchema>;