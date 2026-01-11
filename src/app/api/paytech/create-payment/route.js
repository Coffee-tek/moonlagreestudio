import { NextResponse } from "next/server";
import { achatPackService } from "../../../../services/achatPackService";

export async function POST(req) {
  console.log("hey");

  try {
    const data = await req.json();
    const { userId, packId, amount } = data;

    if (!userId || !packId || !amount) {
      return NextResponse.json(
        { success: false, message: "Paramètres manquants" },
        { status: 400 }
      );
    }

    // ✅ VERIFICATION AVANT PAIEMENT
    try {
      await achatPackService.verifierEligibiliteAchat(userId, packId);
    } catch (err) {
      console.warn("⛔ Achat bloqué avant PayTech :", err.message);

      return NextResponse.json(
        {
          success: false,
          code: "NOT_ELIGIBLE",
          message: err.message,
        },
        { status: 403 }
      );
    }

    // 🔥 SI OK → on appelle PayTech
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
      custom_field: JSON.stringify({ userId, packId }),
    };

    //log pour debugger
    console.log("📤 Requête PayTech:", {
      url: `${process.env.PAYTECH_BASE_URL}/payment/request-payment`,
      hasApiKey: !!process.env.PAYTECH_API_KEY,
      hasApiSecret: !!process.env.PAYTECH_API_SECRET,
      body
    });

    const response = await fetch(
      `${process.env.PAYTECH_BASE_URL}/payment/request-payment`,
      {
        method: "POST",
        headers: {
          API_KEY: process.env.PAYTECH_API_KEY,
          API_SECRET: process.env.PAYTECH_API_SECRET,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();

    // 🔍 LOG DE LA RÉPONSE
    console.log("📥 Réponse PayTech:", {
      status: response.status,
      success: result.success,
      redirect_url: result.redirect_url,
      fullResult: result
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Erreur PayTech", details: result },
        { status: 400 }
      );
    }

    console.log("📥 Réponse complète PayTech:", JSON.stringify(result, null, 2));

    return NextResponse.json({
      success: true,
      redirect_url: result.redirect_url,
      token: result.token,
    });

  } catch (error) {
    console.error("🔥 create-payment error :", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}
