import { FastifyPluginAsync } from "fastify";
import { createYoga } from "graphql-yoga";
import { schema } from "../schema";
import { PrismaClient } from "../../prisma/prisma-client";

const graphqlPlugin: FastifyPluginAsync = async (fastify) => {
  const prisma = new PrismaClient();

  const yoga = createYoga({
    schema,
    context: ({ request }) => {
      return { prisma };
    },
    graphqlEndpoint: "/graphql",
  });

  fastify.route({
    method: ["GET", "POST", "OPTIONS"],
    url: "/graphql",
    handler: async (req, reply) => {
      const response = await yoga.handleNodeRequestAndResponse(req, reply);

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      reply.status(response.status);

      const responseBody = await response.text();
      reply.send(responseBody);
    },
  });
};

export default graphqlPlugin;
