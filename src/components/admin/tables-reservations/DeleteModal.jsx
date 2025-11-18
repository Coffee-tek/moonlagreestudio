import React from "react";

export default function DeleteModal({ isMultiple, user, count, onCancel, onConfirm }) {
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow">
          <div className="modal-header border-0">
            <h5 className="modal-title text-danger">Confirmer la suppression</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            {isMultiple ? (
              <p>Supprimer {count} utilisateur(s) ? Cette action est irréversible.</p>
            ) : (
              <p>
                Supprimer <strong>{user.name}</strong> ? Cette action est
                irréversible.
              </p>
            )}
          </div>
          <div className="modal-footer border-0">
            <button className="btn btn-secondary" onClick={onCancel}>
              Annuler
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Oui, supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
