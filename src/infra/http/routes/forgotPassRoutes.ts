import { FastifyInstance } from "fastify";
import { forgotPassController } from "../instances/forgotPassInstance";

export function forgotPassUser(fastify: FastifyInstance){
    fastify.put('/forgot-password-user/:token', (req, res) => forgotPassController.forgotPassUser({req, res}))
}

export function forgotPassCorp(fastify: FastifyInstance){
    fastify.put('/forgot-password-corporation/:token', (req, res) => forgotPassController.forgotPassCorp({req, res}))
}