import { PrismaClient } from "./prisma-client";

let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient | undefined;
}

prisma = new PrismaClient();

export default prisma;