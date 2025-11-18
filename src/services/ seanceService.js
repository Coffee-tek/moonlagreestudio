import prisma from "@/lib/prisma";

export const seanceService = {
  getAll: async () => {
    return await prisma.seance.findMany({ orderBy: { date: "asc" } });
  },
  getById: async (id) => {
    return await prisma.seance.findUnique({ where: { id: parseInt(id) } });
  },
  create: async (data) => {
    return await prisma.seance.create({ data });
  },
  update: async (id, data) => {
    return await prisma.seance.update({
      where: { id: parseInt(id) },
      data,
    });
  },
  delete: async (id) => {
    return await prisma.seance.delete({ where: { id: parseInt(id) } });
  },
};
