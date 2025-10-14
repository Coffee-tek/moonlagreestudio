import { useState, useEffect } from "react";

export default function PackEditModal({ pack, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    credits: 0,
    price: 0,
    promoPrice: "",
    description: "",
    features: [],
    isPopular: false,
    color: "primary",
    icon: "package",
  });

  const [newFeature, setNewFeature] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (pack) {
      setFormData({
        id: pack.id || "",
        name: pack.name || "",
        credits: pack.credits || 0,
        price: pack.price || 0,
        promoPrice: pack.promoPrice || "",
        description: pack.description || "",
        features: pack.features || [],
        isPopular: pack.isPopular || false,
        color: pack.color || "primary",
        icon: pack.icon || "package",
      });
    }
  }, [pack]);

  if (!pack) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" 
        ? checked 
        : (name === "credits" || name === "price" || name === "promoPrice")
        ? (value === "" ? "" : Number(value))
        : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom du pack est requis";
    }

    if (formData.credits <= 0) {
      newErrors.credits = "Le nombre de crédits doit être supérieur à 0";
    }

    if (formData.price <= 0) {
      newErrors.price = "Le prix doit être supérieur à 0";
    }

    if (formData.promoPrice && formData.promoPrice >= formData.price) {
      newErrors.promoPrice = "Le prix promo doit être inférieur au prix normal";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const updatedPack = {
        ...formData,
        promoPrice: formData.promoPrice === "" ? null : formData.promoPrice,
      };
      onSave(updatedPack);
    }
  };

  const calculateDiscount = () => {
    if (formData.promoPrice && formData.price > 0) {
      const discount = ((formData.price - formData.promoPrice) / formData.price) * 100;
      return discount.toFixed(0);
    }
    return 0;
  };

  const colorOptions = [
    { value: "primary", label: "Bleu", class: "bg-primary" },
    { value: "success", label: "Vert", class: "bg-success" },
    { value: "warning", label: "Jaune", class: "bg-warning" },
    { value: "danger", label: "Rouge", class: "bg-danger" },
    { value: "info", label: "Cyan", class: "bg-info" },
    { value: "purple", label: "Violet", class: "bg-purple" },
  ];

  const iconOptions = [
    { value: "package", icon: "ti-package" },
    { value: "star", icon: "ti-star" },
    { value: "gift", icon: "ti-gift" },
    { value: "crown", icon: "ti-crown" },
    { value: "diamond", icon: "ti-diamond" },
    { value: "rocket", icon: "ti-rocket" },
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
        <div className="modal-content" style={{ maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-pencil-square me-2"></i>
                Modifier le pack "{pack.name}"
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body" style={{ overflowY: "auto", flex: "1" }}>
              {/* Aperçu du pack */}
              <div className="card bg-light mb-4">
                <div className="card-body text-center">
                  <div className={`avatar-xl rounded bg-${formData.color}-subtle d-inline-flex align-items-center justify-content-center mb-3`}>
                    <i className={`ti ${iconOptions.find(i => i.value === formData.icon)?.icon} fs-24 text-${formData.color}`}></i>
                  </div>
                  {formData.isPopular && (
                    <span className="badge bg-warning position-absolute top-0 end-0 m-3">
                      ⭐ Populaire
                    </span>
                  )}
                  <h5 className="mb-1">{formData.name || "Nom du pack"}</h5>
                  <p className="text-muted mb-2">{formData.credits || 0} crédits</p>
                  <div className="mb-2">
                    {formData.promoPrice ? (
                      <>
                        <span className="text-muted text-decoration-line-through me-2">
                          ${formData.price}
                        </span>
                        <span className="text-success fw-bold fs-4">
                          ${formData.promoPrice}
                        </span>
                        <span className="badge bg-success ms-2">
                          -{calculateDiscount()}%
                        </span>
                      </>
                    ) : (
                      <span className="fw-bold fs-4">${formData.price}</span>
                    )}
                  </div>
                  {formData.description && (
                    <p className="text-muted small mb-0">{formData.description}</p>
                  )}
                </div>
              </div>

              {/* Informations de base */}
              <h6 className="mb-3 fw-bold">
                <i className="bi bi-info-circle me-2"></i>
                Informations de base
              </h6>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  ID du pack <span className="text-muted">(non-modifiable)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.id}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  Nom du pack <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Pack Starter"
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="2"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description courte du pack..."
                />
              </div>

              <div className="row">
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
                  {errors.credits && (
                    <div className="invalid-feedback">{errors.credits}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Prix normal (cfa) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className={`form-control ${errors.price ? "is-invalid" : ""}`}
                    name="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {errors.price && (
                    <div className="invalid-feedback">{errors.price}</div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  Prix promotionnel (cfa) <span className="text-muted">(optionnel)</span>
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.promoPrice ? "is-invalid" : ""}`}
                  name="promoPrice"
                  min="0"
                  step="0.01"
                  value={formData.promoPrice}
                  onChange={handleChange}
                  placeholder="Laisser vide si pas de promotion"
                />
                {errors.promoPrice && (
                  <div className="invalid-feedback">{errors.promoPrice}</div>
                )}
                {formData.promoPrice && formData.price > formData.promoPrice && (
                  <small className="text-success">
                    <i className="bi bi-check-circle me-1"></i>
                    Réduction de {calculateDiscount()}%
                  </small>
                )}
              </div>

              <hr className="my-4" />

              {/* Apparence */}
              <h6 className="mb-3 fw-bold">
                <i className="bi bi-palette me-2"></i>
                Apparence
              </h6>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Couleur du thème</label>
                  <select
                    className="form-select"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  >
                    {colorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Icône</label>
                  <div className="d-flex gap-2">
                    {iconOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`btn btn-outline-${formData.color} ${
                          formData.icon === option.value ? "active" : ""
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, icon: option.value }))}
                      >
                        <i className={`ti ${option.icon}`}></i>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            

              <div className="alert alert-info d-flex align-items-start">
                <i className="bi bi-info-circle me-2 mt-1"></i>
                <small>
                  Les modifications seront appliquées immédiatement à ce pack.
                </small>
              </div>
            </div>

            <div className="modal-footer" style={{ flexShrink: 0 }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                <i className="bi bi-x-circle me-1"></i>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-1"></i>
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modal {
          z-index: 1050;
          overflow-y: auto;
        }

        .modal-dialog {
          max-width: 800px;
          margin: 2rem auto;
        }

        .modal-content {
          max-height: 90vh;
        }

        .modal-body {
          max-height: calc(90vh - 140px);
        }

        .form-label {
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .text-danger {
          color: #dc3545;
        }

        .text-success {
          color: #28a745;
        }

        .text-muted {
          color: #6c757d;
        }

        .is-invalid {
          border-color: #dc3545;
        }

        .invalid-feedback {
          display: block;
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .alert-info {
          background-color: #cfe2ff;
          border-color: #b6d4fe;
          color: #084298;
          padding: 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        .avatar-xl {
          width: 80px;
          height: 80px;
        }

        .bg-primary-subtle {
          background-color: rgba(114, 124, 245, 0.1);
        }

        .bg-success-subtle {
          background-color: rgba(40, 167, 69, 0.1);
        }

        .bg-warning-subtle {
          background-color: rgba(255, 193, 7, 0.1);
        }

        .bg-danger-subtle {
          background-color: rgba(220, 53, 69, 0.1);
        }

        .bg-info-subtle {
          background-color: rgba(13, 202, 240, 0.1);
        }

        .bg-purple-subtle {
          background-color: rgba(111, 66, 193, 0.1);
        }

        .text-primary {
          color: #727cf5;
        }

        .text-purple {
          color: #6f42c1;
        }

        .card.bg-light {
          background-color: #f8f9fa !important;
          border: 1px solid #e9ecef;
        }

        .badge {
          padding: 0.35em 0.65em;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .list-group-item {
          border: 1px solid #dee2e6;
        }

        @media (max-width: 768px) {
          .modal-dialog {
            margin: 0.5rem;
          }

          .col-md-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}