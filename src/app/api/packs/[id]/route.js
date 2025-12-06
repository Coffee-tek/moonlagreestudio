import { NextResponse } from "next/server";
import { createDefaultPack, getAllPacks } from "../../../../services/packService";

export async function GET() {
  const packs = await getAllPacks();
  return NextResponse.json(packs);
}

export async function POST(req) {
  const data = await req.json();
  const pack = await createDefaultPack(data);
  return NextResponse.json(pack);
}
