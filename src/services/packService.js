import prisma from "@/lib/prisma";

export async function getAllPacks() {
  return prisma.pack.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createDefaultPack() {
  return prisma.pack.create({
    data: {
      titre: "Nouveau pack",
      credits: 0,
      prix: 0,
    },
  });
}

export async function updatePack(id, data) {
  return prisma.pack.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deletePack(id) {
  return prisma.pack.delete({ where: { id: Number(id) } });
}
