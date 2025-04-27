import { PrismaClient } from "../../prisma/prisma-client";

let prisma: PrismaClient;
prisma = new PrismaClient();

export { prisma };
