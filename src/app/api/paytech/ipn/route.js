// app/api/paytech/ipn/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { achatPackService } from "../../../../services/achatPackService";

export async function POST(req) {
  try {
    // 🔹 Lire le body brut (PayTech = form-urlencoded)
    const rawBody = await req.text();
    console.log("📩 IPN rawBody:", rawBody);

    // 🔹 Convertir en objet JS
    const data = Object.fromEntries(new URLSearchParams(rawBody));
    console.log("📦 IPN parsed data:", data);

    const { type_event, custom_field, ref_command } = data;

    // 🔴 Vérification ref_command
    if (!ref_command) {
      console.log("❌ ref_command manquant");
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    // 🔴 Vérification paiement validé (PayTech)
    console.log("🧪 type_event reçu =", type_event);

    if (type_event !== "sale_complete") {
      console.log("❌ Paiement NON validé:", {
        ref_command,
        type_event,
      });
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    console.log("✅ Paiement VALIDÉ par PayTech :", ref_command);

    // 🔐 Anti double paiement
    const alreadyProcessed = await prisma.transaction.findFirst({
      where: {
        description: {
          contains: ref_command,
        },
      },
    });

    if (alreadyProcessed) {
      console.log("⚠️ Paiement déjà traité:", ref_command);
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // 🔹 Parsing custom_field
    if (!custom_field) {
      console.log("❌ custom_field vide");
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    let customData;
    try {
      customData =
        typeof custom_field === "string"
          ? JSON.parse(custom_field)
          : custom_field;

      console.log("🧩 customData parsé:", customData);
    } catch (err) {
      console.log("❌ custom_field invalide:", custom_field, err);
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    const { userId, packId } = customData;

    if (!userId || !packId) {
      console.log("❌ Données métier manquantes:", customData);
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    // // 👉 Logique métier
    // console.log("🚀 Appel achatPackService:", { userId, packId });
    // await achatPackService.acheterPack({ userId, packId });

    // console.log("🎉 Pack crédité avec succès :", {
    //   ref_command,
    //   userId,
    //   packId,
    // });

    ////// debut 

    // 🔹 Logique métier + email
    console.log("🚀 Appel achatPackService:", { userId, packId });

    // Récupérer l'utilisateur pour envoyer email
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user?.email) {
      console.log("❌ Utilisateur ou email introuvable");
      return NextResponse.json({ ok: false, error: "Email introuvable" });
    }

    let updatedWallet;
    try {
      // 🔹 Tenter d’acheter/créditer le pack
      updatedWallet = await achatPackService.acheterPack({ userId, packId });

      // ✅ Paiement + crédit OK → email confirmation
      await sendEmailAction({
        to: user.email,
        subject: "Confirmation d'achat de crédit",
        meta: {
          description: `Votre achat du pack a été confirmé. Vous avez maintenant ${updatedWallet.credit} crédits disponibles.`,
          link: `${process.env.NEXT_PUBLIC_URL}/mon-wallet`,
        },
      });

      console.log("📧 Email confirmation envoyé :", user.email);

    } catch (err) {
      console.error("❌ Paiement OK mais échec créditation :", err);

      // 🔹 Email échec → contacter support
      await sendEmailAction({
        to: user.email,
        subject: "Problème lors de la créditation",
        meta: {
          description: `Votre paiement a été reçu mais nous n'avons pas pu créditer votre compte automatiquement. Veuillez contacter le support pour finaliser votre crédit.`,
          link: `${process.env.NEXT_PUBLIC_URL}/support`,
        },
      });

      // Optionnel : loguer ou créer alerte pour support
    }

    console.log("🎉 Traitement IPN terminé :", { ref_command, userId, packId });

    ////// fin 

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (error) {
    console.error("💥 ERREUR IPN PayTech:", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
