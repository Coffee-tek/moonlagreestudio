import { NextResponse } from "next/server";
import { getAllPacks, createPack } from "@/services/packService";

export async function GET() {
  const packs = await getAllPacks();
  return NextResponse.json(packs);
}

export async function POST(req) {
  const data = await req.json();
  const pack = await createPack(data);
  return NextResponse.json(pack);
}
