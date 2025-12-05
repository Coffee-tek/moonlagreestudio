"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
xs
export default function PaymentRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // PayTech peut ajouter des params comme ?status=success ou ?status=cancel
    const status = searchParams.get("status"); // success / cancel
    const message = searchParams.get("message"); // optionnel, si PayTech envoie

    if (status === "success") {
      toast.success(message || "Paiement réussi !");
    } else {
      toast.error(message || "Paiement annulé ou échoué !");
    }

    // Redirection automatique après 3 secondes
    const timer = setTimeout(() => {
      router.push("/dashboard"); // ta page principale
    }, 3000);

    return () => clearTimeout(timer);
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <p>Traitement du paiement… Veuillez patienter</p>
    </div>
  );
}
