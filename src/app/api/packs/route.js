import { NextResponse } from "next/server";
import { updatePack, deletePack } from "../../../services/packService";;


// export async function GET(_, { params }) {
//   const pack = await getPackById(params.id);
//   return NextResponse.json(pack);
// }

export async function PUT(req, { params }) {
  const data = await req.json();
  const pack = await updatePack(params.id, data);
  return NextResponse.json(pack);
}

export async function DELETE(_, { params }) {
  await deletePack(params.id);
  return NextResponse.json({ success: true });
}
