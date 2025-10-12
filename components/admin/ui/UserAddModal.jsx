import { useState } from "react";
import Image from "next/image";

export default function UserAddModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
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
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
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
                Add New User
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
                  <div className="avatar-preview mb-3">
                    <Image
                      src={formData.avatar}
                      alt="Avatar preview"
                      width={150}
                      height={150}
                      className="rounded-circle"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={generateRandomAvatar}
                  >
                    <i className="ti ti-refresh me-1"></i>
                    Generate Avatar
                  </button>
                  <small className="d-block text-muted mt-2">
                    Avatar will be generated from email
                  </small>
                </div>
                <div className="col-md-8">
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="mb-3">
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
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Role <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.role ? "is-invalid" : ""}`}
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="">Select a role</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Developer">Developer</option>
                      <option value="Support Lead">Support Lead</option>
                      <option value="Security Officer">Security Officer</option>
                    </select>
                    {errors.role && (
                      <div className="invalid-feedback">{errors.role}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.status ? "is-invalid" : ""}`}
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                    {errors.status && (
                      <div className="invalid-feedback">{errors.status}</div>
                    )}
                  </div>

                  <div className="alert alert-info d-flex align-items-center">
                    <i className="ti ti-info-circle me-2"></i>
                    <small>
                      The user ID and timestamps will be generated automatically
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
                <i className="ti ti-x me-1"></i>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="ti ti-check me-1"></i>
                Add User
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

        .alert-info {
          background-color: #cfe2ff;
          border-color: #b6d4fe;
          color: #084298;
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

        .btn-sm {
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .modal-dialog {
            margin: 0.5rem;
          }

          .col-md-4,
          .col-md-8 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}