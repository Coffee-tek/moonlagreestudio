import React from "react";

export default function DeleteModal({ title, message, onCancel, onConfirm }) {
    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}

        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 rounded-4 shadow">
                    <div className="modal-header border-0">
                        <h5 className="modal-title text-danger">{title}</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>

                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer border-0">
                        <button className="btn btn-secondary" onClick={onCancel}>Annuler</button>
                        <button className="btn btn-danger" onClick={onConfirm}>Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
