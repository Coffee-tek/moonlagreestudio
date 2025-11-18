import { NextResponse } from "next/server";
import { achatPackService } from "@/services/achatPackService";

export async function POST(req) {
  try {
    const { userId, packId } = await req.json();
    const wallet = await achatPackService.acheterPack({ userId, packId });
    return NextResponse.json(wallet);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
