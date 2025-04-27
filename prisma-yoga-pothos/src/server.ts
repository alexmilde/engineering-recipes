import "dotenv/config";
import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import graphqlPlugin from "./plugins/graphql";

const server: FastifyInstance = Fastify({});
server.register(graphqlPlugin);

const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
