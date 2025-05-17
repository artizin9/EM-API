import { FastifyInstance } from "fastify";
import { sendEmailController } from "../instances/emailSenderInstace";

export function emailSenderUser(fastify: FastifyInstance){
    fastify.post('/email-sender/user', (req, res) => sendEmailController.senderEmailUser({req, res}))
}

export function emailSenderCorporation(fastify: FastifyInstance){
    fastify.post('/email-sender/corporation', (req, res) => sendEmailController.senderEmailCorporation({req, res}))
}