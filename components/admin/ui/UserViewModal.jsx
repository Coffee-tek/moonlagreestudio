import Image from "next/image";

export default function UserViewModal({ user, onClose }) {
  if (!user) return null;

  const getStatusBadge = (status) => {
    const badges = {
      Active: "bg-success-subtle text-success",
      Inactive: "bg-warning-subtle text-warning",
      Suspended: "bg-danger-subtle text-danger",
    };
    return badges[status] || "";
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
          <div className="modal-header">
            <h5 className="modal-title">User Details</h5>
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
                  src={user.avatar}
                  alt={user.name}
                  width={150}
                  height={150}
                  className="rounded-circle"
                />
                <h4 className="mt-3 mb-1">{user.name}</h4>
                <span className={`badge ${getStatusBadge(user.status)} fs-6`}>
                  {user.status}
                </span>
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="fw-bold text-muted mb-1">User ID</label>
                  <p className="mb-0">{user.id}</p>
                </div>
                <div className="mb-3">
                  <label className="fw-bold text-muted mb-1">Email</label>
                  <p className="mb-0">{user.email}</p>
                </div>
                <div className="mb-3">
                  <label className="fw-bold text-muted mb-1">Role</label>
                  <p className="mb-0">{user.role}</p>
                </div>
                <div className="mb-3">
                  <label className="fw-bold text-muted mb-1">Last Updated</label>
                  <p className="mb-0">
                    {user.lastUpdated} at {user.time}
                  </p>
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
              Close
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-success-subtle {
          background-color: rgba(40, 167, 69, 0.1);
        }

        .bg-warning-subtle {
          background-color: rgba(255, 193, 7, 0.1);
        }

        .bg-danger-subtle {
          background-color: rgba(220, 53, 69, 0.1);
        }

        .text-success {
          color: #28a745;
        }

        .text-warning {
          color: #ffc107;
        }

        .text-danger {
          color: #dc3545;
        }

        .modal {
          z-index: 1050;
        }

        .modal-dialog {
          max-width: 800px;
        }

        .badge {
          padding: 0.5em 1em;
        }
      `}</style>
    </div>
  );
}