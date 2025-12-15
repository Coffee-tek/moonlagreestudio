

import { headers } from "next/headers";
import PaymentRedirectClient from "../../../components/user/payment-redirect/PaymentRedirectClient";
import { Sidebar } from "../../../components/user/sidebar";
import { auth } from "../../../lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function PaymentRedirectPage() {
  const h = headers();
  const session = await auth.api.getSession({ headers: h });

  if (!session) {
    redirect("/auth/connexion");
  }


  return (
    <div className="row">
      {/* Sidebar */}
      <Sidebar users={session.user} />
      <Suspense fallback={<p className="text-center mt-20">Chargement…</p>}>
        <PaymentRedirectClient />
      </Suspense>

    </div>
  );
}
