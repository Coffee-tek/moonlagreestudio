import { useState } from "react";
import Image from "next/image";

export default function SessionAddModal({ onClose, onAdd, teachers = [] }) {
  const [formData, setFormData] = useState({
    sessionName: "",
    teacher: "",
    teacherAvatar: "/img/new/14.jpeg",
    date: "",
    time: "",
    credits: 1,
    totalPlaces: 15,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Générer l'avatar du professeur automatiquement
    if (name === "teacher" && value) {
      setFormData((prev) => ({
        ...prev,
        teacherAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${value}`,
      }));
    }

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.sessionName.trim()) {
      newErrors.sessionName = "Le nom de la session est requis";
    }

    if (!formData.teacher.trim()) {
      newErrors.teacher = "Le nom du professeur est requis";
    }

    if (!formData.date) {
      newErrors.date = "La date est requise";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "La date ne peut pas être dans le passé";
      }
    }

    if (!formData.time) {
      newErrors.time = "L'heure est requise";
    }

    if (formData.credits < 1 || formData.credits > 10) {
      newErrors.credits = "Les crédits doivent être entre 1 et 10";
    }

    if (formData.totalPlaces < 1 || formData.totalPlaces > 50) {
      newErrors.totalPlaces = "Le nombre de places doit être entre 1 et 50";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newSession = {
        ...formData,
        id: `#SES${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`,
        bookedPlaces: 0,
        remainingPlaces: formData.totalPlaces,
        status: "Disponible",
        date: new Date(formData.date).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };
      onAdd(newSession);
    }
  };

  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
    const minutes = Math.random() > 0.5 ? "00" : "30";
    setFormData((prev) => ({
      ...prev,
      time: `${hours}:${minutes}`,
    }));
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
                <i className="bi bi-plus-circle me-2"></i>
                Ajouter une nouvelle session
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="row">
                {/* Avatar et upload */}
                <div className="col-md-4 text-center mb-4">
                  <div className="avatar-preview mb-3">
                    <Image
                      src={formData.teacherAvatar}
                      alt="Avatar professeur"
                      width={120}
                      height={120}
                      className="rounded-circle m-lg-5"
                    />
                  </div>
                  <div className="button-wrapper">
                    <label htmlFor="upload" className="btn btn-primary me-2 mb-4" tabIndex={0}>
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
                      Autorisé JPG, GIF ou PNG. Max 800K.
                    </p>
                  </div>
                </div>

                {/* Formulaire principal */}
                <div className="col-md-8">
                  {/* Nom de la session */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Nom de la session <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.sessionName ? "is-invalid" : ""}`}
                      name="sessionName"
                      value={formData.sessionName}
                      onChange={handleChange}
                      placeholder="Ex: Pilates sur machine"
                    />
                    {errors.sessionName && (
                      <div className="invalid-feedback">{errors.sessionName}</div>
                    )}
                  </div>

                  {/* Professeur */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Professeur <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.teacher ? "is-invalid" : ""}`}
                      name="teacher"
                      value={formData.teacher}
                      onChange={handleChange}
                      placeholder="Nom du professeur"
                      list="teachersList"
                    />
                    {teachers.length > 0 && (
                      <datalist id="teachersList">
                        {teachers.map((teacher, index) => (
                          <option key={index} value={teacher} />
                        ))}
                      </datalist>
                    )}
                    {errors.teacher && (
                      <div className="invalid-feedback">{errors.teacher}</div>
                    )}
                  </div>

                  {/* Date et Heure */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className={`form-control ${errors.date ? "is-invalid" : ""}`}
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                      {errors.date && (
                        <div className="invalid-feedback">{errors.date}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Heure <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type="time"
                          className={`form-control ${errors.time ? "is-invalid" : ""}`}
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={generateRandomTime}
                          title="Générer une heure aléatoire"
                        >
                          <i className="bi bi-shuffle"></i>
                        </button>
                      </div>
                      {errors.time && (
                        <div className="invalid-feedback d-block">{errors.time}</div>
                      )}
                    </div>
                  </div>

                  {/* Crédits et places */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Crédits requis <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${errors.credits ? "is-invalid" : ""}`}
                        name="credits"
                        min="1"
                        max="10"
                        value={formData.credits}
                        onChange={handleChange}
                      />
                      {errors.credits && (
                        <div className="invalid-feedback">{errors.credits}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Nombre de places <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${errors.totalPlaces ? "is-invalid" : ""}`}
                        name="totalPlaces"
                        min="1"
                        max="50"
                        value={formData.totalPlaces}
                        onChange={handleChange}
                      />
                      {errors.totalPlaces && (
                        <div className="invalid-feedback">{errors.totalPlaces}</div>
                      )}
                    </div>
                  </div>

                  <div className="alert alert-info d-flex align-items-start">
                    <i className="bi bi-info-circle me-2 mt-1"></i>
                    <small>
                      L'ID de la session sera généré automatiquement. Le statut sera défini sur{" "}
                      <b>"Disponible"</b> par défaut.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                <i className="bi bi-x-circle me-1"></i> Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-1"></i> Créer la session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
