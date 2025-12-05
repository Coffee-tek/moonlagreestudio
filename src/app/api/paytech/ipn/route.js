import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import achatPackService from "@/services/achatPackService"; // <-- Ton service

export async function POST(req) {
  try {
    const data = await req.json();

    /*
      PayTech renvoie typiquement :
      {
        "ref_command": "CMD_1735234567890",
        "status": "success",
        "custom_field": {
            "userId": "",
            "packId": ""
        }
      }
    */

    const { status, custom_field } = data;

    if (!custom_field) {
      return NextResponse.json({ message: "Missing custom fields" }, { status: 400 });
    }

    if (status !== "success") {
      return NextResponse.json({ message: "Paiement non validé" }, { status: 200 });
    }

    const { userId, packId } = custom_field;

    // Appel du service métier : crédit du wallet + création transaction
    await achatPackService.acheterPack({ userId, packId });

    return NextResponse.json({ message: "Paiement validé & pack crédité" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
