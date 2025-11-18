"use client";
import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import UserHeader from "./UserHeader";
import UserTable from "./UserTable";
import UserPagination from "./UserPagination";
import DeleteModal from "./DeleteModal";
import UserViewModal from "@/components/admin/ui/UserViewModal";
import UserAddModal from "@/components/admin/ui/UserAddModal";
import { deleteUserAction } from "../../../actions/delete-user.action";
import UserEditModal from "../ui/UserEditModal";
import UserWalletModal from "../ui/UserWalletModal";

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

export default function AdminUsers({ user }) {
  // --- States globaux ---
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // --- Modals ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModalWallet, setShowModalWallet] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, multiple: false, user: null });
  const [selectAll, setSelectAll] = useState(false);


  useEffect(() => {
    // setUsers(generateFakeUsers());
    setUsers(user);

  }, []);

  // --- Filtrage + tri + pagination ---
  const filteredUsers = users.filter((u) =>
    [u.name, u.email, u.id, u.statut_compte].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    ) && (statusFilter === "All" || u.statut_compte === statusFilter)
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const dir = sortConfig.direction === "asc" ? 1 : -1;
    return a[sortConfig.key] > b[sortConfig.key] ? dir : -dir;
  });

  const totalPages = Math.ceil(sortedUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + rowsPerPage);

  // --- Handlers principaux ---


  // Toggle select all
  const handleSelectAll = (isChecked) => {
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedUsers(paginatedUsers.map((u) => u.id));
    } else {
      setSelectedUsers([]);
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
      setUsers(users.filter((u) => !ids.includes(u.id)));
      setSelectedUsers([]);
      setDeleteModal({ show: false, multiple: false, user: null });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };


  const handleAddUser = (user) => {
    setUsers([user, ...users]);
    setShowAddModal(false);
  };

  const handleSaveEdit = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setShowEditModal(false);
  };
  const handleSaveWallet = (updated) => {
    setShowModalWallet(false);

    if (updated) {
      window.location.reload();
    }
  };

  return (
    <>


      <div className="card">
        <UserHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentPage={setCurrentPage}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          selectedUsers={selectedUsers}
          onDeleteSelected={() =>
            setDeleteModal({ show: true, multiple: true, user: null })
          }
          onAddUser={() => setShowAddModal(true)}
        />

        <UserTable
          users={paginatedUsers}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          onSort={handleSort}
          sortConfig={sortConfig}
          onEdit={(user) => {
            setSelectedUser(user);
            setShowEditModal(true);

          }}
          onWallet={(user) => {
            setSelectedUser(user);
            setShowModalWallet(true);

          }}
          onDelete={(user) =>
            setDeleteModal({ show: true, multiple: false, user })
          }
        />


        <UserPagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          startIndex={startIndex}
          rowsPerPage={rowsPerPage}
          totalItems={sortedUsers.length}
        />
      </div>

      {/* --- Modals --- */}
      {showAddModal && (
        <UserAddModal onClose={() => setShowAddModal(false)} onAdd={handleAddUser} />
      )}
      {showEditModal && (
        <UserEditModal
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
        />
      )}
      {showModalWallet && (
        <UserWalletModal
          user={selectedUser}
          onClose={() => setShowModalWallet(false)}
          onSaveWallet={handleSaveWallet}
        />
      )}
      {showViewModal && (
        <UserViewModal user={selectedUser} onClose={() => setShowViewModal(false)} />
      )}
      {deleteModal.show && (
        <DeleteModal
          isMultiple={deleteModal.multiple}
          user={deleteModal.user}
          count={selectedUsers.length}
          onCancel={() => setDeleteModal({ show: false, multiple: false, user: null })}
          onConfirm={() =>
            handleDelete(
              deleteModal.multiple ? selectedUsers : [deleteModal.user.id]
            )
          }
        />
      )}
    </>
  );
}
