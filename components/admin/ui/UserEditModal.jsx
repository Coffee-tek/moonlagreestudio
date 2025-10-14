import { useState, useEffect } from "react";
import Image from "next/image";

export default function UserEditModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
              <h5 className="modal-title">Modifier Utilisateur</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4 text-center mb-4">
                  <Image
                    src={formData.avatar || user.avatar}
                    alt={formData.name || user.name}
                    width={150}
                    height={150}
                    className="rounded-circle mb-3 m-lg-5"
                  />
                 <div className="button-wrapper">
                    <label
                      htmlFor="upload"
                      className="btn btn-primary me-2 mb-4"
                      tabIndex={0}
                    >
                      <span className="d-none d-sm-block">Changer de photo</span>
                      <i className="bx bx-upload d-block d-sm-none"></i>
                      <input
                        type="file"
                        id="upload"
                        className="account-file-input"
                        hidden
                        accept="image/png, image/jpeg"
                      />
                    </label>

                    <button
                      type="button"
                      className="btn btn-outline-secondary account-image-reset mb-4"
                    >
                      <i className="bx bx-reset d-block d-sm-none"></i>
                      <span className="d-none d-sm-block">Annuler</span>
                    </button>

                    <p className="text-muted mb-0">
                      Autorisé JPG, GIF or PNG. Max size of 800K
                    </p>
                </div>
                </div>
                <div className="col-md-8">
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      ID Utilisateur <span className="text-muted">(non-modifiable)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.id || ""}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Nom Complet <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Nom d'utilisateur <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      // value={formData.name || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Email 
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Adresse 
                    </label>
                    <input
                      type="input"
                      className="form-control"
                      name="adress"
                      value={formData.adress || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Téléphone 
                    </label>
                    <input
                      type="input"
                      className="form-control"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Crédits 
                    </label>
                    <input
                      type="input"
                      className="form-control"
                      name="credits"
                      value={formData.credits || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Points 
                    </label>
                    <input
                      type="input"
                      className="form-control"
                      name="points"
                      value={formData.points || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* <div className="mb-3">
                    <label className="form-label fw-bold">
                      Adresse <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      name="role"
                      value={formData.role || ""}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a role</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Developer">Developer</option>
                      <option value="Support Lead">Support Lead</option>
                      <option value="Security Officer">Security Officer</option>
                    </select>
                  </div> */}

                  {/* <div className="mb-3">
                    <label className="form-label fw-bold">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status || ""}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div> */}

                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                Sauvegarder
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
          max-width: 800px;
        }

        .form-label {
          font-size: 0.9rem;
        }

        .text-danger {
          color: #dc3545;
        }

        .text-muted {
          color: #6c757d;
        }
      `}</style>
    </div>
  );
}