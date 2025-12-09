import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier envoyé" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 🔹 On passe le token ici
    const { url } = await put(
      `uploads/${Date.now()}-${file.name}`,
      buffer,
      {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN, 
      }
    );

    return NextResponse.json({ url });

  } catch (error) {
    console.error("Erreur Upload API :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
