// components/PointsManager.jsx
"use client";

import { useState } from "react";

export default function PointGestion({ onChange, onSubmit }) {
  const [pointsData, setPointsData] = useState({
    credits: 0,
    points: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? 0 : parseInt(value, 10);

    const updatedData = {
      ...pointsData,
      [name]: numericValue,
    };

    setPointsData(updatedData);

    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(pointsData); // remonte les données au parent
    } else {
      console.log("Points soumis :", pointsData);
      alert(`Points ajoutés: ${pointsData.credits}, Points retirés: ${pointsData.points}`);
    }
  };

  return (
   <form onSubmit={handleSubmit}className="financial-section mt-4 col-md-8 offset-md-4">
        <h6 className="fw-bold text-uppercase text-muted mb-3">
            Gestion des points
        </h6>

        <div className="row">
            <div className="col-12 mb-3">
            <label className="form-label fw-bold">Points à rajouter</label>
            <input
                type="number"
                className="form-control"
                name="credits"
                value={pointsData.credits}
                onChange={handleChange}
                placeholder="Entrer les points à rajouter"
            />
            </div>

            <div className="col-12 mb-3">
            <label className="form-label fw-bold">Points à retirer</label>
            <input
                type="number"
                className="form-control"
                name="points"
                value={pointsData.points}
                onChange={handleChange}
                placeholder="Entrer les points à retirer"
            />
            </div>
        </div>

        <button type="submit" className="btn btn-primary ">
            Valider
        </button>
    </form>

  );
}



