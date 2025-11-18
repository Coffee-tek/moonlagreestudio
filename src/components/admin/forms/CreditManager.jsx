"use client";

import { useState, useEffect } from "react";

export default function CreditManager({ currentCredit, onChange, onSubmit,isPending }) {
  const [creditData, setCreditData] = useState({ add: 0, remove: 0 });

  useEffect(() => {
    if (onChange) onChange(creditData);
  }, [creditData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? 0 : parseInt(value, 10);
    setCreditData((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="financial-section">
      <h6 className="fw-bold text-uppercase text-muted mb-3">
        Gestion du crédit
      </h6>

      <p>Crédit actuel : {currentCredit}</p>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Ajouter du crédit</label>
          <input
            type="number"
            name="add"
            className="form-control"
            value={creditData.add}
            onChange={handleChange}
            placeholder="Crédit à ajouter"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">Retirer du crédit</label>
          <input
            type="number"
            name="remove"
            className="form-control"
            value={creditData.remove}
            onChange={handleChange}
            placeholder="Crédit à retirer"
          />
        </div>
      </div>

      <button type="submit" disabled={isPending} className="btn btn-primary">
         {isPending ? "En cours..." : "Valider"}
      </button>
    </form>
  );
}
