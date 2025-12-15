import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { achatPackService } from "../../../../services/achatPackService";

export async function POST(req) {
  try {
    // ✅ PayTech envoie du form-urlencoded
    const rawBody = await req.text();
    const data = Object.fromEntries(new URLSearchParams(rawBody));

    const { status, custom_field, ref_command } = data;

    if (!ref_command) {
      return NextResponse.json({ message: "ref_command manquant" }, { status: 200 });
    }

    if (status !== "success") {
      return NextResponse.json({ message: "Paiement non validé" }, { status: 200 });
    }

    // 🔐 Anti double paiement (très bien 👍)
    const alreadyProcessed = await prisma.transaction.findFirst({
      where: {
        description: {
          contains: ref_command,
        },
      },
    });

    if (alreadyProcessed) {
      return NextResponse.json({ message: "Paiement déjà traité" }, { status: 200 });
    }

    // 🔐 Parsing sécurisé du custom_field
    let customData;
    try {
      customData =
        typeof custom_field === "string"
          ? JSON.parse(custom_field)
          : custom_field;
    } catch {
      return NextResponse.json({ message: "custom_field invalide" }, { status: 200 });
    }

    const { userId, packId } = customData;

    if (!userId || !packId) {
      return NextResponse.json({ message: "Données métier manquantes" }, { status: 200 });
    }

    // 👉 Logique métier
    await achatPackService.acheterPack({ userId, packId });

    return NextResponse.json(
      { message: "Paiement validé & pack crédité" },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ IPN PayTech error:", error);
    return NextResponse.json({ message: "Erreur IPN" }, { status: 200 });
  }
}
