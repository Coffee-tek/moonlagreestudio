import React from "react";

const PackCard = ({ pack, onEdit, onDelete }) => {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card position-relative">
        <div className="card-body d-flex flex-column justify-content-between">

          {/* Pack Info */}
          <div className="d-flex mb-3 align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className={`avatar-xl rounded bg-${pack.theme_color ? pack.theme_color : 'primary'}-subtle d-flex align-items-center justify-content-center`}>
                <i className="ti ti-package fs-24 text-primary"></i>
              </div>


              <div className="ms-3">
                <p className="mb-1 fw-semibold">{pack.titre}</p>

                {/* Prix & crédits sur la même ligne */}
                <div className="text-start">
                  {/* Crédits */}
                  <span className="text-muted d-block">{pack.credits} crédits</span>

                  {/* Prix et promo sur la même ligne */}
                  {pack.promotion ? (
                    <span className="d-block">
                      <span className="text-muted text-decoration-line-through me-2">
                        {pack.prix} CFA
                      </span>
                      <br></br>
                      <span className="text-success fw-bold">
                        {pack.promotion} CFA
                      </span>
                    </span>
                  ) : (
                    <span className="fw-bold d-block">{pack.prix} CFA</span>
                  )}
                </div>


              </div>
            </div>

            {/* Dots Menu */}
            <div className="dropdown">
              <button
                className="btn btn-sm text-muted p-0"
                type="button"
                id={`packDropdown-${pack.titre}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby={`packDropdown-${pack.titre}`}
              >
                <li>
                  <button className="dropdown-item" onClick={() => onEdit(pack)}>
                    <i className="bi bi-pencil-square me-2"></i>
                    Modifier
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => onDelete(pack)}
                  >
                    <i className="bi bi-trash3 me-2"></i>
                    Supprimer
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .fs-sm {
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default PackCard;
