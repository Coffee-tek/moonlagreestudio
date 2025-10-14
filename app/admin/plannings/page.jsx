"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";
import React from "react";
import SessionAddModal from '@/components/admin/ui/SessionAddModal';
import SessionEditModal from '@/components/admin/ui/SessionEditModal';

// Fonction pour générer des sessions fictives
const generateFakeSessions = (count = 50) => {
  const teachers = [
    "Sophie Martin", "Lucas Dubois", "Emma Bernard", "Thomas Petit",
    "Léa Moreau", "Nathan Laurent", "Chloé Simon", "Hugo Michel"
  ];
  
  return Array.from({ length: count }, (_, index) => {
    const totalPlaces = faker.number.int({ min: 10, max: 30 });
    const bookedPlaces = faker.number.int({ min: 0, max: totalPlaces });
    const remainingPlaces = totalPlaces - bookedPlaces;
    
    return {
      id: `#SES${String(index + 1).padStart(5, "0")}`,
      teacher: faker.helpers.arrayElement(teachers),
      teacherAvatar: faker.image.avatar(),
      date: faker.date.future().toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: `${faker.number.int({ min: 8, max: 20 })}:${faker.helpers.arrayElement(["00", "30"])}`,
      credits: faker.number.int({ min: 1, max: 5 }),
      totalPlaces,
      bookedPlaces,
      remainingPlaces,
      status: remainingPlaces === 0 ? "Complet" : remainingPlaces <= 3 ? "Presque complet" : "Disponible",
    };
  });

};

export default function AdminPlanning() {
  const [searchQuery, setSearchQuery] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Générer les sessions au montage du composant
  useEffect(() => {
    setSessions(generateFakeSessions(50));
  }, []);

  // Liste unique des professeurs pour le filtre
  // const uniqueTeachers = [...new Set(sessions.map(s => s.teacher))];

  // Filtrage des sessions
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.date.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTeacher = teacherFilter === "All" || session.teacher === teacherFilter;
    const matchesStatus = statusFilter === "All" || session.status === statusFilter;

    return matchesSearch && matchesTeacher && matchesStatus;
  });

  // Tri des sessions
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedSessions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedSessions = sortedSessions.slice(startIndex, startIndex + rowsPerPage);

  // Gestion du tri
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  // Gestion de la sélection
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedSessions(paginatedSessions.map((session) => session.id));
    } else {
      setSelectedSessions([]);
    }
  };

  const handleSelectSession = (sessionId) => {
    if (selectedSessions.includes(sessionId)) {
      setSelectedSessions(selectedSessions.filter((id) => id !== sessionId));
    } else {
      setSelectedSessions([...selectedSessions, sessionId]);
    }
  };

  const handleDeleteSelected = () => {
    if (confirm(`Voulez-vous supprimer ${selectedSessions.length} session(s) ?`)) {
      setSessions(sessions.filter((session) => !selectedSessions.includes(session.id)));
      setSelectedSessions([]);
      setSelectAll(false);
    }
  };

  const handleDeleteSession = (sessionId) => {
    if (confirm("Voulez-vous supprimer cette session ?")) {
      setSessions(sessions.filter((session) => session.id !== sessionId));
      setSelectedSessions(selectedSessions.filter((id) => id !== sessionId));
    }
  };

  // Navigation pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectAll(false);
    setSelectedSessions([]);
  };

  // Badge de statut
  const getStatusBadge = (status) => {
    const badges = {
      Disponible: "bg-success-subtle text-success",
      "Presque complet": "bg-warning-subtle text-warning",
      Complet: "bg-danger-subtle text-danger",
    };
    return badges[status] || "";
  };

  // Barre de progression des places
  const getProgressColor = (remaining, total) => {
    const percentage = (remaining / total) * 100;
    if (percentage > 50) return "bg-success";
    if (percentage > 20) return "bg-warning";
    return "bg-danger";
  };

  // Dans le composant :
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Extraire la liste unique des professeurs
  const uniqueTeachers = [...new Set(sessions.map(s => s.teacher))];

  // Handlers
  const handleAddSession = (newSession) => {
    setSessions([newSession, ...sessions]);
    setShowAddModal(false);
  };

  const handleEditSession = (session) => {
    setSelectedSession(session);
    setShowEditModal(true);
  };

  const handleSaveSession = (updatedSession) => {
    setSessions(
      sessions.map((s) =>
        s.id === updatedSession.id ? updatedSession : s
      )
    );
    setShowEditModal(false);
};

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Gestion /</span> Planning des Sessions
      </h4>

      <div className="card">
        {/* Header avec filtres */}
        <div className="card-header border-light d-flex justify-content-between flex-wrap gap-3">
          <div className="d-flex gap-2 flex-wrap">
            {/* Barre de recherche */}
            <div className="app-search position-relative">
              <input
                type="search"
                className="form-control"
                placeholder="Session..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="app-search-icon text-muted position-absolute"
                style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }}
              >
                <path d="m21 21-4.34-4.34"></path>
                <circle cx="11" cy="11" r="8"></circle>
              </svg>
            </div>

            {/* Bouton Delete */}
            {selectedSessions.length > 0 && (
              <button
                className="btn btn-danger"
                onClick={handleDeleteSelected}
              >
                Supprimer ({selectedSessions.length})
              </button>
            )}
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="me-2 fw-semibold d-none d-md-inline">Filtrer par:</span>

            {/* Filtre par professeur */}
            <div className="app-search position-relative">
              <select
                className="form-select form-control"
                value={teacherFilter}
                onChange={(e) => {
                  setTeacherFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">Tous les professeurs</option>
                {uniqueTeachers.map((teacher) => (
                  <option key={teacher} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtre par statut */}
            <div className="app-search position-relative">
              <select
                className="form-select form-control"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">Tous les statuts</option>
                <option value="Disponible">Disponible</option>
                <option value="Presque complet">Presque complet</option>
                <option value="Complet">Complet</option>
              </select>
            </div>

            {/* Lignes par page */}
            <div>
              <select
                className="form-select form-control"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="5">5</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>

            {/* Bouton Ajouter */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <i className="bi bi-plus-circle me-1"></i>
              Ajouter Session
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
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
                <th
                  onClick={() => handleSort("id")}
                  style={{ cursor: "pointer" }}
                >
                  ID <i className="bi bi-arrow-down-up"></i>
                </th>
                <th
                  onClick={() => handleSort("teacher")}
                  style={{ cursor: "pointer" }}
                >
                  Professeur <i className="bi bi-arrow-down-up"></i>
                </th>
                <th
                  onClick={() => handleSort("date")}
                  style={{ cursor: "pointer" }}
                >
                  Date <i className="bi bi-arrow-down-up"></i>
                </th>
                <th
                  onClick={() => handleSort("time")}
                  style={{ cursor: "pointer" }}
                >
                  Heure <i className="bi bi-arrow-down-up"></i>
                </th>
                <th
                  onClick={() => handleSort("credits")}
                  style={{ cursor: "pointer" }}
                >
                  Crédits <i className="bi bi-arrow-down-up"></i>
                </th>
                <th>Places</th>
                <th
                  onClick={() => handleSort("status")}
                  style={{ cursor: "pointer" }}
                >
                  Statut <i className="bi bi-arrow-down-up"></i>
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSessions.length > 0 ? (
                paginatedSessions.map((session) => (
                  <tr key={session.id}>
                    <td className="ps-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedSessions.includes(session.id)}
                        onChange={() => handleSelectSession(session.id)}
                      />
                    </td>
                    <td>
                      <h5 className="m-0">
                        <Link href="#" className="text-decoration-none">
                          {session.id}
                        </Link>
                      </h5>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="avatar avatar-sm">
                          <Image
                            src={session.teacherAvatar}
                            className="rounded-circle"
                            alt={session.teacher}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div>
                          <h5 className="mb-0" style={{ fontSize: "0.95rem" }}>
                            {session.teacher}
                          </h5>
                        </div>
                      </div>
                    </td>
                    <td>
                      <i className="bi bi-calendar3 me-1"></i>
                      {session.date}
                    </td>
                    <td>
                      <i className="bi bi-clock me-1"></i>
                      {session.time}
                    </td>
                    <td>
                      <span className="badge bg-info-subtle text-info">
                        {session.credits} crédit{session.credits > 1 ? "s" : ""}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column" style={{ minWidth: "150px" }}>
                        <small className="text-muted mb-1">
                          {session.remainingPlaces}/{session.totalPlaces} disponibles
                        </small>
                        <div className="progress" style={{ height: "6px" }}>
                          <div
                            className={`progress-bar ${getProgressColor(
                              session.remainingPlaces,
                              session.totalPlaces
                            )}`}
                            style={{
                              width: `${
                                (session.remainingPlaces / session.totalPlaces) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(session.status)}`}>
                        {session.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        
                        <button
                          className="btn btn-sm btn-outline-primary"
                          title="Modifier"
                          onClick={() => handleEditSession(session)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteSession(session.id)}
                          title="Supprimer"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    <p className="text-muted mb-0">Aucune session trouvée</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer avec pagination */}
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

            {/* Pagination */}
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
                        className={`page-item ${
                          currentPage === page ? "active" : ""
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
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
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

      {showAddModal && (
        <SessionAddModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSession}
          teachers={uniqueTeachers}
        />
      )}

      {showEditModal && (
        <SessionEditModal
          session={selectedSession}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveSession}
          teachers={uniqueTeachers}
        />
      )}
      

      <style jsx>{`
        .app-search {
          position: relative;
        }
        
        .app-search-icon {
          pointer-events: none;
        }

        .avatar-sm {
          width: 40px;
          height: 40px;
        }

        .badge {
          padding: 0.35em 0.65em;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .bg-success-subtle {
          background-color: rgba(40, 167, 69, 0.1);
        }

        .bg-warning-subtle {
          background-color: rgba(255, 193, 7, 0.1);
        }

        .bg-danger-subtle {
          background-color: rgba(220, 53, 69, 0.1);
        }

        .bg-info-subtle {
          background-color: rgba(13, 202, 240, 0.1);
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

        .text-info {
          color: #0dcaf0;
        }

        .table th {
          font-weight: 600;
          color: #6c757d;
          border-bottom: 2px solid #dee2e6;
        }

        .table td {
          vertical-align: middle;
        }

        .btn-sm {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        }

        .page-link {
          border: none;
          background: transparent;
          color: #6c757d;
        }

        .page-item.active .page-link {
          background-color: #727cf5;
          color: white;
          border-radius: 0.25rem;
        }

        .page-link:hover:not(.disabled) {
          background-color: #f8f9fa;
          color: #727cf5;
        }

        .progress {
          background-color: #e9ecef;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-bar {
          transition: width 0.3s ease;
        }

        @media (max-width: 768px) {
          .card-header {
            flex-direction: column;
          }
          
          .d-flex.gap-2 {
            width: 100%;
          }
          
          .app-search,
          .form-select {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}