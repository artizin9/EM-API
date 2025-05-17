import multipart from '@fastify/multipart';
import Fastify from "fastify";
import fastifyCors from '@fastify/cors';
import { registerRoutes } from './routes/registerRoutes';
import { staticFilesPlugin } from './plugins/static';
import { env } from '../../config/env';
import fastifyCookie from '@fastify/cookie';

const fastify = Fastify();

fastify.register(fastifyCors, {
    origin: `http://localhost:${env.PORT_FRONTEND}`,
    credentials: true
});
fastify.register(fastifyCookie)
fastify.register(multipart);
fastify.register(registerRoutes);
fastify.register(staticFilesPlugin);


fastify.listen({ port: env.PORT }).then(() => {
    console.log("Server HTTP Running!");
});