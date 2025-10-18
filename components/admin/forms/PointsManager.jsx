// components/PointsManager.jsx
"use client";

import { useState, useEffect } from "react";

export default function PointsManager({ user, formData, setFormData }) {
  const [pointsData, setPointsData] = useState({
    addPoints: 0,
    removePoints: 0,
  });

  useEffect(() => {
    // Initialise avec les points existants de l'utilisateur
    if (user) {
      setPointsData({
        addPoints: 0,
        removePoints: 0,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? 0 : parseInt(value, 10);

    setPointsData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));

    // Met à jour l'objet formData du parent
    if (setFormData) {
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    }
  };

  if (!user) return null;

  return (
    <form action="" style={{marginTop:"-50px"}}>
        <div className="col-md-8 offset-md-4">
      <h6 className="fw-bold text-primary mb-3">Points & Crédits</h6>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Crédits actuels</label>
          <input
            type="number"
            className="form-control"
            value={formData.credits || 0}
            readOnly
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Points actuels</label>
          <input
            type="number"
            className="form-control"
            value={formData.points || 0}
            readOnly
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Ajouter Points</label>
          <input
            type="number"
            name="addPoints"
            className="form-control"
            value={pointsData.addPoints}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Supprimer Points</label>
          <input
            type="number"
            name="removePoints"
            className="form-control"
            value={pointsData.removePoints}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <button type="submit" className="btn btn-primary offset-md-10">
            Valider
        </button>
    </div>
    </form>
    
  );
}
