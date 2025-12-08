"use client";
import { toast } from "sonner";
import { acheterPackAction } from "../../../actions/achatPackActions";
import "./../styles/PackPackCardRemake.css";
import { useState } from "react";


export default function PackPackCardRemake({ pack, user }) {
    const [isPending, setIsPending] = useState(false);

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
            return toast.error("Veuillez vous connecter pour acheter un pack.");
        }

        setIsPending(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paytech/create-payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    packId: pack.id,
                    amount: pack.prix,
                    userTelephone: user.telephone,
                    userName: user.name,
                }),
            });

            const data = await res.json();

            if (data.redirect_url) {
                toast.info("Redirection vers la page de paiement...");
                window.location.href = data.redirect_url;
            } else {
                toast.error(data.message || "Erreur lors de la création du paiement");
            }
        } catch (error) {
            console.error(error);
            toast.error("Erreur réseau lors de la création du paiement");
        } finally {
            setIsPending(false);
        }
    };



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
                        <li>Support client 24/7</li>
                        <li>Le nombre de crédits est égal au <br/> nombre de séances</li>
                    </ul>
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