import { seanceService } from "@/services/seanceService";

export async function GET(req) {
  const seances = await seanceService.getAll();
  return new Response(JSON.stringify(seances), { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  const seance = await seanceService.create(body);
  return new Response(JSON.stringify(seance), { status: 201 });
}
