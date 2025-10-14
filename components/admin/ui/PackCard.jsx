import React from "react";

const PackCard = ({ pack, onEdit, onDelete }) => {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card position-relative">

        <div className="card-body d-flex flex-column justify-content-between">
          {/* Pack Info */}
          <div className="d-flex mb-3 align-items-start">
            <div className="flex-shrink-0">
              <div className="avatar-xl rounded bg-primary-subtle d-flex align-items-center justify-content-center">
                <i className="ti ti-package fs-24 text-primary"></i>
              </div>
            </div>

            <div className="ms-3 flex-grow-1">
              <h5 className="mb-1">{pack.name}</h5>
              <p className="text-muted mb-0 fs-base">{pack.credits} crédits</p>
            </div>

            {/* Dots Menu */}
            <div className="ms-auto dropdown">
              <button
                className="btn btn-sm text-muted p-0"
                type="button"
                id={`packDropdown-${pack.name}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`packDropdown-${pack.name}`}>
                <li>
                  <button className="dropdown-item" onClick={() => onEdit(pack)}>
                    <i className="bi bi-pencil-square"></i>Modifier
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={() => onDelete(pack)}>
                    <i className="bi bi-trash3"></i>Supprimer
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-3">
            {pack.promoPrice ? (
              <p className="mb-0 fs-lg">
                <span className="text-muted text-decoration-line-through me-2">${pack.price}</span>
                <span className="text-success fw-bold">${pack.promoPrice}</span>
              </p>
            ) : (
              <p className="mb-0 fs-lg fw-bold">${pack.price}</p>
            )}
          </div>


        </div>
      </div>
    </div>
  );
};

export default PackCard;
