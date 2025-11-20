import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "../../../lib/prisma";
import AdminReservation from "../../../components/admin/tables-reservations/AdminReservation";

// Fonction pour générer des utilisateurs fictifs


export default async function DashboardReservations() {

  const h = await headers();
  const session = await auth.api.getSession({
    headers: h,
  });

  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    }
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

  const reservations = await prisma.reservation.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          telephone: true,
        },
      },
      seance: {
        select: {
          id: true,
          titre: true,
          date: true,
          heure: true,
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });



  // console.log(reservations);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Gestion /</span> Utilisateurs
      </h4>

      {/* <AdminUsersTest user={users} /> */}
      <AdminReservation reservation={reservations} />
    </div>
  );
}