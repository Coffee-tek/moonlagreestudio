"use client";
import React, { useState, useEffect, startTransition } from "react";
import { faker } from "@faker-js/faker";
import DeleteModal from "./DeleteModal";
import UserViewModal from "@/components/admin/ui/UserViewModal";
import UserEditModal from "@/components/admin/ui/UserEditModal";
import UserAddModal from "@/components/admin/ui/UserAddModal";
import ReservationHeader from "./ReservationHeader";
import ReservationTable from "./ReservationTable";
import ReservationPagination from "./ReservationPagination";
import { deleteUserAction } from "../../../actions/delete-user.action";
import { annulerReservationAction, confirmerReservationAction } from "../../../actions/reservationActions";
import { toast } from "sonner";

const generateFakeUsers = (count = 50) => {
  const roles = ["Project Manager", "Developer", "Support Lead", "Security Officer"];
  const statuses = ["Active", "Inactive", "Suspended"];
  return Array.from({ length: count }, (_, index) => ({
    id: `#USR${String(index + 1).padStart(5, "0")}`,
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement(roles),
    status: faker.helpers.arrayElement(statuses),
    credits: faker.number.int({ min: 0, max: 999 }),
    points: faker.number.int({ min: 0, max: 999 }),
    adress: faker.location.street(),
    phone: faker.phone.number(),
  }));
};

export default function AdminReservation({ reservation }) {
  // --- States globaux ---
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDatas, setSelectedDatas] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // --- Modals ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedData, SetSelectedData] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, multiple: false, reservation: null });
  const [selectAll, setSelectAll] = useState(false);


  useEffect(() => {
    // setData(generateFakeUsers());
    setData(reservation);

  }, []);

  // --- Filtrage + tri + pagination ---
  const filteredReservations = data.filter((r) =>
    [
      r.user?.name,
      r.user?.email,
      r.seance?.titre,
      r.modePaiement,
      r.statut,  
    ]
      .filter(Boolean) // 🔒 évite les erreurs si un champ est null/undefined
      .some((field) =>
        field.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
    (statusFilter === "All" || r.statut === statusFilter || r.modePaiement === statusFilter || r.paye === statusFilter)
  );


  const sortReservations = [...filteredReservations].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const dir = sortConfig.direction === "asc" ? 1 : -1;
    return a[sortConfig.key] > b[sortConfig.key] ? dir : -dir;
  });

  const totalPages = Math.ceil(sortReservations.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedReservation = sortReservations.slice(startIndex, startIndex + rowsPerPage);

  // --- Handlers principaux ---


  // Toggle select all
  const handleSelectAll = (isChecked) => {
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedDatas(paginatedReservation.map((r) => r.id));
    } else {
      setSelectedDatas([]);
    }
  };
  const handleSort = (key) =>
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));

  const handleDelete = async (ids) => {
    try {
      // Pour suppression multiple
      for (const id of ids) {
        const res = await deleteUserAction({ userId: id });
        if (!res.success) {
          console.error(`Erreur suppression utilisateur ${id}: ${res.error}`);
        }
      }

      // MAJ côté client
      setData(data.filter((r) => !ids.includes(r.id)));
      setSelectedDatas([]);
      setDeleteModal({ show: false, multiple: false, reservation: null });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };


  const handleAddReservation = (reservation) => {
    setData([reservation, ...data]);
    setShowAddModal(false);
  };

  const handleSaveEdit = (uptdateReservation) => {
    setData(data.map((r) => (r.id === uptdateReservation.id ? uptdateReservation : r)));
    setShowEditModal(false);
  };

  const handleCancel = (reservationId) => {
    startTransition(async () => {
      try {
        const result = await annulerReservationAction(reservationId);

        if (result.error) throw new Error(result.error);

        toast.success("Réservation annulée !");
        window.location.reload();

      } catch (err) {
        toast.error("Échec de l’annulation");
        console.error(err);
      }
    });
  };

  const handleConfirmation = (reservationId) => {
    startTransition(async () => {
      try {
        const result = await confirmerReservationAction(reservationId);

        if (result.error) throw new Error(result.error);

        toast.success("Réservation confirmer !");
        window.location.reload();

      } catch (err) {
        toast.error(`Échec de la confirmation : ${err.message}`);
        console.error(err);
      }
    });
  };

  return (
    <>


      <div className="card">
        <ReservationHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentPage={setCurrentPage}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          selectedDatas={selectedDatas}
          onDeleteSelected={() =>
            setDeleteModal({ show: true, multiple: true, reservation: null })
          }
          onAddUser={() => setShowAddModal(true)}
        />

        <ReservationTable
          data={paginatedReservation}
          selectedDatas={selectedDatas}
          setSelectedDatas={setSelectedDatas}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          onSort={handleSort}
          sortConfig={sortConfig}
          onEdit={(reservation) => {
            SetSelectedData(reservation);
            setShowEditModal(true);
          }}
          onDelete={(reservation) =>
            setDeleteModal({ show: true, multiple: false, reservation })
          }
          handleCancel={handleCancel}
          handleConfirmation={handleConfirmation}
        />


        <ReservationPagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          startIndex={startIndex}
          rowsPerPage={rowsPerPage}
          totalItems={sortReservations.length}
        />
      </div>

      {/* --- Modals --- */}
      {showAddModal && (
        <UserAddModal onClose={() => setShowAddModal(false)} onAdd={handleAddReservation} />
      )}
      {showEditModal && (
        <UserEditModal
          reservation={selectedData}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
        />
      )}
      {showViewModal && (
        <UserViewModal reservation={selectedData} onClose={() => setShowViewModal(false)} />
      )}
      {deleteModal.show && (
        <DeleteModal
          isMultiple={deleteModal.multiple}
          reservation={deleteModal.reservation}
          count={selectedDatas.length}
          onCancel={() => setDeleteModal({ show: false, multiple: false, reservation: null })}
          onConfirm={() =>
            handleDelete(
              deleteModal.multiple ? selectedDatas : [deleteModal.reservation.id]
            )
          }
        />
      )}
    </>
  );
}
