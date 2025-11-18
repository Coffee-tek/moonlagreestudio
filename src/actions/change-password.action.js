"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export async function changePasswordAction(formData) {
  const currentPassword = String(formData.get("currentPassword"));
  if (!currentPassword) return { error: "Veuillez saisir votre mot de passe actuel" };

  const newPassword = String(formData.get("newPassword"));
  if (!newPassword) return { error: "Veuillez saisir votre nouveau mot de passe" };

  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword,
        newPassword,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: "Internal Server Error" };
  }
}
