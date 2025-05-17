import { FastifyInstance } from "fastify";
import { userController } from "../instances/userInstance";
import { authGuard } from "../middleware/authGuard";

export function createUser(fastify: FastifyInstance){
    fastify.post("/user/register", (req, res) => userController.create({req, res}));
} 

export function updateUser(fastify: FastifyInstance){
    fastify.put("/user/update/:id", authGuard, (req, res) => userController.update({req, res}));
} 

export function deleteUser(fastify: FastifyInstance){
    fastify.delete("/user/delete/:id", authGuard, (req, res) => userController.delete({req, res}));
} 

export function readUser(fastify: FastifyInstance){
    fastify.get("/user/:id", authGuard, (req, res) => userController.read({req, res}));
} 

export function findAllUsers(fastify: FastifyInstance){
    fastify.get("/user", authGuard, (req, res) => userController.findAllUsers({req, res}));
} 

export function loginUser(fastify: FastifyInstance){
    fastify.post("/user/login", (req, res) => userController.Login({req, res}));
}

export function logOutUser(fastify: FastifyInstance){
    fastify.delete('/user/logOut/:id', authGuard, (req, res) => userController.logOut({req, res}))
}
