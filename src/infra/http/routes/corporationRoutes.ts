import { FastifyInstance } from "fastify";
import { corporationController } from "../instances/corporationInstance";
import { authGuard } from "../middleware/authGuard";

export function createCorporation(fastify: FastifyInstance){
    fastify.post("/corporation/register", (req, res) => corporationController.create({req, res}));
}

export function updateCorporation(fastify: FastifyInstance){
    fastify.put("/corporation/update/:id", authGuard, (req, res) => corporationController.update({req, res}));
}

export function deleteCorporation(fastify: FastifyInstance){
    fastify.delete("/corporation/delete/:id", authGuard, (req, res) => corporationController.delete({req, res}));
}

export function readCorporation(fastify: FastifyInstance){
    fastify.get("/corporation/:id", authGuard, (req, res) => corporationController.read({req, res}));
}

export function findAllCorporations(fastify: FastifyInstance){
    fastify.get("/corporations", authGuard, (req, res) => corporationController.findAllCorporations({req, res}));
}

export function loginCorporation(fastify: FastifyInstance){
    fastify.post("/corporation/login", (req, res) => corporationController.login({req, res}));
}

export function logOutCorporation(fastify: FastifyInstance){
    fastify.delete('/corporation/logOut/:id', authGuard, (req, res) => corporationController.logOut({req, res}))
}