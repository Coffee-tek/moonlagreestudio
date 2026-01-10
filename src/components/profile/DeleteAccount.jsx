"use client"

import { useState } from "react";

function DeleteAccount() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const handleDeleteAccount = () => {
        setShowDeleteModal(false); // on ferme le modal
        // Ta logique de suppression réelle ici (API, etc.)
        setSuccess("Votre compte a été supprimé avec succès !");
    };
    return (
        <>
            <p className="mb-2 text-muted">
                Voulez-vous supprimer votre compte ?
            </p>
            <p className="mb-4 text-muted">
                Supprimer votre compte entraînera l’annulation de toutes vos sessions à venir ainsi que la perte de tout vos crédits.
            </p>
            <button
                onClick={() => setShowDeleteModal(true)}
                className="btn btn-outline-danger"
            >
                Je veux supprimer mon compte
            </button>
            {/* ✅ Modal de confirmation  pour supprimer compte*/}
            {showDeleteModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4 shadow">
                            <div className="modal-header border-0">
                                <h5 className="modal-title text-danger">
                                    Confirmer la suppression
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDeleteModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Êtes-vous sûr de vouloir supprimer votre compte ?{" "}
                                    <br />
                                    Cette action est irréversible.
                                </p>
                            </div>
                            <div className="modal-footer border-0">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDeleteAccount}
                                >
                                    Oui, supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteAccount