import { Sidebar } from "@/components/user/sidebar";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import MesCreditsClient from "../../../components/user/mes-credits/MesCreditsClient";

export default async function MesCreditsPage() {
  const h = headers();
  const session = await auth.api.getSession({ headers: h });

  if (!session) {
    redirect("/auth/connexion");
  }

  // 🔹 Récupérer le user, son wallet et ses transactions liées
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      wallet: {
        include: {
          transactions: {
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  if (!user) {
    redirect("/auth/connexion");
  }

  const wallet = user.wallet;
  const transactions = wallet?.transactions || [];

  return (
    <div className="row">
      <Sidebar users={session.user} />
      <MesCreditsClient user={user} wallet={wallet} transactions={transactions} />
    </div>
  );
}
