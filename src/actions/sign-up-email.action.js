"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { APIError } from "better-auth/api";

export async function signUpEmailAction(formData) {
  const nom = formData.get("nom")?.toString().trim();
  const prenom = formData.get("prenom")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const ville = formData.get("ville")?.toString().trim();
  const telephone = formData.get("telephone")?.toString().trim();
  // const dateNaissanceStr = formData.get("dateNaissance")?.toString();
  // const dateNaissance = dateNaissanceStr ? new Date(dateNaissanceStr) : null;

  
  

  if (!nom || !prenom || !email || !password || !telephone) {
    return { error: "Veuillez remplir tous les champs obligatoires." };

  }

  try {
    // 1️⃣ Créer l'utilisateur via Better Auth
    const response = await auth.api.signUpEmail({
      body: { name: `${nom} ${prenom}`, email, password },
    });

    const user = response?.data?.user || response?.user;
    if (!user) throw new Error("Utilisateur non trouvé après l'inscription");

    // 2️⃣ Mettre à jour les infos client dans Prisma
    await prisma.user.update({
      where: { id: user.id },
      data: {
        ville,
        telephone,
      },
    });

    // 3️⃣ Créer le Wallet vide
    await prisma.wallet.create({
      data: {
        userId: user.id,
        credit: 0,
        point: 0,
      },
    });

    return { error: null };
  } catch (err) {
    console.error("Erreur inscription:", err);

    if (err instanceof APIError) return { error: err.message || "Erreur API Better Auth" };
    if (err instanceof Error) return { error: err.message };
    return { error: "Erreur interne du serveur" };
  }
}
