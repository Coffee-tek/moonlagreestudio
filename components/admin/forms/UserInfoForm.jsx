// components/UserInfoForm.jsx
"use client";

import Image from "next/image";

export default function UserInfoForm({ user, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files && files[0]) {
      // Prévisualisation de l'image
      setFormData((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (!user) return null;

  return (
    <form className="financial-section ">
      <div className="row">
        {/* ===== Avatar Section ===== */}
        <div className="col-md-4 text-center mb-4">
          <div className="avatar-preview mb-3">
            <Image
              src={formData.avatar || user.avatar}
              alt={formData.name || user.name}
              width={150}
              height={150}
              className="rounded-circle m-lg-5"
            />
          </div>

          <div className="button-wrapper">
            <label htmlFor="upload" className="btn btn-primary me-2 mb-3">
              <span>Changer de photo</span>
              <input
                type="file"
                id="upload"
                name="avatar"
                hidden
                accept="image/png, image/jpeg"
                onChange={handleChange}
              />
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
          <h6 className="fw-bold text-primary mb-3">Informations utilisateur</h6>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">ID Utilisateur</label>
              <input
                type="text"
                className="form-control"
                value={formData.id || user.id || ""}
                disabled
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Nom Complet</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name || user.name || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Nom d'utilisateur</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username || user.username || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email || user.email || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Adresse</label>
              <input
                type="text"
                name="adress"
                className="form-control"
                value={formData.adress || user.adress || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Téléphone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone || user.phone || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary offset-md-10">
            Valider
             </button>
        </div>
        
      </div>

      
    </form>
  );
}
