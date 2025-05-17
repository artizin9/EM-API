import { z } from "zod";

export const timeSchema = z.object({
    date: z.string()
});

export type timeDTO = z.infer<typeof timeSchema>