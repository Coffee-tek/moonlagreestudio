"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { updateUser } from "@/lib/auth-client";

export default function PhotoProfil({ user }) {
  const [accountForm, setAccountForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || "/img/user-img.jpg",
  });
  const [isPending, setIsPending] = useState(false);
  const fileInputRef = useRef(null);

  // ===== Upload et mise à jour de la photo =====
  const handleProfileImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsPending(true);

      // 1. Upload sur ton endpoint serveur
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur lors de l'upload de l'image");

      const data = await res.json();
      const uploadedUrl = data.url;

      // 2. Mettre à jour le user via Better Auth
      await updateUser({ image: uploadedUrl });

      // 3. Mettre à jour le state local pour affichage immédiat
      setAccountForm((prev) => ({ ...prev, image: uploadedUrl }));
      toast.success("Photo de profil mise à jour !");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Erreur lors de la mise à jour de la photo");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="text-center p-5 border-bottom">
      <div className="position-relative d-inline-block mb-4">
        <img
          src={accountForm.image}
          alt="Profile"
          className="rounded-circle"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="position-absolute bottom-0 end-0 btn btn-sm btn-primary rounded-circle p-2"
          style={{ transform: "translate(25%, 25%)", height: 40, width: 40 }}
        >
          <i className="bi bi-camera"></i>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleProfileImageChange}
          accept="image/*"
          className="d-none"
        />
      </div>

      <h3 className="fw-bold mb-1">{accountForm.name}</h3>
      <p className="m-0 text-muted">{accountForm.email}</p>
    </div>
  );
}
