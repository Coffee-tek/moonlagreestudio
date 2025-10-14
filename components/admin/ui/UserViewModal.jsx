import Image from "next/image";

export default function UserViewModal({ user, onClose }) {
  if (!user) return null;

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
            <h5 className="modal-title">Détails Utilisateurs</h5>
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
                  className="rounded-circle m-lg-5"
                />
                <h4 className="mt-3 mb-1">{user.name}</h4>
              </div>
              
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="fw-bold text-muted mb-1">Id utilisateur</label>
                  <p className="mb-0">{user.id}</p>
                </div>

                <div className="mb-3">
                  <label className="fw-bold text-muted mb-1">Nom d'utilisateur</label>
                  <p className="mb-0">Afficher le nom d'utilisateur ici</p>
                </div>

                <div className="mb-3">
                  <label className="fw-bold text-muted mb-1">Email</label>
                  <p className="mb-0">{user.email}</p>
                </div>

                <div className="mb-3">
                  <label className="fw-bold text-muted mb-1">Téléphone</label>
                  <p className="mb-0">{user.phone}</p>
                </div>

                <div className="mb-3">
                  <label className="fw-bold text-muted mb-1">Adresse</label>
                  <p className="mb-0">{user.adress}</p>
                </div>

                <div className="mb-3">
                  <label className="fw-bold text-muted mb-1">Crédits</label>
                  <p className="mb-0">{user.credits}</p>
                </div>

                <div className="mb-3">
                  <label className="fw-bold text-muted mb-1">Points</label>
                  <p className="mb-0">{user.points}</p>
                </div>

                <div className="mb-3">
                  <label className="fw-bold text-muted mb-1">Session Reservées</label>
                  <p className="mb-0">Afficher les sessions réservées ici</p>
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
              Fermer
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