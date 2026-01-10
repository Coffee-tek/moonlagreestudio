"use client";
import { toast } from "sonner";
import { acheterPackAction } from "../../../actions/achatPackActions";
import "./../styles/PackPackCardRemake.css";
import { useEffect, useState } from "react";


export default function PackPackCardRemake({ pack, user }) {
    // const [isPending, setIsPending] = useState(false);

    const getThemeColor = (theme) => {
        switch (theme?.toLowerCase()) {
            case "success":
                return "#0a4d0ade";
            case "purple":
                return "#580758";
            case "warning":
                return "#bb7a01";
            case "danger":
                return "#660909";
            case "primary":
                return "#062c54";
            case "info":
                return "#127f90";
            default:
                return "#000"; // couleur par défaut
        }
    };

    const [PayTechLoaded, setPayTechLoaded] = useState(false);
    const [isPending, setIsPending] = useState(false);

    // Charger le SDK PayTech côté client
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://paytech.sn/cdn/paytech.min.js";
        script.async = true;
        script.onload = () => setPayTechLoaded(true);
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 🚀 Acheter un pack
    // const handleSavePack = async (e) => {
    //     e.preventDefault();

    //     if (!user) {
    //         return toast.error("Veuillez vous connecter pour acheter un pack.");
    //     }

    //     try {
    //         setIsPending(true);
    //         // Appel de ton server action
    //         const result = await acheterPackAction({
    //             userId: user.id,
    //             packId: pack.id
    //         });

    //         toast.success("Pack acheté avec succès !");
    //         // console.log("Wallet mis à jour :", result);
    //         setTimeout(() => {
    //             window.location.href = "/user/mes-credits";
    //         }, 1000);

    //     } catch (error) {
    //         // console.error("Erreur achat pack :", error);
    //         toast.error(error.message || "Une erreur est survenue pendant l'achat");
    //     } finally {
    //         setIsPending(false); // 🔥 Désactive le chargement
    //     }
    // };

    const payerPack = async () => {
        if (!user) {
            toast.error("Veuillez vous connecter pour acheter un pack.");
            return;
        }

        setIsPending(true);

        // ✅ Calcul du montant
        const amount =
            pack.promotion && pack.promotion > 0
                ? pack.promotion
                : pack.prix;

        try {
            const res = await fetch("/api/paytech/create-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    packId: pack.id,
                    amount,
                    userTelephone: user.telephone,
                    userName: user.name,
                }),
            });

            const data = await res.json();

            // ⛔ Achat bloqué AVANT PayTech
            if (!data.success) {
                toast.error(data.message || "Achat impossible");
                return;
            }

            // ✅ OK → redirection
            toast.info("Redirection vers la page de paiement...");
            window.location.href = data.redirect_url;

        } catch (error) {
            console.error(error);
            toast.error("Erreur réseau lors de la création du paiement");
        } finally {
            setIsPending(false);
        }
    };



    // const payerPack = async () => {
    //     if (!user) return toast.error("Veuillez vous connecter.");
    //     if (!PayTechLoaded) return toast.error("Le SDK PayTech n'est pas encore chargé.");

    //     setIsPending(true);

    //     try {
    //         // 1️⃣ Créer le paiement côté serveur et récupérer le token / redirect_url
    //         const res = await fetch("/api/paytech/create-payment", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 userId: user.id,
    //                 packId: pack.id,
    //                 amount: pack.prix,
    //                 userTelephone: user.telephone,
    //                 userName: user.name,
    //             }),
    //         });

    //         const data = await res.json();

    //         if (data.token) {
    //             // Utiliser directement le token, PAS besoin de requestTokenUrl
    //             new PayTech({ idTransaction: data.token })
    //                 .withOption({
    //                     presentationMode: PayTech.OPEN_IN_POPUP,
    //                     didReceiveError: (error) => toast.error("Erreur PayTech: " + error),
    //                     didReceiveNonSuccessResponse: (resp) => toast.error(resp.message),
    //                 })
    //                 .send();

    //         } else if (data.redirect_url) {
    //             // Fallback si le token n'existe pas ou pour mobile
    //             toast.info("Redirection vers la page de paiement...");
    //             window.location.href = data.redirect_url;
    //         } else {
    //             toast.error(data.message || "Erreur lors de la création du paiement");
    //         }
    //     } catch (err) {
    //         console.error("Erreur réseau / serveur:", err);
    //         toast.error("Erreur lors de la création du paiement");
    //     } finally {
    //         setIsPending(false);
    //     }
    // };


    //une fonction qui recupere le pack.theme et remvoie la couleur pour le style
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="pricing-card">
                <div className="card-header-custom"
                    style={{ backgroundColor: pack?.theme_color ?? "000" }}
                >
                    <i className="ri-refresh-line icon-header"></i>
                    <h2>{pack.titre}</h2>
                </div>

                <div className="card-body-custom">
                    <div className="credits-section" >
                        {/* <div className="credits-value" style={{ color: getThemeColor(pack?.theme_color) }}>{pack.credits}</div>
                         */}
                        <div className="credits-value" style={{ color: pack?.theme_color ?? "000" }}>{pack.credits}</div>
                        <div className="credits-label">crédits</div>
                    </div>

                    <div className="price-section">
                        {pack.promotion && pack.promotion > 0 ? (
                            <>
                                <div className="price-old">
                                    {pack.prix.toLocaleString()} FCFA
                                </div>
                                <div className="price-main" style={{ color: pack?.theme_color ?? "000" }}>
                                    {pack.promotion.toLocaleString()} FCFA
                                </div>
                            </>
                        ) : (
                            <div className="price-main" style={{ color: pack?.theme_color ?? "000" }}>
                                {pack.prix.toLocaleString()} FCFA
                            </div>
                        )}
                        <div className="price-label">Prix</div>
                    </div>


                    <ul className="features-list">

                        <li>Rechargement instantané</li>
                        <li>Crédits valables {pack.duree} jours</li>
                        <li>Support client </li>
                        <li> 1 Crédit = 1 Séance</li>
                    </ul>

                    <div style={{ color: pack?.theme_color ?? "000" }}>
                        {pack.description && (
                            <p>
                                {pack.description}
                            </p>
                        )
                        }

                    </div>
                    <button
                        className="btn-buy-custom"
                        style={{ backgroundColor: pack?.theme_color ?? "000" }}
                        onClick={payerPack}
                        disabled={isPending}
                    >
                        {isPending ? "En cours ..." : "Recharger"}
                    </button>

                </div>
            </div>
        </div>
    );
}