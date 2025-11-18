
import React from "react";
import AdminUsers from "../../../components/admin/tables-users/AdminUsers";
import AdminUsersTest from "../../../components/admin/tables-users/AdminUsersTest";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "../../../lib/prisma";

// Fonction pour générer des utilisateurs fictifs


export default async function DashboardUsers() {

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


  // const users = await prisma.user.findMany({
  //   orderBy: {
  //     name: "asc",
  //   }
  // });

  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
    include: {
      wallet: true, // 🔥 récupère le wallet associé
    },
  });
  // console.log(users);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Gestion /</span> Utilisateurs
      </h4>

      <AdminUsersTest user={users} />


    </div>
  );
}