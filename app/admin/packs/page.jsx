"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PackCard from "@/components/admin/ui/PackCard";
import PackEditModal from "@/components/admin/ui/PackEditModal";


export default function AdminPlanning() {
  
  const [packs, setPacks] = useState([
    { name: "Essai", credits: 10, price: 5 },
    { name: "Débutant", credits: 50, price: 20, promoPrice: 15 },
    { name: "Standard", credits: 100, price: 35 },
    { name: "Premium", credits: 250, price: 70, promoPrice: 60 },
    { name: "Premium", credits: 250, price: 70, promoPrice: 60 },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);

  const handleAddPack = () => {
    const newPack = { name: "Nouveau Pack", credits: 0, price: 0 };
    setPacks([...packs, newPack]);
  };

  const handleEditPack = (pack) => {
    setSelectedPack(pack);
    setShowEditModal(true);
  };

  const handleSavePack = (updatedPack) => {
    setPacks(packs.map(p => (p.id === updatedPack.id ? updatedPack : p)));
    setShowEditModal(false);
    setSelectedPack(null);
  };

  const handleDeletePack = (pack) => {
    if (confirm(`Supprimer le pack "${pack.name}" ?`)) {
      setPacks(packs.filter(p => p !== pack));
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
        {packs.map((pack, index) => (
          <PackCard
            key={index}
            pack={pack}
            onEdit={handleEditPack}
            onDelete={handleDeletePack}
          />
        ))}

         {/* Modal d'édition */}
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