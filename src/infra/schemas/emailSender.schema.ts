import { z } from "zod";

export const emailSenderSchema = z.object({
    email: z.string().email(),
    ip: z.string().ip({ message: "Invalid IP" }),
});