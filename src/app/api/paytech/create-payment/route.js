import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, packId, amount, userTelephone, userName } = await req.json();

    if (!userId || !packId || !amount) {
      return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
    }

    const body = {
      item_name: `Pack #${packId}`,
      item_price: amount,
      currency: "XOF",
      ref_command: `CMD_${Date.now()}`,
      command_name: `PACK_${packId}_${Date.now()}`,
      env: process.env.PAYTECH_ENV,
      ipn_url: process.env.PAYTECH_CALLBACK_URL,
      success_url: process.env.PAYTECH_SUCCESS_URL,
      cancel_url: process.env.PAYTECH_CANCEL_URL,
      target_payment: "Orange Money, Wave, Carte Bancaire, Free Money" // toutes les méthodes
    };

    const response = await fetch(`${process.env.PAYTECH_BASE_URL}/payment/request-payment`, {
      method: "POST",
      headers: {
        "API_KEY": process.env.PAYTECH_API_KEY,
        "API_SECRET": process.env.PAYTECH_API_SECRET,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!result.success) {
      return NextResponse.json({ error: "PayTech error", details: result }, { status: 400 });
    }

    // On renvoie juste l'URL de redirection
    return NextResponse.json({
      redirect_url: result.redirect_url,
      token: result.token,
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
