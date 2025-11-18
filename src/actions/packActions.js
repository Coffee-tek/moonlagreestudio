"use server";

import { revalidatePath } from "next/cache";
import { createDefaultPack, updatePack, deletePack } from "@/services/packService";

export async function createPackAction() {
  const pack = await createDefaultPack();
  revalidatePath("/admin/packs");
  return pack;
}

export async function updatePackAction(id, data) {
  const updated = await updatePack(id, data);
  revalidatePath("/admin/packs");
  return updated;
}

export async function deletePackAction(id) {
  await deletePack(id);
  revalidatePath("/admin/packs");
}
