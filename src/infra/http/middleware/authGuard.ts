import { authMiddleware } from "./authMiddleware";

export const authGuard = {preHandler: authMiddleware}