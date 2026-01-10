import prisma from "@/lib/prisma";
import { sendEmailAction } from "../actions/send-email.action";
import { sendReservationEmail } from "../actions/sendReservationEmail.action";
import { formatDateFR, formatDateTimeFR, formatTimeFR } from "../lib/utils";

export const reservationService = {


  async reserverSeance(userId, seanceId, modePaiement) {
    const seance = await prisma.seance.findUnique({ where: { id: seanceId } });

    if (!seance) throw new Error("Séance introuvable");

    if (seance.place_reserver >= seance.places) throw new Error("Aucune place disponible");


    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("Utilisateur introuvable");

    const isPaye = modePaiement === "en_ligne";
    const statutReservation = isPaye ? "confirme" : "en_attente";

    // Vérifie s'il existe une réservation non annulée
    const reservationActive = await prisma.reservation.findFirst({
      where: {
        seanceId,
        userId,
        statut: {
          not: "annule", // toutes les réservations actives
        },
      },
    });

    if (reservationActive) {
      throw new Error("Vous avez déjà réservé cette séance.");
    }

    // Vérifie s'il existe une réservation annulée
    let reservationExistante = await prisma.reservation.findFirst({
      where: {
        seanceId,
        userId,
        statut: "annule", // réservation annulée
      },
    });

    let reservation;

    if (reservationExistante) {
      if (isPaye) {
        const wallet = await prisma.wallet.findUnique({ where: { userId } });

        if (!wallet) throw new Error("Wallet introuvable");

        if (wallet.credit < seance.credits) {
          throw new Error("Crédits insuffisants");
        }

        await prisma.wallet.update({
          where: { id: wallet.id },
          data: { credit: { decrement: seance.credits } },
        });

        await prisma.transaction.create({
          data: {
            userId,
            walletId: wallet.id,
            type: "debit",
            montant: seance.credits,
            description: `Réservation séance ${seance.titre}`,
            category: "credits",
          },
        });
      }

      reservation = await prisma.reservation.update({
        where: { id: reservationExistante.id },
        data: {
          statut: "confirme",
          modePaiement,
          paye: true,
          montant: seance.credits,
        },
      });

      await prisma.seance.update({
        where: { id: seance.id },
        data: {
          place_reserver: { increment: 1 },
        },
      });
      
      // Envoi email
      await sendReservationEmail({
        to: user.email,
        reservation: {
          clientName: user.name,
          nameSeance: seance.titre,
          date: formatDateFR(seance.date),
          time: formatTimeFR(seance.heure),
          location: "Moon Lagree Studio",
          date_reservation: formatDateTimeFR(seance.createdAt),
          instructor: seance.coatch,
        },
      });

      return reservation;
    }


    // Sinon créer une nouvelle réservation
    if (isPaye) {
      const wallet = await prisma.wallet.findUnique({ where: { userId } });
      if (!wallet) throw new Error("Wallet introuvable");
      if (wallet.credit < seance.credits) throw new Error("Crédits insuffisants");

      reservation = await prisma.$transaction(async (tx) => {
        // Débiter le wallet
        await tx.wallet.update({
          where: { id: wallet.id },
          data: { credit: { decrement: seance.credits } },
        });

        // Créer la transaction
        await tx.transaction.create({
          data: {
            userId,
            walletId: wallet.id,
            type: "debit",
            montant: seance.credits,
            description: `Réservation séance ${seance.titre}`,
            category: "credits",
          },
        });

        // Créer la réservation confirmée
        const res = await tx.reservation.create({
          data: {
            userId,
            seanceId,
            montant: seance.credits,
            modePaiement,
            paye: true,
            statut: statutReservation,
          },
        });

        // Mettre à jour la séance
        await tx.seance.update({
          where: { id: seance.id },
          data: {
            place_reserver: { increment: 1 },
            status:
              seance.place_reserver + 1 >= seance.places
                ? "Complet"
                : seance.status,
          },
        });

        // Envoi email
        await sendReservationEmail({
          to: user.email,
          reservation: {
            clientName: user.name,
            nameSeance: seance.titre,
            date: formatDateFR(seance.date),
            time: formatTimeFR(seance.heure),
            location: "Moon Lagree Studio",
            date_reservation: formatDateTimeFR(seance.createdAt),
            instructor: seance.coatch,
          },
        });


        return res;
      });
    } else {
      reservation = await prisma.$transaction(async (tx) => {
        const res = await tx.reservation.create({
          data: {
            userId,
            seanceId,
            montant: seance.credits,
            modePaiement,
            paye: false,
            statut: statutReservation,
          },
        });

        await tx.seance.update({
          where: { id: seance.id },
          data: {
            place_reserver: { increment: 1 },
            status:
              seance.place_reserver + 1 >= seance.places
                ? "Complet"
                : seance.status,
          },
        });


        await sendReservationEmail({
          to: user.email,
          reservation: {
            clientName: user.name,
            nameSeance: seance.titre,
            date: formatDateFR(seance.date),
            time: formatTimeFR(seance.heure),
            location: "Moon Lagree Studio",
            date_reservation: formatDateTimeFR(seance.createdAt),
            instructor: seance.coatch,
          },
        });

        return res;
      });
    }

    return reservation;
  },

  async confirmerReservation(reservationId) {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { user: { include: { wallet: true } }, seance: true },
    });

    if (!reservation) throw new Error("Réservation introuvable");
    if (reservation.statut === "confirme") throw new Error("Déjà confirmée");


    const wallet = reservation.user.wallet;
    // if (wallet.credit < reservation.montant) throw new Error("Crédits insuffisants pour confirmer");

    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Crédit admin (paiement sur place)
      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          credit: {
            increment: reservation.montant,
          },
        },
      });

      await tx.transaction.create({
        data: {
          userId: reservation.user.id,
          walletId: wallet.id,
          type: "credit",
          montant: reservation.montant,
          description: "Paiement sur place – crédit admin",
          category: "credits",
        },
      });

      // 2️⃣ Débit système (réservation)
      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          credit: {
            decrement: reservation.montant,
          },
        },
      });

      await tx.transaction.create({
        data: {
          userId: reservation.user.id,
          walletId: wallet.id,
          type: "debit",
          montant: reservation.montant,
          description: `Paiement réservation – ${reservation.seance.titre}`,
          category: "credits",
        },
      });

      // 3️⃣ Confirmation réservation
      return await tx.reservation.update({
        where: { id: reservation.id },
        data: {
          paye: true,
          statut: "confirme",
        },
      });
    });


    return result;
  },

  async annulerReservation(reservationId) {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { user: { include: { wallet: true } }, seance: true },
    });

    if (!reservation) throw new Error("Réservation introuvable");
    if (reservation.statut === "annule") throw new Error("Déjà annulée");

    const result = await prisma.$transaction(async (tx) => {
      if (reservation.paye) {
        // Restituer les crédits
        await tx.wallet.update({
          where: { id: reservation.user.wallet.id },
          data: { credit: { increment: reservation.montant } },
        });

        // Créer transaction de crédit
        await tx.transaction.create({
          data: {
            userId: reservation.user.id,
            walletId: reservation.user.wallet.id,
            type: "credit",
            montant: reservation.montant,
            description: `Annulation réservation séance ${reservation.seance.titre}`,
            category: "credits"
          },
        });
      }

      // Décrémenter la place réservée
      await tx.seance.update({
        where: { id: reservation.seance.id },
        data: { place_reserver: { decrement: 1 }, status: "Disponible" },
      });

      // Annuler la réservation
      await tx.reservation.update({
        where: { id: reservation.id },
        data: { statut: "annule" },
      });

      return { success: true };
    });

    return result;
  },

  async getAllReservations() {
    return prisma.reservation.findMany({
      include: {
        user: { select: { name: true, email: true } },
        seance: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getReservationById(id) {
    return prisma.reservation.findUnique({
      where: { id },
      include: { user: true, seance: true },
    });
  },
};
