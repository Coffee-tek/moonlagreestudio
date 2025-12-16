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

    // 👉 Logique métier
    console.log("🚀 Appel achatPackService:", { userId, packId });
    await achatPackService.acheterPack({ userId, packId });

    console.log("🎉 Pack crédité avec succès :", {
      ref_command,
      userId,
      packId,
    });

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (error) {
    console.error("💥 ERREUR IPN PayTech:", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
