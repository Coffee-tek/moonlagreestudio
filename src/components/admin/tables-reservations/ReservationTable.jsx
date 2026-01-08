import React from "react";
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'




export default function ReservationTable({
  data,
  selectedDatas,
  setSelectedDatas,
  onSort,
  sortConfig,
  onEdit,
  onDelete,
  handleCancel,
  handleConfirmation,
  confirmCancel
}) {
  const toggleSelect = (id) => {
    setSelectedDatas((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const selectAll = (e) => {
    if (e.target.checked) {
      setSelectedDatas(data.map((u) => u.id));
    } else {
      setSelectedDatas([]);
    }
  };

  console.log(data);


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
                  data.length > 0 && selectedDatas.length === data.length
                }
              />
            </th>
            <th onClick={() => onSort("name")} style={{ cursor: "pointer" }}>
              Clients <i className="bi bi-arrow-down-up"></i>
            </th>
            <th onClick={() => onSort("phone")} style={{ cursor: "pointer" }}>
              Seance<i className="bi bi-arrow-down-up"></i> </th>
            {/* <th onClick={() => onSort("adress")} style={{ cursor: "pointer" }}>
              Reservation <i className="bi bi-arrow-down-up"></i>
            </th> */}
            <th onClick={() => onSort("credits")} style={{ cursor: "pointer" }}>
              Date <i className="bi bi-arrow-down-up"></i>
            </th>
            <th onClick={() => onSort("points")} style={{ cursor: "pointer" }}>
              Heure <i className="bi bi-arrow-down-up"></i>
            </th>
            <th>Mode de paiement</th>
            <th>Statut</th>
            <th>Payée</th>

            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length ? (
            data.map((r) => (
              <tr
                key={r.id}
                className={`transition-all ${r.seance?.status === "Expirée" ? "opacity-50 pointer-events-none" : ""
                  }`}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedDatas.includes(r.id)}
                    onChange={() => toggleSelect(r.id)}
                  />
                </td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    {/* <img
                      // src={r.image}
                      src="/img/popular-classes/1.jpeg"
                      alt={r.name}
                      style={{ height: "40px", width: "40px" }}
                      className="rounded-circle"
                    /> */}
                    <div>
                      <strong>{r.user?.name}</strong>
                      <div className="small text-muted">{r.user?.telephone}</div>
                    </div>
                  </div>
                </td>
                <td>{r.seance?.titre}</td>
                {/* <td>{r.id}</td> */}
                <td>{r.seance?.date ? format(new Date(r.seance.date), "dd/MM/yyyy", { locale: fr }) : ''}</td>
                <td>{r.seance?.heure ? format(new Date(r.seance.heure), "HH:mm", { locale: fr }) : ''}</td>
                {/* <td>{r.modePaiement}</td> */}
                <td>
                  {r.modePaiement === "en_ligne" ? (
                    <span className="badge bg-secondary">En ligne</span>
                  ) : (
                    <span className="badge bg-warning">Sur place</span>
                  )}
                </td>
                {/* <td>{r.statut}</td> */}
                <td>
                  {r.statut === "en_attente" && <span className="badge" style={{ color: "#000" }} >En attente</span>}
                  {r.statut === "annule" && <span className="badge" style={{ color: "#dc3545" }} >Annulé</span>}
                  {r.statut === "confirme" && <span className="badge" style={{ color: "#51892f" }} >Confirmé</span>}
                  {r.statut === "termine" && <span className="badge" style={{ color: "#000" }}>Terminé</span>}
                </td>
                {/* <td>{r.paye}</td> */}
                <td>
                  {r.paye ? (
                    <span className="badge" style={{ color: "#51892f" }}>Payée</span>
                  ) : (
                    <span className="badge" style={{ color: "#dc3545" }}>Non payée</span>
                  )}
                </td>

                <td className="text-center" >
                  <button
                    className="btn btn-sm me-1"
                    style={{ backgroundColor: "#212529", color: "white" }}
                    // onClick={() => onEdit(r)}
                    onClick={() => handleConfirmation(r.id)}
                    title="Valider la reservation"
                    disabled={r.statut === "annule" || r.seance?.status === "Expirée" || r.modePaiement === "en_ligne"} // 👈 désactive pour admin
                  >
                    <i className="bi bi-check2-square"></i>
                  </button>

                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: "#212529", color: "white" }}
                    // onClick={() => onDelete(r)}
                    // onClick={() => handleCancel(r.id)}
                     onClick={() => confirmCancel(r)}
                    disabled={r.seance?.status === "Expirée"} // 👈 désactive aussi
                    title="Annulée la reservation "
                  >
                    {/* <i className="bi bi-trash3"></i> */}
                    <i className="bi bi-x-square"></i>
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
