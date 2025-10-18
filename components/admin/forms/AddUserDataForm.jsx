// components/AddUserDataForm.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import AddPointUser from "./AddPointUser";
import { useEffect } from "react";

export default function AddUserDataForm( { user, onClose, onSave } ) {
//   const [formData, setFormData] = useState({
//     avatar: "/img/new/14.jpeg", // mettre un avatar par défaut
//     name: "",
//     username: "",
//     email: "",
//     tel: "",
//     adress: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "avatar" && files && files[0]) {
//       // Création d'une URL locale pour prévisualisation
//       const file = files[0];
//       setFormData((prev) => ({
//         ...prev,
//         avatar: URL.createObjectURL(file),
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // ici tu peux ajouter la validation et l'envoi vers une API
//     console.log(formData);
//   };

//   const handleCancel = () => {
//     setFormData({
//       avatar: "/default-avatar.png",
//       name: "",
//       username: "",
//       email: "",
//       tel: "",
//       adress: "",
//     });
//     setErrors({});
//   };

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
    <form onSubmit={handleSubmit}>
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

            <button
              type="button"
              className="btn btn-outline-secondary mb-3"
              onClick={handleCancel}
            >
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
                <label className="form-label fw-semibold">ID Utilisateur</label>
                <input
                type="text"
                className="form-control"
                value={formData.id || ""}
                disabled
                />
            </div>

            <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Nom Complet</label>
                <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name || ""}
                onChange={handleChange}
                required
                />
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

            <div className="col-md-12 mb-4">
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

          
        </div>
      </div>
    </form>
  );
}