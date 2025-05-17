import { FastifyRequest } from "fastify";
import { ServerError } from "../../../shared/serverError";
import jwt from 'jsonwebtoken'
import { env } from "../../../config/env";

interface userData {
    id: string,
    name: string,
    email: string
}

declare module 'fastify' {
    interface FastifyRequest {
        user?: userData
    }
}

export async function authMiddleware(req: FastifyRequest) {
    const token = req?.cookies.token;
    if (!token) throw new ServerError("Token não encontrado", 401);

    const decoded = jwt.verify(token, env.JWT_SECRET) as userData;
    req.user = decoded;
}