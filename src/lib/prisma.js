import { PrismaClient } from "@prisma/client";

// Empêche Prisma de créer plusieurs instances pendant le développement (Hot Reload)
const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
