import React from "react";

export default function UserTable({
  users,
  selectedUsers,
  setSelectedUsers,
  onSort,
  sortConfig,
  onEdit,
  onWallet,
  onDelete,
}) {
  const toggleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const selectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };
  console.log(users);

  

  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead className="bg-light text-uppercase small">
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={selectAll}
                checked={
                  users.length > 0 && selectedUsers.length === users.length
                }
              />
            </th>
            <th onClick={() => onSort("name")} style={{ cursor: "pointer" }}>
              Utilisateur <i className="bi bi-arrow-down-up"></i>
            </th>
            <th onClick={() => onSort("phone")} style={{ cursor: "pointer" }}>
              Téléphone<i className="bi bi-arrow-down-up"></i> </th>
            <th onClick={() => onSort("adress")} style={{ cursor: "pointer" }}>
              Adresse <i className="bi bi-arrow-down-up"></i>
            </th>
            <th onClick={() => onSort("credits")} style={{ cursor: "pointer" }}>
              Crédits <i className="bi bi-arrow-down-up"></i>
            </th>
            <th onClick={() => onSort("points")} style={{ cursor: "pointer" }}>
              Points <i className="bi bi-arrow-down-up"></i>
            </th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelect(user.id)}
                  />
                </td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      // src={user.image}
                      // src={user?.image ? `/uploads/${user.image}` : "/img/user-img.jpg"}
                      src={user?.image ? user.image : "/img/user-img.jpg"}
                      alt={user.name}
                      style={{ height: "40px", width: "40px" }}
                      className="rounded-circle"
                    />
                    <div>
                      <strong>{user.name}</strong>
                      <div className="small text-muted">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.telephone}</td>
                <td>{user.adresse}</td>
                <td>{user.wallet?.credit}</td>
                <td>{user.wallet?.point}</td>
                {/* <td>{user.statut_compte}</td> */}
                <td>
                  {user.statut_compte === "actif" && (
                    <span className="badge" style={{ color: "#008000", backgroundColor: "#d1e7dd" }}>
                      Active
                    </span>
                  )}
                  {user.statut_compte === "inactif" && (
                    <span className="badge" style={{ color: "#ffc107", backgroundColor: "#fff3cd" }}>
                      Inactive
                    </span>
                  )}
                  {user.statut_compte === "suspendu" && (
                    <span className="badge" style={{ color: "#dc3545", backgroundColor: "#f8d7da" }}>
                      Suspendu
                    </span>
                  )}
                </td>

                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary me-1"
                    onClick={() => onWallet(user)}
                    disabled={user.role === "admin"} // 👈 désactive pour admin
                  >
                    <i className="bi bi-wallet"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-primary me-1"
                    onClick={() => onEdit(user)}
                    disabled={user.role === "admin"} // 👈 désactive pour admin
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(user)}
                    disabled={user.role === "admin"} // 👈 désactive aussi
                    title={user.role === "admin" ? "Impossible de supprimer un admin" : ""}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-3 text-muted">
                Aucun utilisateur trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
