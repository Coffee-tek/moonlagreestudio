import { headers } from "next/headers";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminPlanning from "../../../components/admin/planning-tables/AdminPlanning";
import prisma from "../../../lib/prisma";
import { seanceService } from "../../../services/ seanceService";

export default async function DashboardPlanning() {

  const h = await headers();
  const session = await auth.api.getSession({
    headers: h,
  });

  if (!session) {
    redirect("/auth/connexion");
  }


  if (session.user.role !== "admin") {
    return (
      <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">
            FORBIDDEN
          </p>
        </div>
      </div>
    );
  }
  // const seances = await prisma.seance.findMany({
  //   orderBy: { date: "desc" },
  // });
  const seances = await seanceService.getAll();
  // console.log("donnee du serveur:",seances);
  

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Gestion /</span> Planning des Sessions
      </h4>
      <AdminPlanning seances={seances} />

    </div>
  );
}