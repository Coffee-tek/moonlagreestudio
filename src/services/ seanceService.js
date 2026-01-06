// seanceService.js
import prisma from "@/lib/prisma";

// Fonction utilitaire pour calculer le status et remainingPlaces
function getStatus(s) {
  // Calcul des places restantes
  const remainingPlaces = (s.places || 0) - (s.place_reserver || 0);

  // Déterminer le statut basé sur les places
  let status = "Disponible";
  if (remainingPlaces === 0) status = "Complet";
  else if (remainingPlaces <= 3 && remainingPlaces > 0) status = "Presque complet";

  // Comparer la date et l'heure de la séance avec maintenant
  const now = new Date();              // Date et heure actuelles
  const seanceDateTime = new Date(s.heure); // La date + heure de la séance

  if (seanceDateTime < now) {
    status = "Expirée"; // Si la séance est passée → expirée
  }

  // Retourner l'objet avec remainingPlaces et status
  return { ...s, remainingPlaces, status };
}



export const seanceService = {
  getAll: async () => {
    const allSeances = await prisma.seance.findMany({ orderBy: { heure: "desc" } });

    const updatedSeances = await Promise.all(
      allSeances.map(async (s) => {
        const sWithStatus = getStatus(s);

        // Mise à jour en base seulement si nécessaire
        if (sWithStatus.status !== s.status) {
          await prisma.seance.update({
            where: { id: s.id },
            data: { status: sWithStatus.status },
          });
        }

        return sWithStatus;
      })
    );

    return updatedSeances;
  },

  getByUserId: async (userId) => {
    // Récupérer d'abord toutes les séances avec statut à jour
    const allSeances = await seanceService.getAll();

    // Filtrer les séances où l'utilisateur a une réservation
    const userSeances = await Promise.all(
      allSeances.map(async (s) => {
        const reservation = await prisma.reservation.findFirst({
          where: {
            seanceId: s.id,
            userId: userId,
          },
          orderBy: {
            createdAt: 'desc', // la plus récente en premier
          },
        });

        if (reservation) {
          // Inclure la réservation dans la séance
          return { ...s, reservations: [reservation] };
        }
        return null;
      })
    );

    return userSeances.filter(Boolean); // supprimer les null
  },

  getById: async (id) => {
    const s = await prisma.seance.findUnique({ where: { id: parseInt(id) } });
    if (!s) return null;

    const sWithStatus = getStatus(s);

    if (sWithStatus.status !== s.status) {
      await prisma.seance.update({
        where: { id: s.id },
        data: { status: sWithStatus.status },
      });
    }

    return sWithStatus;
  },

  create: async (data) => {
    // Vérification : existe déjà une séance le même jour et à la même heure
    const existing = await prisma.seance.findFirst({
      where: {
        date: data.date,
        heure: data.heure,
      },
    });
    if (existing) throw new Error("Une séance existe déjà à cette date et heure.");

    const sWithStatus = getStatus({ ...data, place_reserver: 0 });
    return await prisma.seance.create({ data: { ...data, status: sWithStatus.status } });
  },

  update: async (id, data) => {
    const existing = await prisma.seance.findFirst({
      where: {
        date: data.date,
        heure: data.heure,
        NOT: { id: parseInt(id) },
      },
    });
    if (existing) throw new Error("Une autre séance existe déjà à cette date et heure.");

    const sWithStatus = getStatus({ ...data, place_reserver: data.place_reserver || 0 });
    return await prisma.seance.update({
      where: { id: parseInt(id) },
      data: { ...data, status: sWithStatus.status },
    });
  },

  delete: async (id) => {
    return await prisma.seance.delete({ where: { id: parseInt(id) } });
  },

  deleteMany: async (ids) => {
    return await prisma.seance.deleteMany({ where: { id: { in: ids.map((i) => parseInt(i)) } } });
  },
};
