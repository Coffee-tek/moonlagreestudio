"use server";

import { auth } from "@/lib/auth";
import {
  //  cookies,
  headers,
} from "next/headers";

export async function signInEmailAction(formData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Veuillez entrer votre email" };

  const password = String(formData.get("password"));
  if (!password) return { error: "Veuillez entrer votre mot de passe" };

  try {
    // const res =
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
      //   asResponse: true,
    });


    return { error: null };
  } catch (err) {
    if (err instanceof Error) {
      return { error: "Oups ! Une erreur s'est produite lors de la connexion." };
    }

    return { error: "Erreur interne du serveur" };
  }
}