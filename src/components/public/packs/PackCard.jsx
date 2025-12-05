"use client";
import Link from "next/link";

export default function PackCard({ pack, user }) {

    return (
        <div className="col-12 col-md-6 col-lg-3">
            <div className="card shadow-sm border-0 h-100 text-center p-3">
                {/* Logo + Titre */}
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                    <i className="ri-refresh-line fs-3 text-primary"></i>
                    {/* <h6 className="m-0 fw-bold">Pack {pack.titre}</h6> */}
                    <h6 className="m-0 fw-bold">{pack.titre}</h6>
                </div>

                {/* Contenu */}
                <hr />
                <h4 className="fw-bold">{pack.credits}</h4>
                <p className="text-muted">crédits</p>

                {/* Affichage du prix (objet ou nombre) */}

                {pack.promotion && pack.promotion > 0 ? (
                    <>
                        <h6 className="text-muted" style={{ textDecoration: "line-through" }}>
                            {pack.prix.toLocaleString()} FCFA
                        </h6>
                        <h5 className="fw-bold">{pack.promotion.toLocaleString()} FCFA</h5>
                    </>
                ) : (
                    <h5 className="fw-bold">{pack.prix.toLocaleString()} FCFA</h5>
                )}

                {/* Bouton */}
                <Link href="#" className="btn btn-primary rounded-pill mt-3 w-100">
                    Recharger
                </Link>
            </div>
        </div>
    );
}
