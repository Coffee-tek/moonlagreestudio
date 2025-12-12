import React from "react";

export default function PlanningTable({
    sessions,
    selectedSessions,
    handleSelectAll,
    selectAll,
    handleSelectSession,
    handleSort,
    handleEditSession,
    handleDeleteSessionClick,
    getStatusBadge,
    getProgressColor,
    currentPage,
    totalPages,
    handlePageChange,
    startIndex,
    rowsPerPage,
    sortedSessions
}) {
    return (
        <div className="table-responsive ">
            <table className="table table-hover w-100 mb-0">
                <thead className="bg-light">
                    <tr className="text-uppercase" style={{ fontSize: "0.75rem" }}>
                        <th className="ps-3" style={{ width: "1%" }}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th onClick={() => handleSort("id")}>Nom de session</th>
                        <th onClick={() => handleSort("coatch")}>Professeur</th>
                        <th onClick={() => handleSort("date")}>Date</th>
                        <th onClick={() => handleSort("time")}>Heure</th>
                        <th onClick={() => handleSort("credits")}>Crédits</th>
                        <th>Places</th>
                        <th onClick={() => handleSort("status")}>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.length === 0 ? (
                        <tr><td colSpan="9" className="text-center">Aucune session trouvée</td></tr>
                    ) : sessions.map(s => (
                        <tr
                            key={s.id}
                        // className={`transition-all ${s.status === "Expirée" ? "opacity-50 pointer-events-none" : ""
                        //     }`}
                        >
                            <td><input type="checkbox" checked={selectedSessions.includes(s.id)} onChange={() => handleSelectSession(s.id)} /></td>
                            <td>{s.titre}</td>
                            <td><p className="mb-0" style={{ fontSize: "0.95rem" }}>{s.coatch}</p></td>
                            <td> <i className="bi bi-calendar3 me-1"></i>{new Date(s.date).toLocaleDateString("fr-FR")}</td>
                            <td> <i className="bi bi-clock me-1"></i> {new Date(s.heure).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}</td>
                            <td>
                                <span className="badge bg-info-subtle text-info">
                                    {s.credits} crédit{s.credits > 1 ? "s" : ""}
                                </span>
                            </td>
                            <td>
                                <div className="d-flex flex-column" style={{ minWidth: "150px" }}>
                                    <small className="text-muted mb-1">
                                        {s.place_reserver}/{s.places} réservées
                                    </small>
                                    <div className="progress" style={{ height: "6px" }}>
                                        <div
                                            className={`progress-bar ${getProgressColor(s.place_reserver, s.places)}`}
                                            style={{ width: `${(s.place_reserver / s.places) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className={`badge ${getStatusBadge(s.status)}`}>
                                    {s.status}
                                </span>
                            </td>

                            <td>
                                <div className="d-flex justify-content-center gap-1">

                                    <button
                                        className="btn btn-sm btn-primary"
                                        title="Modifier"
                                        onClick={() => handleEditSession(s)}
                                        disabled={s.status === "Expirée"}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteSessionClick(s)}
                                        title="Supprimer"
                                        disabled={s.place_reserver > 0 && s.status !== "Expirée"}

                                    >
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="card-footer border-0">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div className="text-muted">
                        Afficher{" "}
                        <span className="fw-semibold">{sortedSessions.length > 0 ? startIndex + 1 : 0}</span> à{" "}
                        <span className="fw-semibold">
                            {Math.min(startIndex + rowsPerPage, sortedSessions.length)}
                        </span>{" "}
                        sur <span className="fw-semibold">{sortedSessions.length}</span> sessions
                    </div>
                    {totalPages > 0 && (
                        <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                            </li>

                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(
                                    (page) =>
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                )
                                .map((page, index, array) => (
                                    <React.Fragment key={page}>
                                        {index > 0 && array[index - 1] !== page - 1 && (
                                            <li className="page-item disabled">
                                                <span className="page-link">...</span>
                                            </li>
                                        )}
                                        <li
                                            className={`page-item ${currentPage === page ? "active" : ""
                                                }`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(page)}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    </React.Fragment>
                                ))}
                            <li
                                className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
