import { seanceService } from "@/services/seanceService";

export async function GET(req, { params }) {
  const seance = await seanceService.getById(params.id);
  return new Response(JSON.stringify(seance), { status: 200 });
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const updated = await seanceService.update(params.id, body);
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req, { params }) {
  await seanceService.delete(params.id);
  return new Response(null, { status: 204 });
}
