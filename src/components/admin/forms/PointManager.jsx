"use client";

import { useState, useEffect } from "react";

export default function PointManager({ currentPoints, onChange, onSubmit, isPending }) {
  const [pointsData, setPointsData] = useState({ add: 0, remove: 0 });

  useEffect(() => {
    if (onChange) onChange(pointsData);
  }, [pointsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? 0 : parseInt(value, 10);
    setPointsData((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="financial-section">
      <h6 className="fw-bold text-uppercase text-muted mb-3">
        Gestion des points
      </h6>

      <p>Points actuel : {currentPoints}</p>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Ajouter des points</label>
          <input
            type="number"
            name="add"
            className="form-control"
            value={pointsData.add}
            onChange={handleChange}
            placeholder="Points à ajouter"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">Retirer des points</label>
          <input
            type="number"
            name="remove"
            className="form-control"
            value={pointsData.remove}
            onChange={handleChange}
            placeholder="Points à retirer"
          />
        </div>
      </div>

      <button type="submit" disabled={isPending} className="btn btn-primary">
        {isPending ? "En cours..." : "Valider"}
      </button>
    </form>
  );
}
