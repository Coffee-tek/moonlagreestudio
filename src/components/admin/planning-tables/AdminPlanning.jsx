"use client";
import { useState, useEffect } from "react";
import React from "react";
import { faker } from "@faker-js/faker";
import PlanningHeader from "./PlanningHeader";
import PlanningTable from "./PlanningTable";
import SessionAddModal from '@/components/admin/ui/SessionAddModal';
import SessionEditModal from '@/components/admin/ui/SessionEditModal';
import DeleteModal from "./DeleteModal";
import { toast } from "sonner";
import { deleteSeanceAction } from "../../../actions/ seanceActions";

// Fonction pour générer des sessions fictives
// const generateFakeSessions = (count = 50) => {
//   const teachers = [
//     "Sophie Martin", "Lucas Dubois", "Emma Bernard", "Thomas Petit",
//     "Léa Moreau", "Nathan Laurent", "Chloé Simon", "Hugo Michel"
//   ];

//   return Array.from({ length: count }, (_, index) => {
//     const places = faker.number.int({ min: 10, max: 30 });
//     const place_reserver = faker.number.int({ min: 0, max: places });
//     const remainingPlaces = places - place_reserver;

//     return {
//       id: `#SES${String(index + 1).padStart(5, "0")}`,
//       titre: faker.company.catchPhrase(),
//       coatch: faker.helpers.arrayElement(teachers),
//       date: faker.date.future().toLocaleDateString("fr-FR"),
//       heure: `${faker.number.int({ min: 8, max: 20 })}:${faker.helpers.arrayElement(["00", "30"])}`,
//       credits: faker.number.int({ min: 1, max: 5 }),
//       places,
//       place_reserver,
//       remainingPlaces,
//       status: remainingPlaces === 0 ? "Complet" : remainingPlaces <= 3 ? "Presque complet" : "Disponible",
//     };
//   });
// };

export default function AdminPlanning({ seances }) {
  const [sessions, setSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSelectedModal, setShowDeleteSelectedModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  useEffect(() => {
    // setSessions(generateFakeSessions(50));
    setSessions(seances);

  }, []);

  const uniqueTeachers = [...new Set(sessions.map(s => s.coatch))];
  const uniqueSessionTitre = [...new Set(sessions.map(s => s.titre))];


  // Filtrage
  const filteredSessions = sessions.filter((session) => {
    const dateStr = new Date(session.date).toLocaleDateString("fr-FR"); // ou "en-US"
    const matchesSearch =
      String(session.titre).toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.coatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dateStr.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTeacher = teacherFilter === "All" || session.coatch === teacherFilter;
    const matchesStatus = statusFilter === "All" || session.status === statusFilter;


    return matchesSearch && matchesTeacher && matchesStatus;
  });



  // Tri
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedSessions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedSessions = sortedSessions.slice(startIndex, startIndex + rowsPerPage);

  // Handlers
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedSessions(paginatedSessions.map((s) => s.id));
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

  const handleAddSession = (newSession) => { setSessions([newSession, ...sessions]); setShowAddModal(false); };

  const handleEditSession = (session) => {
    setSelectedSession(session);
    setShowEditModal(true);
  };

  const handleSaveSession = (updatedSession) => {
    setSessions(sessions.map((s) => s.id === updatedSession.id ? updatedSession : s));
    setShowEditModal(false);
  };

  const handleDeleteSessionClick = (session) => { setSessionToDelete(session); setShowDeleteModal(true); };

  // const confirmDeleteSession = () => {
  //   setSessions(sessions.filter((s) => s.id !== sessionToDelete.id));
  //   setSelectedSessions(selectedSessions.filter((id) => id !== sessionToDelete.id));
  //   setShowDeleteModal(false);
  //   setSessionToDelete(null);
  // };
  // 🗑️ Suppression d'une seule séance
  const confirmDeleteSession = async () => {
    if (!sessionToDelete) return;

    try {
      // Appel serveur (Prisma via service)
      await deleteSeanceAction(sessionToDelete.id);

      // Mise à jour du state local
      setSessions((prev) => prev.filter((s) => s.id !== sessionToDelete.id));
      setSelectedSessions((prev) => prev.filter((id) => id !== sessionToDelete.id));

      toast.success("La séance a été supprimée avec succès ✅");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Échec de la suppression de la séance ❌");
    } finally {
      setShowDeleteModal(false);
      setSessionToDelete(null);
    }
  };

  const handleDeleteSelectedClick = () => setShowDeleteSelectedModal(true);
  // const confirmDeleteSelectedSessions = () => {
  //   setSessions(sessions.filter((s) => !selectedSessions.includes(s.id)));
  //   setSelectedSessions([]);
  //   setSelectAll(false);
  //   setShowDeleteSelectedModal(false);
  // };
  // 🗑️ Suppression de plusieurs séances sélectionnées
  const confirmDeleteSelectedSessions = async () => {
    if (!selectedSessions.length) return;

    try {
      // Suppression de toutes les séances côté serveur
      await Promise.all(selectedSessions.map((id) => deleteSeanceAction(id)));

      // Mise à jour du state local
      setSessions((prev) => prev.filter((s) => !selectedSessions.includes(s.id)));

      toast.success(`${selectedSessions.length} séance(s) supprimée(s) avec succès ✅`);
    } catch (error) {
      console.error("Erreur lors de la suppression multiple :", error);
      toast.error("Échec de la suppression de certaines séances ❌");
    } finally {
      setSelectedSessions([]);
      setSelectAll(false);
      setShowDeleteSelectedModal(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectAll(false);
    setSelectedSessions([]);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Disponible":
        return "bg-success-subtle text-success";
      case "Presque complet":
        return "bg-warning-subtle text-warning";
      case "Complet":
        return "bg-danger-subtle text-danger";
      case "Expirée":
        return "bg-secondary-subtle text-secondary";
      default:
        return "bg-light text-dark";
    }
  };

  const getProgressColor = (booked, total) => {
    const percentage = (booked / total) * 100;
    if (percentage === 100) return "bg-danger";
    if (percentage > 20) return "bg-success";
    return "bg-success";
  };

  // console.log(seances);


  return (
    <>
      <div className="card">
        <PlanningHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          teacherFilter={teacherFilter}
          setTeacherFilter={setTeacherFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          uniqueTeachers={uniqueTeachers}
          selectedSessions={selectedSessions}
          setShowAddModal={setShowAddModal}
          handleDeleteSelectedClick={handleDeleteSelectedClick}
          setCurrentPage={setCurrentPage}
        />

        <PlanningTable
          sessions={paginatedSessions}
          selectedSessions={selectedSessions}
          handleSelectAll={handleSelectAll}
          selectAll={selectAll}
          handleSelectSession={handleSelectSession}
          handleSort={handleSort}
          handleEditSession={handleEditSession}
          handleDeleteSessionClick={handleDeleteSessionClick}
          getStatusBadge={getStatusBadge}
          getProgressColor={getProgressColor}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          startIndex={startIndex}
          rowsPerPage={rowsPerPage}
          sortedSessions={sortedSessions}
        />
      </div>


      {showAddModal &&
        <SessionAddModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSession}
          teachers={uniqueTeachers}
          sessionList={uniqueSessionTitre}
        />
      }
      {showEditModal &&
        <SessionEditModal
          session={selectedSession}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveSession}
          teachers={uniqueTeachers}
          sessionList={uniqueSessionTitre}
        />
      }

      {showDeleteModal &&
        <DeleteModal
          title="Supprimer la session ?"
          message={`Voulez-vous vraiment supprimer "${sessionToDelete.titre}" ?`}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDeleteSession} />
      }

      {showDeleteSelectedModal &&
        <DeleteModal title="Supprimer les sessions sélectionnées ?"
          message={`Voulez-vous vraiment supprimer ${selectedSessions.length} session(s) ?`}
          onCancel={() => setShowDeleteSelectedModal(false)}
          onConfirm={confirmDeleteSelectedSessions} />
      }
    </>
  );
}
