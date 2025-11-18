import { PrismaClient } from "../../lib/generated/prisma";

// Empêche Prisma de créer plusieurs instances pendant le développement (Hot Reload)
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
