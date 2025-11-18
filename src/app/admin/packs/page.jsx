import { auth } from "@/lib/auth";
import AdminPacks from "../../../components/admin/packs/AdminPacks";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAllPacks } from "../../../services/packService";
import "../styles/css/pack-edit-modal.css"


export default async function DashboardPack() {
  const h = await headers();
  const session = await auth.api.getSession({
    headers: h,
  });

  if (!session) {
    redirect("/auth/connexion");
  }

  const packs = await getAllPacks();

  return (
    <>
      <AdminPacks initialPacks={packs} />
    </>
  );
}