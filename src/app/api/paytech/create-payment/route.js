import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("📩 [API] Requête reçue sur /api/paytech/request-payment");

  try {
    const data = await req.json();
    console.log("📝 [API] Body reçu :", data);

    const { userId, packId, amount, userTelephone, userName } = data;

    console.log("🔍 [API] Vérification des paramètres...");
    if (!userId || !packId || !amount) {
      console.log("❌ [API] Paramètres manquants !");
      return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
    }

    const refCommand = `CMD_${Date.now()}`;

    const body = {
      item_name: `Pack #${packId}`,
      item_price: amount,
      currency: "XOF",

      ref_command: refCommand,
      command_name: `PACK_${packId}_${refCommand}`,

      custom_field: JSON.stringify({
        userId,
        packId,
      }),

      env: process.env.PAYTECH_ENV,
      ipn_url: process.env.PAYTECH_CALLBACK_URL,
      success_url: process.env.PAYTECH_SUCCESS_URL,
      cancel_url: process.env.PAYTECH_CANCEL_URL,

      target_payment: "Orange Money, Wave, Carte Bancaire, Free Money",
    };

    console.log("📦 [API] Payload envoyé à PayTech :", body);

    console.log("🌐 [API] Envoi de la requête à PayTech :", `${process.env.PAYTECH_BASE_URL}/payment/request-payment`);

    const response = await fetch(`${process.env.PAYTECH_BASE_URL}/payment/request-payment`, {
      method: "POST",
      headers: {
        "API_KEY": process.env.PAYTECH_API_KEY,
        "API_SECRET": process.env.PAYTECH_API_SECRET,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("📨 [API] Réponse brute PayTech reçue :", response);

    const result = await response.json();
    console.log("📄 [API] JSON PayTech :", result);

    if (!result.success) {
      console.log("❌ [API] Erreur PayTech :", result);
      return NextResponse.json({ error: "PayTech error", details: result }, { status: 400 });
    }

    console.log("✅ [API] Paiement créé avec succès :", {
      redirect_url: result.redirect_url,
      token: result.token
    });

    return NextResponse.json({
      redirect_url: result.redirect_url,
      token: result.token,
    });

  } catch (error) {
    console.error("🔥 [API] Erreur interne :", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
