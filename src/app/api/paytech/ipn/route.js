// app/api/paytech/ipn/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { achatPackService } from "../../../../services/achatPackService";

export async function POST(req) {
  try {
    // 🔹 Lire le body brut (form-urlencoded)
    const rawBody = await req.text();
    console.log("IPN rawBody:", rawBody);

    // 🔹 Convertir en objet JS
    const data = Object.fromEntries(new URLSearchParams(rawBody));
    console.log("IPN parsed data:", data);

    const { status, custom_field, ref_command } = data;

    if (!ref_command) {
      console.log("❌ ref_command manquant");
      return NextResponse.json({ message: "ref_command manquant" }, { status: 200 });
    }

    if (status !== "success") {
      console.log("❌ Paiement non validé pour ref_command:", ref_command);
      return NextResponse.json({ message: "Paiement non validé" }, { status: 200 });
    }

    // 🔐 Anti double paiement
    const alreadyProcessed = await prisma.transaction.findFirst({
      where: {
        description: {
          contains: ref_command,
        },
      },
    });

    if (alreadyProcessed) {
      console.log("⚠️ Paiement déjà traité pour ref_command:", ref_command);
      return NextResponse.json({ message: "Paiement déjà traité" }, { status: 200 });
    }

    // 🔹 Parsing sécurisé du custom_field
    let customData;
    try {
      customData =
        typeof custom_field === "string"
          ? JSON.parse(custom_field)
          : custom_field;
      console.log("customData parsed:", customData);
    } catch (err) {
      console.log("❌ custom_field invalide:", custom_field, err);
      return NextResponse.json({ message: "custom_field invalide" }, { status: 200 });
    }

    const { userId, packId } = customData;

    if (!userId || !packId) {
      console.log("❌ Données métier manquantes:", customData);
      return NextResponse.json({ message: "Données métier manquantes" }, { status: 200 });
    }

    // 👉 Appel métier
    console.log("✅ Appel achatPackService avec:", { userId, packId });
    await achatPackService.acheterPack({ userId, packId });

    console.log("✅ Paiement validé & pack crédité pour ref_command:", ref_command);
    return NextResponse.json({ message: "Paiement validé & pack crédité" }, { status: 200 });

  } catch (error) {
    console.error("❌ IPN PayTech error:", error);
    return NextResponse.json({ message: "Erreur IPN" }, { status: 200 });
  }
}
