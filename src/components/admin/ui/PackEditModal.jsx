

import { useState, useEffect } from "react";

export default function PackEditModal({ pack, onClose, onSave }) {
  const [id, setId] = useState(pack ? pack.id : null);

  const [formData, setFormData] = useState({
    titre: "",
    credits: 0,
    prix: 0,
    promotion: "",
    description: "",
    duree: 0,
    visible: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (pack) {
      setFormData({
        titre: pack.titre || "",
        description: pack.description || "",
        credits: pack.credits || 0,
        prix: pack.prix || 0,
        promotion: pack.promotion || "",
        duree: pack.duree || 0,
        theme_color: pack.theme_color || "primary",
        visible: pack.visible
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
          : name === "visible"
            ? value === "true" // <-- conversion string -> bool
            : ["credits", "prix", "promotion", "duree"].includes(name)
              ? value === "" ? "" : Number(value)
              : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

  const calculateDiscount = () => {
    if (formData.promotion && formData.prix > 0) {
      return (((formData.prix - formData.promotion) / formData.prix) * 100).toFixed(0);
    }
    return 0;
  };

  const colorOptions = [
    { value: "#062c54", label: "Bleu" },      // primary
    { value: "#0a4d0ade", label: "Vert" },      // success
    { value: "#bb7a01", label: "Jaune" },     // warning
    { value: "#660909", label: "Rouge" },     // danger
    { value: "#127f90", label: "Cyan" },      // info
    { value: "#580758", label: "Violet" },    // purple
    { value: "#542e06", label: "Marron" },    // brown (standard brown hex)
    { value: "#000000", label: "Noir" },      // dark
    { value: "#474d52", label: "Gris" }       // secondary
  ];

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
      visible: formData.visible
    };

    onSave(dataToSave);
  };

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
                    className={`avatar-xl rounded d-inline-flex align-items-center justify-content-center mb-3`}
                    style={{ backgroundColor: pack.theme_color ?? '#000' }}
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
                  <label className="form-label fw-bold">Nombre de jour de valider</label>
                  <input
                    type="number"
                    className="form-control"
                    name="duree"
                    value={formData.duree}
                    onChange={handleChange}
                  />
                  {formData.duree !== 0 && (
                    <small className="text-muted">{formData.duree} jours d'expirée a comptrer du jours de l'achat du pack</small>
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
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Visibilité du pack</label>
                    <div className="d-flex gap-3 mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="visible"
                          value="true"
                          checked={formData.visible === true}
                          onChange={handleChange} // <-- on utilise handleChange standard
                          id="visibleTrue"
                        />
                        <label className="form-check-label" htmlFor="visibleTrue">
                          Visible
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="visible"
                          value="false"
                          checked={formData.visible === false}
                          onChange={handleChange}
                          id="visibleFalse"
                        />
                        <label className="form-check-label" htmlFor="visibleFalse">
                          Masqué
                        </label>
                      </div>
                    </div>
                  </div>
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
