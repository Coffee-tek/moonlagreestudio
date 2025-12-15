// app/api/paytech/ipn/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("✅ IPN PAYTECH REÇU");
    console.log(body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ ERREUR IPN", error);
    return NextResponse.json({ error: "IPN error" }, { status: 500 });
  }
}
