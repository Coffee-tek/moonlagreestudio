import React from "react";

export default function ReservationPagination({
  totalPages,
  currentPage,
  setCurrentPage,
  startIndex,
  rowsPerPage,
  totalItems,
}) {
  return (
    <div className="card-footer border-0 d-flex justify-content-between align-items-center flex-wrap gap-2">
      <div className="text-muted small">
        Afficher {startIndex + 1} à{" "}
        {Math.min(startIndex + rowsPerPage, totalItems)} sur {totalItems}
      </div>

      <ul className="pagination pagination-sm mb-0">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </li>
      </ul>
    </div>
  );
}
