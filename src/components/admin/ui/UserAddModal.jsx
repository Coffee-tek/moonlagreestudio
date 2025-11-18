import { useState } from "react";
import Image from "next/image";

export default function UserAddModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    adress: "",
    tel : "",
    credits : "",
    points : "",
    avatar: "/img/new/12.jpeg",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nom complet requis";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Nom d'utilisateur requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email est invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Generate unique ID
      const newUser = {
        ...formData,
        id: `#USR${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`,
        lastUpdated: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
      };
      
      onAdd(newUser);
    }
  };

  const generateRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setFormData((prev) => ({
      ...prev,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`,
    }));
  };

  const handleReset = () => {
    setAvatar("/assets/img/new/14.jpeg");
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="ti ti-user-plus me-2"></i>
                Ajouter un nouvel utilisateur
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="row">
                {/* ===== Avatar Section ===== */}
                <div className="col-md-4 text-center mb-4">
                  <div className="avatar-preview mb-3">
                    <Image
                      src={formData.avatar}
                      alt="Avatar preview"
                      width={150}
                      height={150}
                      className="rounded-circle"
                    />
                  </div>

                  <div className="button-wrapper">
                    <label htmlFor="upload" className="btn btn-primary me-2 mb-3">
                      <span>Changer de photo</span>
                      <input type="file" id="upload" hidden accept="image/png, image/jpeg" />
                    </label>

                    <button type="button" className="btn btn-outline-secondary mb-3">
                      Annuler
                    </button>

                    <p className="text-muted mb-0">
                      Formats acceptés : JPG, GIF, PNG. Taille max : 800K
                    </p>
                  </div>
                </div>

                {/* ===== User Info Section ===== */}
                <div className="col-md-8">
                  <h6 className="fw-bold text-uppercase text-muted mb-3">
                    Informations de l’utilisateur
                  </h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Nom complet <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Entrer le nom complet"
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Nom d’utilisateur <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.username ? "is-invalid" : ""}`}
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Entrer le nom d’utilisateur"
                      />
                      {errors.username && (
                        <div className="invalid-feedback">{errors.username}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="user@example.com"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Téléphone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        placeholder="Entrer le numéro"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-bold">Crédits</label>
                      <input
                        type="number"
                        className="form-control"
                        name="adress"
                        value={formData.credits}
                        onChange={handleChange}
                        placeholder="Entrer le nombre de crédits"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-bold">Adresse</label>
                      <input
                        type="text"
                        className="form-control"
                        name="adress"
                        value={formData.adress}
                        onChange={handleChange}
                        placeholder="Entrer l’adresse"
                      />
                    </div>
                  </div>

                  {/* ===== Financial Section ===== */}
                  <h6 className="fw-bold text-uppercase text-muted mt-4 mb-3">
                    Gestion des points
                  </h6>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="form-label fw-bold">Points à rajouter</label>
                      <input
                        type="number"
                        className="form-control"
                        name="credits"
                        value="0"
                        placeholder="Entrer les points à rajouter"
                      />
                    </div>
                    {/* <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Points à retirer</label>
                      <input
                        type="number"
                        className="form-control"
                        name="points"
                        value="0"
                        placeholder="Entrer les points à retirer"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Footer Buttons ===== */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                <i className="ti ti-x me-1"></i>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="ti ti-check me-1"></i>
                Ajouter utilisateur
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modal {
          z-index: 1050;
        }
        .modal-dialog {
          max-width: 850px;
        }
        .form-label {
          font-size: 0.9rem;
        }
        .text-muted {
          font-size: 0.8rem;
          letter-spacing: 0.5px;
        }
        .avatar-preview {
          border: 3px solid #e9ecef;
          border-radius: 50%;
          padding: 5px;
          background: #fff;
          display: inline-block;
        }
        .button-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media (max-width: 768px) {
          .modal-dialog {
            margin: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}