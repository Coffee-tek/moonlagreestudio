"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { updateUser } from "../../../lib/auth-client";
import PointManager from "../forms/PointManager";
import CreditManager from "../forms/CreditManager";
import { modifierPointsAction, modifierWalletAction } from "../../../actions/achatPackActions";


export default function UserWalletModal({ user, onClose, onSaveWallet }) {
  const [activeTab, setActiveTab] = useState("points");
  const [pointsData, setPointsData] = useState({ add: 0, remove: 0 });
  const [creditData, setCreditData] = useState({ add: 0, remove: 0 });
  const [wallet, setWallet] = useState({ points: 0, credit: 0 });
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (user) {
      setWallet({
        userId: user.id,
        points: user.wallet?.point || 0,
        credit: user.wallet?.credit || 0,
      });
    }
  }, [user]);

  // ===== POINTS =====
  const handlePointChange = (data) => {
    setPointsData(data);
  };

  const handleSavePoints = async () => {
    const addAmount = pointsData.add || 0;
    const removeAmount = pointsData.remove || 0;

    // Déterminer le type de modification
    let type = null;
    let montant = 0;

    if (addAmount > 0 && removeAmount > 0) {
      montant = addAmount - removeAmount;
      type = montant >= 0 ? "POINT_CREDIT" : "POINT_DEBIT";
      montant = Math.abs(montant);
    } else if (addAmount > 0) {
      type = "POINT_CREDIT";
      montant = addAmount;
    } else if (removeAmount > 0) {
      type = "POINT_DEBIT";
      montant = removeAmount;
    } else {
      toast.error("Aucun montant renseigné pour ajouter ou retirer des points !");
      return;
    }

    try {
      setIsPending(true);

      // ⚡ Appel de l'action serveur spécifique aux points
      const updatedWallet = await modifierPointsAction({
        userId: user.id,
        montant,
        type,
        description: type === "POINT_CREDIT" ? "Points ajoutés par admin" : "Points retirés par admin"
      });

      // Mettre à jour le wallet local
      setWallet(updatedWallet);
      toast.success("Points mis à jour !");

      // Notifier le parent pour recharger la page ou fermer le modal
      onSaveWallet(true);

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Erreur lors de la mise à jour des points");
    } finally {
      setIsPending(false);
    }
  };



  // ===== CREDIT =====
  const handleCreditChange = (data) => {
    setCreditData(data);
  };

  const handleSaveCredit = async () => {
    const addAmount = creditData.add || 0;
    const removeAmount = creditData.remove || 0;

    // Déterminer le type de modification
    let type = null;
    let montant = 0;

    if (addAmount > 0 && removeAmount > 0) {
      // Si les deux sont renseignés, on fait la différence
      montant = addAmount - removeAmount;
      type = montant >= 0 ? "CREDIT" : "DEBIT";
      montant = Math.abs(montant);
    } else if (addAmount > 0) {
      type = "CREDIT";
      montant = addAmount;
    } else if (removeAmount > 0) {
      type = "DEBIT";
      montant = removeAmount;
    } else {
      toast.error("Aucun montant renseigné pour créditer ou débiter !");
      return;
    }

    try {
      setIsPending(true);

      // Appel de l'action serveur
      const updatedWallet = await modifierWalletAction({
        userId: user.id,
        montant,
        type,
        description: type === "CREDIT" ? "Crédit ajouté par admin" : "Crédit retiré par admin"
      });

      // Mettre à jour le wallet local
      setWallet(updatedWallet);
      toast.success("Crédit mis à jour !");
      onSaveWallet(true);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Erreur lors de la mise à jour du crédit");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 rounded-4">
          {/* Header */}
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">Wallet utilisateur</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {/* Tabs */}
            {/* Tabs */}
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "points" ? "active-tab" : ""}`}
                  onClick={() => setActiveTab("points")}
                >
                  Gestion des Points
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "credit" ? "active-tab" : ""}`}
                  onClick={() => setActiveTab("credit")}
                >
                  Gestion des Crédits
                </button>
              </li>
            </ul>


            {/* Contenu des Tabs */}
            {activeTab === "points" && (
              <PointManager
                currentPoints={wallet.points}
                onChange={handlePointChange}
                onSubmit={handleSavePoints}
                isPending={isPending}
              />
            )}

            {activeTab === "credit" && (
              <CreditManager
                currentCredit={wallet.credit}
                onChange={handleCreditChange}
                onSubmit={handleSaveCredit}
                isPending={isPending}

              />
            )}



          </div>
        </div>
      </div>

      <style jsx>{`
  .modal {
    z-index: 1050;
  }
  .fw-semibold {
    font-weight: 600;
  }
  .nav-tabs .nav-link {
    cursor: pointer;
    background-color: #f5f5f5; /* fond par défaut */
    color: #000;
    margin-right: 5px;
    border-radius: 8px;
  }
  .nav-tabs .nav-link.active-tab {
    background-color: #0b0823; /* fond actif */
    color: #fff; /* texte blanc pour contraste */
    font-weight: 600;
  }
`}</style>

    </div>
  );
}
