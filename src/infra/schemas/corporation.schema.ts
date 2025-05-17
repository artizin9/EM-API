import { z } from "zod";

export const corporationSchema = z.object({
    cnpj: z.string().length(18),
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(8),
    photoURL: z.string().optional(),
    place: z.string()
});

export const updateCorporationSchema = corporationSchema.omit({ photoURL: true }).partial();

export type CorporationDTO = z.infer<typeof corporationSchema>
export type UpdateCorporationDTO = z.infer<typeof updateCorporationSchema>;