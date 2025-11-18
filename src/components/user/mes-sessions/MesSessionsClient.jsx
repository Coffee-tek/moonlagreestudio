"use client";

import { useState, useTransition } from "react";
import SessionTabs from "./SessionTabs";
import { toast } from "sonner";
import { annulerReservationAction } from "../../../actions/reservationActions";

export default function MesSessionsClient({ seances }) {
    const [activeTab, setActiveTab] = useState("reserved");
    const [isPending, startTransition] = useTransition();

    // Transforme les séances pour ajouter le statut de la réservation de ce client
    // const sessions = seances.map((s) => {
    //     const reservation = s.reservations[0]; // suppose 1 réservation par client
    //     return {
    //         ...s,
    //         statut: reservation?.statut || "en_attente",
    //         modePaiement: reservation?.modePaiement,
    //         reservationId: reservation?.id,
    //         heure_reservation: resevervation?.created_at,
    //     };
    // });

    const [sessions, setSessions] = useState(() => {
        return seances.flatMap((s) =>
            s.reservations.map((res) => ({
                ...s,
                statut: res.statut || "en_attente",
                modePaiement: res.modePaiement,
                reservationId: res.id,
                heure_reservation: res.createdAt,
            }))
        );
    });
    console.log("donnee flitre", sessions);

    // Action : annuler une séance



    return (
        <div className="col-lg-8 ps-lg-0">
            <div className="ps-lg-5 pt-lg-5">
                <div className="d-flex align-items-center justify-content-between w-100 mb-5">
                    <h1 className="m-0 fw-bold">Mes Sessions</h1>
                </div>

                <SessionTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    sessions={sessions}
                    setSessions={setSessions}

                />
            </div>
        </div>
    );
}
