import { z } from "zod";
import { emailSenderSchema } from "../infra/schemas/emailSender.schema";

export type EmailSendDTO = z.infer<typeof emailSenderSchema>;