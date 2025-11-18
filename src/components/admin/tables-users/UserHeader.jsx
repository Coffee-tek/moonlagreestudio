import React from "react";

export default function UserHeader({
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    statusFilter,
    setStatusFilter,
    rowsPerPage,
    setRowsPerPage,
    selectedUsers,
    onDeleteSelected,
    onAddUser,
}) {
    return (
        <div className="card-header border-light d-flex justify-content-between flex-wrap gap-3">
            <div className="d-flex gap-2 flex-wrap">
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

                {selectedUsers.length > 0 && (
                    <button
                        className="btn btn-danger"
                        onClick={onDeleteSelected}>
                        Supprimer ({selectedUsers.length})
                    </button>
                )}
            </div>

            <div className="d-flex align-items-center gap-2 flex-wrap">
                <span className="me-2 fw-semibold d-none d-md-inline">Filtrer par:</span>
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
                        <option value="actif">Active</option>
                        <option value="inactif">Inactive</option>
                        <option value="suspendu">Suspendu</option>
                    </select>
                </div>

                <div>
                    <select
                        className="form-select"
                        value={rowsPerPage}
                        onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    >
                        <option value="5">5</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>


                {/* <button className="btn btn-primary" onClick={onAddUser}>
                    Ajouter Utilisateur
                </button> */}
            </div>
        </div>
    );
}
