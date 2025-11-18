import { Sidebar } from "@/components/user/sidebar";
import MesSessionsClient from "../../../components/user/mes-sessions/MesSessionsClient";
import prisma from "../../../lib/prisma";
import { headers } from "next/headers";
import { auth } from "../../../lib/auth";
import { redirect } from "next/navigation";

// import "bootstrap-icons/font/bootstrap-icons.css";

export default async function MesSessionsPage() {

    const h = headers();
    const session = await auth.api.getSession({
        headers: h,
    });

    if (!session) {
        redirect("/auth/connexion");
    }

    // Récupère les séances réservées par le client
    const seances = await prisma.seance.findMany({
        where: {
            reservations: {
                some: {
                    userId: session.user.id,
                },
            },
        },
        include: {
            reservations: true, // inclut les réservations
        },
        orderBy: { date: "desc" },
    });

    console.log("donnes seances:", seances);


    return (
        <div className="row">
            {/* Sidebar */}
            <Sidebar users={session.user} />


            {/* Composant client */}
            <MesSessionsClient seances={seances} />
        </div>
    );
}
