import fastifyFactory, { FastifyInstance } from "fastify";
import { schedulingController } from "../instances/schedulingInstance";
import { authGuard } from "../middleware/authGuard";
import { MethodRouteDTO } from "../../../dto/methodRouteDTO";

function MethodScheduling(fastify: FastifyInstance, method: MethodRouteDTO, path: string, controllerMethod: Function) {
    fastify[method](path, authGuard, (req, res) => controllerMethod({req, res}));
}

const fastify = fastifyFactory();

export const createScheduling = MethodScheduling(fastify, "post", "/scheduling/create/:userId/:timeId", schedulingController.create);

export const updateSchedulingStatusCanceled = MethodScheduling(fastify, "put", "/scheduling/update/status/canceled/:id/:userId/:timeId", schedulingController.updateStatusCanceled);

export const readScheduling = MethodScheduling(fastify, "get", "/scheduling/read/:id", schedulingController.read);

export const findAllScheduling = MethodScheduling(fastify, "get", "/scheduling/findAll", schedulingController.findAll);

export const deleteScheduling = MethodScheduling(fastify, "delete", "/scheduling/delete/:id", schedulingController.delete);

export const updateSchedulingStatusCompleted = MethodScheduling(fastify, "put", "/scheduling/update/status/completed/:id/:userId/:timeId", schedulingController.updateStatusCompleted);