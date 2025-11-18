"use client";
import React, { useState, useEffect } from "react";
import PackCard from "@/components/admin/ui/PackCard";
import PackEditModal from "@/components/admin/ui/PackEditModal";
import { createPackAction, updatePackAction, deletePackAction } from "@/actions/packActions";
import { toast } from "sonner";

export default function AdminPacks({ initialPacks }) {
    const [packs, setPacks] = useState(initialPacks || []);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPack, setSelectedPack] = useState(null);

    const handleAddPack = async () => {
        const newPack = await createPackAction(); // ✅ crée dans la base avec valeurs par défaut
        setPacks((prev) => [newPack, ...prev]);
    };

    const handleEditPack = (pack) => {
        setSelectedPack(pack);
        setShowEditModal(true);
    };

    const handleSavePack = async (data) => {
        try {
            const updated = await updatePackAction(selectedPack.id, data);
            setPacks((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
            );
            setShowEditModal(false);
            setSelectedPack(null);

            // ✅ Toast de succès ici
            toast.success("Le pack a été mis à jour avec succès !");
        } catch (error) {
            toast.error("Erreur lors de la mise à jour du pack.");
        }
    };



    const handleDeletePack = async (pack) => {
        if (confirm(`Supprimer le pack "${pack.titre}" ?`)) {
            await deletePackAction(pack.id);
            setPacks((prev) => prev.filter((p) => p.id !== pack.id));
        }
    };

    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="d-flex justify-content-between align-items-center py-3 mb-4">
                <h4 className="fw-bold m-0">
                    <span className="text-muted fw-light">Gestion /</span> Packs
                </h4>
                <button className="btn btn-primary" onClick={handleAddPack}>
                    Ajouter un pack
                </button>
            </div>

            <div className="row g-4">
                {packs.length === 0 ? (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted fw-bold">Aucun pack disponible pour le moment.</p>
                    </div>
                ) : (
                    packs.map((pack) => (
                        <PackCard
                            key={pack.id}
                            pack={pack}
                            onEdit={handleEditPack}
                            onDelete={handleDeletePack}
                        />
                    ))
                )}

                {showEditModal && selectedPack && (
                    <PackEditModal
                        pack={selectedPack}
                        onClose={() => {
                            setShowEditModal(false);
                            setSelectedPack(null);
                        }}
                        onSave={handleSavePack}
                    />
                )}
            </div>
        </div>
    );
}
