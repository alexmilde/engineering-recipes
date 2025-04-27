import "dotenv/config";
import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import graphqlPlugin from "./plugins/graphql";

const server: FastifyInstance = Fastify({});
server.register(graphqlPlugin);

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/ping", opts, async () => {
  return { pong: "it worked!" };
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
