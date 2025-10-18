import { useState, useEffect } from "react";
import Image from "next/image";
import UserInfoForm from "../forms/UserInfoForm";
import PointsManager from "../forms/PointsManager";

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
        <div className="modal-content border-0 rounded-4">
          
            {/* Header */}
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Modifier l'utilisateur</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            {/* Contenu principal */}
            <div className="modal-body">
              <div className="row">
                <UserInfoForm
                user={user}
                formData={formData}
                setFormData={setFormData}
              />

              <PointsManager
                    user={user}
                    formData={formData}
                    setFormData={setFormData}
                  />
              </div>
            </div>
        </div>
      </div>

      <style jsx>{`
        .modal {
          z-index: 1050;
        }
        .form-label {
          font-size: 0.9rem;
        }
        hr {
          border-top: 1px solid #dee2e6;
          opacity: 0.6;
        }
        .fw-semibold {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}