import { useState, useEffect } from "react";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { toast } from "sonner";
import { updateSeanceAction } from "../../../actions/ seanceActions";

export default function SessionEditModal({ session, onClose, onSave, teachers = [] }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (session) {
      // Préparer la date au format YYYY-MM-DD pour l'input type="date"
      const dateObj = new Date(session.date);
      const formattedDate = isNaN(dateObj)
        ? new Date().toISOString().split('T')[0]
        : dateObj.toISOString().split('T')[0];

      // Préparer l'heure au format HH:MM pour l'input type="time"
      const timeObj = new Date(session.heure);
      const formattedTime = isNaN(timeObj)
        ? "08:00"
        : timeObj.toTimeString().slice(0, 5); // "HH:MM"

      setFormData({
        ...session,
        date: formattedDate,
        time: formattedTime,
        remainingPlaces: (session.places || 0) - (session.place_reserver || 0),
        status: ((session.places || 0) - (session.place_reserver || 0)) === 0
          ? "Complet"
          : ((session.places || 0) - (session.place_reserver || 0)) <= 3
            ? "Presque complet"
            : "Disponible"
      });
    }
  }, [session]);


  if (!session) return null;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Mettre à jour l'avatar si le professeur change
    if (name === "coatch" && value) {
      setFormData((prev) => ({
        ...prev,
        teacherAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${value}`,
      }));
    }

    // Recalculer les places restantes si places change
    if (name === "places") {
      const newTotal = parseInt(value) || 0;
      const booked = formData.place_reserver || 0;
      const remaining = newTotal - booked;

      setFormData((prev) => ({
        ...prev,
        remainingPlaces: remaining,
        status: remaining === 0 ? "Complet" : remaining <= 3 ? "Presque complet" : "Disponible",
      }));
    }

    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.coatch?.trim()) {
      newErrors.coatch = "Le nom du professeur est requis";
    }

    if (!formData.date) {
      newErrors.date = "La date est requise";
    }

    if (!formData.time) {
      newErrors.time = "L'heure est requise";
    }

    if (formData.credits < 1 || formData.credits > 10) {
      newErrors.credits = "Les crédits doivent être entre 1 et 10";
    }

    const places = parseInt(formData.places) || 0;
    const place_reserver = parseInt(formData.place_reserver) || 0;

    if (places < 1 || places > 50) {
      newErrors.places = "Le nombre de places doit être entre 1 et 50";
    }

    if (places < place_reserver) {
      newErrors.places = "Le nombre total de places ne peut pas être inférieur aux places réservées";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function combineDateAndTime(dateStr, timeStr) {
    if (!dateStr || !timeStr) return null;
    const [hours, minutes] = timeStr.split(":").map(Number);
    const d = new Date(dateStr);
    d.setHours(hours, minutes, 0, 0);
    return d;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;


    console.log(formData);


    try {
      // Préparer les données pour l'action
      const fd = new FormData();
      fd.set("titre", formData.titre || "");
      fd.set("date", formData.date || "");
      fd.set("heure", combineDateAndTime(formData.date, formData.time).toISOString()); //
      fd.set("coatch", formData.coatch || "");
      fd.set("places", formData.places || 0);
      fd.set("credits", formData.credits || 1);

      // Appel de l'action update
      await updateSeanceAction(formData.id, fd);

      toast.success("La session a été modifiée avec succès !");
      window.location.reload();

    } catch (error) {
      console.error(error);
      toast.error("La modification de la session a échoué !");
    }
  };


  const getProgressColor = (remaining, total) => {
    const percentage = (remaining / total) * 100;
    if (percentage == 100) return "bg-danger";
    if (percentage > 20) return "bg-success";
    return "bg-success";
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
                <i className="bi bi-pencil-square me-2"></i>
                Modifier la session {formData.id}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4 text-center mb-4">


                  {/* Statistiques des places */}
                  <div className="card bg-light mt-1">
                    <div className="card-body p-3">
                      <h6 className="mb-2">Occupation</h6>
                      <div className="mb-2">
                        <div className="d-flex justify-content-between mb-1">
                          <small>Réservées</small>
                          <small className="fw-bold">{formData.place_reserver || 0}</small>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <small>Restantes</small>
                          <small className="fw-bold text-success">{formData.places - formData.place_reserver || 0}</small>
                        </div>
                        <div className="d-flex justify-content-between">
                          <small>Total</small>
                          <small className="fw-bold">{formData.places || 0}</small>
                        </div>
                      </div>
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className={`progress-bar ${getProgressColor(
                            session.place_reserver,
                            session.places
                          )}`}
                          style={{
                            width: `${(session.place_reserver / session.places) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Nom de la session <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.titre || ""}
                      onChange={handleChange}
                      name="titre"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Professeur <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.coatch ? "is-invalid" : ""}`}
                      name="coatch"
                      value={formData.coatch || ""}
                      onChange={handleChange}
                      placeholder="Nom du professeur"
                      list="teachersListEdit"
                    />
                    {teachers.length > 0 && (
                      <datalist id="teachersListEdit">
                        {teachers.map((coatch, index) => (
                          <option key={index} value={coatch} />
                        ))}
                      </datalist>
                    )}
                    {errors.coatch && (
                      <div className="invalid-feedback">{errors.coatch}</div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className={`form-control ${errors.date ? "is-invalid" : ""}`}
                        name="date"
                        value={formData.date || ""}
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
                      <input
                        type="time"
                        className={`form-control ${errors.time ? "is-invalid" : ""}`}
                        name="time"
                        value={formData.time || ""}
                        onChange={handleChange}
                      />
                      {errors.time && (
                        <div className="invalid-feedback">{errors.time}</div>
                      )}
                    </div>
                  </div>

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
                        value={formData.credits || 1}
                        onChange={handleChange}
                      />
                      {errors.credits && (
                        <div className="invalid-feedback">{errors.credits}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Nombre de places total <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${errors.places ? "is-invalid" : ""}`}
                        name="places"
                        min="1"
                        max="50"
                        value={formData.places || 0}
                        onChange={handleChange}
                      />
                      {errors.places && (
                        <div className="invalid-feedback">{errors.places}</div>
                      )}
                      <small className="text-muted">
                        Places réservées actuellement : {formData.place_reserver || 0}
                      </small>
                    </div>
                  </div>

                  <div className="alert alert-warning d-flex align-items-start">
                    <i className="bi bi-exclamation-triangle me-2 mt-1"></i>
                    <small>
                      <strong>Attention :</strong> Si vous réduisez le nombre de places total,
                      assurez-vous qu'il reste supérieur ou égal au nombre de réservations actuelles.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
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
        }

        .modal-dialog {
          max-width: 800px;
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
          font-size: 0.875rem;
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

        .alert-warning {
          background-color: #fff3cd;
          border-color: #ffecb5;
          color: #664d03;
          padding: 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        .avatar-preview {
          border: 3px solid #e9ecef;
          border-radius: 50%;
          display: inline-block;
          padding: 5px;
          background: white;
        }

        .progress {
          background-color: #e9ecef;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-bar {
          transition: width 0.3s ease;
        }

        .card.bg-light {
          background-color: #f8f9fa !important;
          border: 1px solid #e9ecef;
        }

        @media (max-width: 768px) {
          .modal-dialog {
            margin: 0.5rem;
          }

          .col-md-4,
          .col-md-6,
          .col-md-8 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}