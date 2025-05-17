import { FastifyInstance } from "fastify";
import { timeController } from "../instances/timeInstance";
import { authGuard } from "../middleware/authGuard";

export async function createTime(fastify: FastifyInstance){
    fastify.post("/time/create/:corporationId", authGuard, (req, res) => timeController.create({req, res}));
}

export async function updateTime(fastify: FastifyInstance){
    fastify.put("/time/update/:id/:corporationId", authGuard, (req, res) => timeController.update({req, res}));
}

export async function deleteTime(fastify: FastifyInstance){
    fastify.delete("/time/delete/:id", authGuard, (req, res) => timeController.delete({req, res}));
}

export async function readTime(fastify: FastifyInstance){
    fastify.get("/time/:id", authGuard, (req, res) => timeController.read({req, res}));
}

export async function findAllTime(fastify: FastifyInstance){
    fastify.get("/time", authGuard, (req, res) => timeController.findAll({req, res}));
}

export async function availableTime(fastify: FastifyInstance){
    fastify.get("/time/available", authGuard, (req, res) => timeController.available({req, res}));
}
