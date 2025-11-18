import { NextResponse } from "next/server";
import { reserverSeanceAction } from "@/actions/reservationActions";

export async function POST(req) {
  try {
    const { userId, seanceId, modePaiement } = await req.json();

    if (!userId || !seanceId || !modePaiement) {
      return NextResponse.json({ success: false, error: "Données manquantes." }, { status: 400 });
    }

    const result = await reserverSeanceAction(userId, seanceId, modePaiement);

    if (result.success) {
      return NextResponse.json({ success: true, data: result.data });
    } else {
      return NextResponse.json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error("Erreur API réservation:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
