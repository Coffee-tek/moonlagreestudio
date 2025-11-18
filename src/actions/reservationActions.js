"use server";

import { reservationService } from "@/services/reservationService";
import { revalidatePath } from "next/cache";

// ➕ Créer une réservation (paiement en ligne ou sur place)
export async function reserverSeanceAction(userId, seanceId, modePaiement) {
  try {
    const reservation = await reservationService.reserverSeance(
      userId,
      seanceId,
      modePaiement
    );
    revalidatePath("/reservations"); // Revalide la page des réservations
    return { success: true, data: reservation };
  } catch (error) {
    return { error: error.message };
  }
}

// ✅ Confirmer une réservation sur place (débite le wallet et crée la transaction)
export async function confirmerReservationAction(reservationId) {
  try {
    const reservation = await reservationService.confirmerReservation(
      reservationId
    );
    revalidatePath("/reservations");
    return { success: true, data: reservation };
  } catch (error) {
    return { error: error.message };
  }
}

// Annuler une réservation (restaure crédits si payé et crée transaction)
export async function annulerReservationAction(reservationId) {
  try {
    const result = await reservationService.annulerReservation(reservationId);
    revalidatePath("/reservations");
    return { success: true, data: result };
  } catch (error) {
    return { error: error.message };
  }
}

//  Lister toutes les réservations
export async function getAllReservationsAction() {
  try {
    const data = await reservationService.getAllReservations();
    return { data };
  } catch (error) {
    return { error: error.message };
  }
}

//  Récupérer une réservation spécifique par ID
export async function getReservationByIdAction(reservationId) {
  try {
    const reservation = await reservationService.getReservationById(
      reservationId
    );
    return { data: reservation };
  } catch (error) {
    return { error: error.message };
  }
}
