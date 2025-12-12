import { Sidebar } from "@/components/user/sidebar";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import MesCreditsClient from "../../../components/user/mes-credits/MesCreditsClient";
import { achatPackService } from "../../../services/achatPackService";

export default async function MesCreditsPage() {
  const h = headers();
  const session = await auth.api.getSession({ headers: h });

  if (!session) {
    redirect("/auth/connexion");
  }

  // 🔹 Récupérer le wallet et vérifier expiration
  const wallet = await achatPackService.verifierExpirationWallet(session.user.id);

  // 🔹 Récupérer le user et ses transactions
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      wallet: {
        include: {
          transactions: {
            where: { category: "credits" },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  if (!user) {
    redirect("/auth/connexion");
  }

  const transactions = user?.wallet?.transactions || [];

  return (
    <div className="row">
      <Sidebar users={session.user} />
      <MesCreditsClient user={user} wallet={wallet} transactions={transactions} />
    </div>
  );
}
