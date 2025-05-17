import { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';

export async function staticFilesPlugin(fastify: FastifyInstance) {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '..', '..', '..', 'upload'),
    prefix: '/uploads/',
  });
}