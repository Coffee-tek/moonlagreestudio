"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { annulerReservationAction } from "../../../actions/reservationActions";

export default function SessionCard({ session, sessions, setSessions }) {
  const [isPending, startTransition] = useTransition();

  const handleCancel = (reservationId) => {
    startTransition(async () => {
      try {
        const result = await annulerReservationAction(reservationId);

        if (result.error) throw new Error(result.error);

        toast.success("Réservation annulée !");

        // Met à jour le state côté parent
        setSessions((prev) =>
          prev.map((s) =>
            s.reservationId === reservationId
              ? { ...s, statut: "annule" }
              : s
          )
        );
      } catch (err) {
        toast.error("Échec de l’annulation");
        console.error(err);
      }
    });
  };

  return (
    <div className="pb-4 border-bottom mb-4">
      <div className="row">
        <div className="col-xl-2 col-lg-3 col-md-3 col-4">
          <img
            src={session.image || "/img/seances/5.png"}
            className="img-fluid rounded-3"
            style={{ height: "100%", objectFit: "cover" }}
            alt={session.titre}
          />
        </div>

        <div className="col-xl-10 col-lg-9 col-md-9 col-8">
          <div className="card-body d-flex align-items-start justify-content-between">
            <div>
              <span className="badge bg-light text-dark mb-2">
                Seance {session.statut}
              </span>
              <h6 className="fw-bold">{session.titre}</h6>
              <div>
                <small className="text-secondary me-3">
                  Date : {new Date(session.date).toLocaleDateString()}
                </small>
                <small className="text-secondary me-3">
                  Heure : {new Date(session.heure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </small>
                <small className="text-secondary">Crédits : {session.credits}</small>
              </div>
              <h6 className="fw-semibold mt-2">
                Coach : {session.coatch || "N/A"}
              </h6>
              {session.modePaiement === "sur_place" && (
                <span className="badge bg-danger text-white mt-2 d-inline-block">
                  Séance à payer sur place
                </span>
              )}

              {session.modePaiement === "en_ligne" && (
                <span className="badge bg-success text-white mt-2 d-inline-block">
                  Séance déjà payée
                </span>
              )}
            </div>

            {session.status === "Expirée" ? (
              <button
                className="btn btn-secondary rounded-pill"
                disabled
              >
                Expirée
              </button>
            ) : (
              (session.statut === "en_attente" || session.statut === "confirme") && (
                <button
                  className="btn btn-danger rounded-pill"
                  onClick={() => handleCancel(session.reservationId)}
                  disabled={isPending}
                >
                  {isPending ? "Annulation..." : "Annuler"}
                </button>
              )
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
