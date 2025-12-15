"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentRedirectClient({ }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState(null); // success / cancel
  const [message, setMessage] = useState("");

  useEffect(() => {
    const payStatus = searchParams.get("status"); // success / cancel
    const msg = searchParams.get("message");

    setStatus(payStatus);
    setMessage(
      msg || (payStatus === "success" ? "Paiement réussi !" : "Paiement annulé ou échoué !")
    );

    // Redirection automatique après 3 secondes
    // const timer = setTimeout(() => {
    //   router.push("/user/profil-settings");
    // }, 3000);

    // return () => clearTimeout(timer);
  }, [searchParams, router]);

  const renderIcon = () => {
    if (status === "success") return <span className="text-green-600 text-6xl">✔️</span>;
    if (status === "cancel") return <span className="text-red-600 text-6xl">❌</span>;
    return null;
  };

  return (
    <div className="col-lg-8 ps-lg-0">
      {status ? (
        <div className="text-center m-6">
          {renderIcon()}
          <h2 className="mt-4 text-xl font-semibold">{message}</h2>
          <p className="text-gray-500 mt-2">Vous allez être redirigé vers votre profil…</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Traitement du paiement… Veuillez patienter</p>
      )}

      {/* Toujours afficher le solde et transactions */}
      
    </div>
  );
}
