"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";
import UserViewModal from '@/components/admin/ui/UserViewModal';
import UserEditModal from '@/components/admin/ui/UserEditModal';
import UserAddModal from '@/components/admin/ui/UserAddModal';
import React from "react";

// Fonction pour générer des utilisateurs fictifs
const generateFakeUsers = (count = 50) => {
  const roles = ["Project Manager", "Developer", "Support Lead", "Security Officer"];
  const statuses = ["Active", "Inactive", "Suspended"];
  
  return Array.from({ length: count }, (_, index) => ({
    id: `#USR${String(index + 1).padStart(5, "0")}`,
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement(roles),
    lastUpdated: faker.date.recent({ days: 30 }).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: faker.date.recent({ days: 1 }).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    status: faker.helpers.arrayElement(statuses),
    credits : faker.number.int({ min: 0, max: 999 }),
    points: faker.number.int({ min: 0, max: 999 }),
    adress: faker.location.street(),
    phone: faker.phone.number(),
  }));
};

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Générer les utilisateurs au montage du composant
  useEffect(() => {
    setUsers(generateFakeUsers(50));
  }, []);

  // Filtrage des utilisateurs
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Tri des utilisateurs
  const sortedUsers = [...filteredUsers].sort((a, b) => {
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
  const totalPages = Math.ceil(sortedUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + rowsPerPage);

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
      setSelectedUsers(paginatedUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteSelected = () => {
    if (confirm(`Voulez-vous supprimer ${selectedUsers.length} utilisateur(s) ?`)) {
      setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
      setSelectAll(false);
    }
  };

  const handleDeleteUser = (userId) => {
    if (confirm("Voulez-vous supprimer cet utilisateur ?")) {
      setUsers(users.filter((user) => user.id !== userId));
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  // Navigation pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectAll(false);
    setSelectedUsers([]);
  };

  // Badge de statut
  const getStatusBadge = (status) => {
    const badges = {
      Active: "bg-success-subtle text-success",
      Inactive: "bg-warning-subtle text-warning",
      Suspended: "bg-danger-subtle text-danger",
    };
    return badges[status] || "";
  };



  // Ouvrir le modal d'édition
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  // Fermer les modals
  const handleCloseModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setShowAddModal(false);
    setSelectedUser(null);
  };

  // Sauvegarder les modifications
  const handleSaveEdit = (updatedUser) => {
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
    handleCloseModals();
  };

  // Ajouter un nouvel utilisateur
  const handleAddUser = (newUser) => {
    setUsers([newUser, ...users]);
    handleCloseModals();
  };

  const [showDeleteSingleModal, setShowDeleteSingleModal] = useState(false);
  const [showDeleteMultipleModal, setShowDeleteMultipleModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Ouvrir modal suppression simple
  const handleOpenDeleteSingle = (user) => {
    setUserToDelete(user);
    setShowDeleteSingleModal(true);
  };

  // Confirmer suppression simple
  const confirmDeleteSingle = () => {
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setSelectedUsers(selectedUsers.filter((id) => id !== userToDelete.id));
    setShowDeleteSingleModal(false);
    setUserToDelete(null);
  };

  // Ouvrir modal suppression multiple
  const handleOpenDeleteMultiple = () => {
    setShowDeleteMultipleModal(true);
  };

  // Confirmer suppression multiple
  const confirmDeleteMultiple = () => {
    setUsers(users.filter((u) => !selectedUsers.includes(u.id)));
    setSelectedUsers([]);
    setSelectAll(false);
    setShowDeleteMultipleModal(false);
  };

  return (
    <>

      <div className="card">
        {/* Header avec filtres */}
        <div className="card-header border-light d-flex justify-content-between flex-wrap gap-3">
          <div className="d-flex gap-2 flex-wrap">
            {/* Barre de recherche */}
            <div className="app-search position-relative">
              <input
                type="search"
                className="form-control"
                placeholder="Utilisateur..."
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
            {selectedUsers.length > 0 && (
              <button
                className="btn btn-danger"
               onClick={handleOpenDeleteMultiple}
              >
                Supprimer ({selectedUsers.length})
              </button>
            )}
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="me-2 fw-semibold d-none d-md-inline">Filtrer par:</span>


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
                <option value="All">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
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
              Ajouter Utilisateur
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
                  onClick={() => handleSort("name")}
                  style={{ cursor: "pointer" }}
                >
                  Utilisateur <i className="bi bi-arrow-down-up"></i>
                </th>
                <th
                  onClick={() => handleSort("role")}
                  style={{ cursor: "pointer" }}
                >
                  Téléphone <i className="bi bi-arrow-down-up"></i>
                </th>
                <th
                  onClick={() => handleSort("lastUpdated")}
                  style={{ cursor: "pointer" }}
                >
                  Adresse <i className="bi bi-arrow-down-up"></i>
                </th>
                <th
                  onClick={() => handleSort("status")}
                  style={{ cursor: "pointer" }}
                >
                  Crédits <i className="bi bi-arrow-down-up"></i>
                </th>
                <th
                  onClick={() => handleSort("status")}
                  style={{ cursor: "pointer" }}
                >
                  Points <i className="bi bi-arrow-down-up"></i>
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="ps-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </td>

                    {/* <td>
                      <h5 className="m-0">
                        <Link href="#" className="text-decoration-none">
                          {user.id}
                        </Link>
                      </h5>
                    </td> */}

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="avatar avatar-sm">
                          <Image
                            src={user.avatar}
                            className="rounded-circle"
                            alt={user.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div>
                          <h5 className="mb-0" style={{ fontSize: "0.95rem" }}>
                            <Link
                              href="/users-profile"
                              className="text-decoration-none text-dark"
                            >
                              {user.name}
                            </Link>
                          </h5>
                          <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>{user.phone}</td>

                    <td>{user.adress}</td>

                 

                    <td>{user.credits}</td>

                    <td>{user.points}</td>

                    <td>
                      <div className="d-flex justify-content-center gap-1">

                     

                        <button
                          onClick={() => handleEditUser(user)}
                          className="btn btn-sm btn-outline-primary"
                          title="Edit"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleOpenDeleteSingle(user)}
                          title="Delete"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    <p className="text-muted mb-0">Aucun utilisateur trouvé</p>
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
              <span className="fw-semibold">{startIndex + 1}</span> à{" "}
              <span className="fw-semibold">
                {Math.min(startIndex + rowsPerPage, sortedUsers.length)}
              </span>{" "}
              sur <span className="fw-semibold">{sortedUsers.length}</span> utilisateurs
            </div>

            {/* Pagination */}
            <ul className="pagination pagination-sm mb-0">
              {/* Bouton précédent */}
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                <i className="bi bi-arrow-left"></i>
                </button>
              </li>

              {/* Pages */}
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

              {/* Bouton suivant */}
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
          </div>
        </div>

      </div>

      {/* Modals */}
      {showViewModal && (
        <UserViewModal user={selectedUser} onClose={handleCloseModals} />
      )}

      {showEditModal && (
        <UserEditModal
          user={selectedUser}
          onClose={handleCloseModals}
          onSave={handleSaveEdit}
        />
      )}

      {showAddModal && (
        <UserAddModal onClose={handleCloseModals} onAdd={handleAddUser} />
      )}

      {/* Modal suppression multiple */}
      {showDeleteMultipleModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title text-danger">Confirmer la suppression</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteMultipleModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer {selectedUsers.length} utilisateur(s) ? Cette action est irréversible.</p>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={() => setShowDeleteMultipleModal(false)}>Annuler</button>
                <button className="btn btn-danger" onClick={confirmDeleteMultiple}>Oui, supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal suppression utilisateur spécifique */}
      {showDeleteSingleModal && userToDelete && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title text-danger">Confirmer la suppression</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteSingleModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer {userToDelete.name} ? Cette action est irréversible.</p>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={() => setShowDeleteSingleModal(false)}>Annuler</button>
                <button className="btn btn-danger" onClick={confirmDeleteSingle}>Oui, supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <style jsx>{`
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

        .text-success {
          color: #28a745;
        }

        .text-warning {
          color: #ffc107;
        }

        .text-danger {
          color: #dc3545;
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
          background-color: #0b0823;
          color: white;
          border-radius: 0.25rem;
        }

        .page-link:hover:not(.disabled) {
          background-color: #f8f9fa;
          color: #0b0823;
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
      `}</style> */}
    </>
  );
}