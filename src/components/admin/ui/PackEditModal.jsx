

import { useState, useEffect } from "react";

export default function PackEditModal({ pack, onClose, onSave }) {
  const [id, setId] = useState(pack.id)
  const [formData, setFormData] = useState({
    titre: "",
    credits: 0,
    prix: 0,
    promotion: "",
    description: "",
    duree: 0,
 
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (pack) {
      const today = new Date();
      let endDate = "";
      if (pack.duree) {
        const end = new Date();
        end.setDate(today.getDate() + pack.duree);
        endDate = end.toISOString().split("T")[0];
      }

      setFormData({
        titre: pack.titre || "",
        description: pack.description || "",
        credits: pack.credits || 0,
        prix: pack.prix || 0,
        promotion: pack.promotion || "",
        duree: pack.duree || 0,
        // endDate: endDate,
        theme_color: pack.theme_color || "primary",
        // isPopular: pack.isPopular || false,
      });
    }
  }, [pack]);

  if (!pack) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "credits" || name === "prix" || name === "promotion"
            ? value === ""
              ? ""
              : Number(value)
            : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => {
      const durationInDays = value
        ? Math.ceil((new Date(value) - new Date()) / (1000 * 60 * 60 * 24))
        : 0;

      return {
        ...prev,
        endDate: value,
        duree: durationInDays,
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titre.trim()) newErrors.titre = "Le nom du pack est requis";
    if (formData.credits <= 0) newErrors.credits = "Le nombre de crédits doit être supérieur à 0";
    if (formData.prix <= 0) newErrors.prix = "Le prix doit être supérieur à 0";
    if (formData.promotion && formData.promotion >= formData.prix)
      newErrors.promotion = "Le prix promo doit être inférieur au prix normal";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   onSave({
  //     ...formData,
  //     promotion: formData.promotion === "" ? null : formData.promotion,
  //   });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Build only valid fields for Prisma
    const dataToSave = {
      titre: formData.titre,
      description: formData.description || "",
      credits: formData.credits,
      prix: formData.prix,
      promotion: formData.promotion === "" ? null : formData.promotion,
      duree: formData.duree,
      theme_color: formData.theme_color, // map vers le champ correct dans Prisma
    };

    onSave(dataToSave);
  };

  const calculateDiscount = () => {
    if (formData.promotion && formData.prix > 0) {
      return (((formData.prix - formData.promotion) / formData.prix) * 100).toFixed(0);
    }
    return 0;
  };

  const colorOptions = [
    { value: "primary", label: "Bleu" },
    { value: "success", label: "Vert" },
    { value: "warning", label: "Jaune" },
    { value: "danger", label: "Rouge" },
    { value: "info", label: "Cyan" },
    { value: "purple", label: "Violet" },
  ];

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", overflow: "auto" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        style={{ maxHeight: "90vh", margin: "2rem auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content" style={{ display: "flex", flexDirection: "column", maxHeight: "90vh" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-pencil-square me-2"></i>
                Modifier le pack "{formData.titre}"
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body" style={{ overflowY: "auto", flex: 1 }}>
              {/* Aperçu */}
              <div className="card bg-light mb-4">
                <div className="card-body text-center">
                  <div
                    className={`avatar-xl rounded bg-${formData.theme_color}-subtle d-inline-flex align-items-center justify-content-center mb-3`}
                  ></div>
                  {formData.isPopular && (
                    <span className="badge bg-warning position-absolute top-0 end-0 m-3">⭐ Populaire</span>
                  )}
                  <h5 className="mb-1">{formData.titre || "Nom du pack"}</h5>
                  <p className="text-muted mb-2">{formData.credits || 0} crédits</p>
                  <div className="mb-2">
                    {formData.promotion ? (
                      <>
                        <span className="text-muted text-decoration-line-through me-2">${formData.prix}</span>
                        <span className="text-success fw-bold fs-4">${formData.promotion}</span>
                        <span className="badge bg-success ms-2">-{calculateDiscount()}%</span>
                      </>
                    ) : (
                      <span className="fw-bold fs-4">CFA{formData.prix}</span>
                    )}
                  </div>
                  {formData.description && <p className="text-muted small mb-0">{formData.description}</p>}
                </div>

              </div>

              {/* Informations */}
              <h6 className="mb-3 fw-bold">
                <i className="bi bi-info-circle me-2"></i> Informations de base
              </h6>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label className="form-label fw-bold">
                    ID du pack <span className="text-muted">(non-modifiable)</span>
                  </label>
                  <input type="text" className="form-control" value={id} disabled />
                </div>

                <div className="col-lg-6 mb-3">
                  <label className="form-label fw-bold">
                    Nom du pack <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.titre ? "is-invalid" : ""}`}
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    placeholder="Ex: Pack Starter"
                  />
                  {errors.titre && <div className="invalid-feedback">{errors.titre}</div>}
                </div>

                <div className="col-lg-12 mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="2"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description courte du pack..."
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Nombre de crédits <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className={`form-control ${errors.credits ? "is-invalid" : ""}`}
                    name="credits"
                    min="1"
                    value={formData.credits}
                    onChange={handleChange}
                  />
                  {errors.credits && <div className="invalid-feedback">{errors.credits}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Prix normal (cfa) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className={`form-control ${errors.prix ? "is-invalid" : ""}`}
                    name="prix"
                    min="0"
                    step="0.01"
                    value={formData.prix}
                    onChange={handleChange}
                  />
                  {errors.prix && <div className="invalid-feedback">{errors.prix}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Prix promotionnel (cfa) <span className="text-muted">(optionnel)</span>
                  </label>
                  <input
                    type="number"
                    className={`form-control ${errors.promotion ? "is-invalid" : ""}`}
                    name="promotion"
                    min="0"
                    step="0.01"
                    value={formData.promotion}
                    onChange={handleChange}
                    placeholder="Laisser vide si pas de promotion"
                  />
                  {errors.promotion && <div className="invalid-feedback">{errors.promotion}</div>}
                  {formData.promotion && formData.prix > formData.promotion && (
                    <small className="text-success">
                      <i className="bi bi-check-circle me-1"></i>
                      Réduction de {calculateDiscount()}%
                    </small>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Date de fin</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleEndDateChange}
                  />
                  {formData.endDate && (
                    <small className="text-muted">Durée : {formData.duree} jours</small>
                  )}
                </div>
              </div>

              <hr className="my-4" />

              {/* Apparence */}
              <h6 className="mb-3 fw-bold">
                <i className="bi bi-palette me-2"></i> Apparence
              </h6>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Couleur du thème</label>
                  <select
                    className="form-select"
                    name="theme_color"
                    value={formData.theme_color}
                    onChange={handleChange}
                  >
                    {colorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="alert alert-info d-flex align-items-start">
                <i className="bi bi-info-circle me-2 mt-1"></i>
                <small>Les modifications seront appliquées immédiatement à ce pack.</small>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                <i className="bi bi-x-circle me-1"></i> Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-1"></i> Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
