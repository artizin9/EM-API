import { FastifyInstance } from "fastify";
import {
  createUser,
  deleteUser,
  findAllUsers,
  loginUser,
  readUser,
  updateUser,
  logOutUser
} from "./userRoutes";
import {
  createCorporation,
  deleteCorporation,
  findAllCorporations,
  loginCorporation,
  readCorporation,
  updateCorporation,
  logOutCorporation
} from "./corporationRoutes";
import {
  availableTime,
  createTime,
  deleteTime,
  findAllTime,
  readTime,
  updateTime,
} from "./timeRoutes";
import {
  createScheduling,
  deleteScheduling,
  findAllScheduling,
  readScheduling,
  updateSchedulingStatusCanceled,
  updateSchedulingStatusCompleted,
} from "./schedulingRoutes";
import { emailSenderCorporation, emailSenderUser } from "./emailSenderRoutes";
import { forgotPassCorp, forgotPassUser } from "./forgotPassRoutes";

const routes = [
  createUser,
  updateUser,
  deleteUser,
  readUser,
  findAllUsers,
  loginUser,
  logOutUser,
  createCorporation,
  updateCorporation,
  readCorporation,
  findAllCorporations,
  loginCorporation,
  deleteCorporation,
  logOutCorporation,
  createTime,
  updateTime,
  deleteTime,
  readTime,
  findAllTime,
  availableTime,
  createScheduling,
  updateSchedulingStatusCanceled,
  updateSchedulingStatusCompleted,
  deleteScheduling,
  readScheduling,
  findAllScheduling,
  emailSenderUser,
  emailSenderCorporation,
  forgotPassUser,
  forgotPassCorp,
];

export const registerRoutes = (fastify: FastifyInstance) =>
  routes
    .filter((route) => typeof route === "function")
    .forEach((route) => fastify.register(route));
