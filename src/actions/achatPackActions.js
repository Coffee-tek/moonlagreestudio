"use server";

import { achatPackService } from "@/services/achatPackService";

/**
 * Action server pour acheter un pack
 */
export async function acheterPackAction({ userId, packId }) {
  try {
    return await achatPackService.acheterPack({ userId, packId });
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * Action server pour créditer ou débiter le wallet
 */
export async function modifierWalletAction({ userId, montant, type = "CREDIT", description }) {
  try {
    if (type === "CREDIT") return await achatPackService.crediterWallet({ userId, montant, description });
    if (type === "DEBIT") return await achatPackService.debiterWallet({ userId, montant, description });
    throw new Error("Type invalide");
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * Action server pour modifier les points
 */
export async function modifierPointsAction({ userId, montant, type = "POINT_CREDIT", description }) {
  try {
    return await achatPackService.modifierPoints({ userId, montant, type, description });
  } catch (e) {
    throw new Error(e.message);
  }
}
