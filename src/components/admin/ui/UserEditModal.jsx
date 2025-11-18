import { useState, useEffect } from "react";

import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateUser } from "../../../lib/auth-client";


export default function UserEditModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({});
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const [emailForm, setEmailForm] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        date_naissance: user?.date_naissance
          ? new Date(user.date_naissance).toISOString().split("T")[0]
          : "",
      });
      setEmailForm({ email: user?.email || "" })
    }
  }, [user]);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // --- Gestion Avatar ---
    if (name === "avatar" && files && files[0]) {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(file), // preview
        avatarFile: file, // fichier réel pour upload
      }));
      return;
    }

    // --- Gestion champs classiques ---
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSave(formData);
    console.log(formData);

  };

  const handleSaveAccount = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.telephone) {
      toast.error("Le nom et le numéro de téléphone sont obligatoires.");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        telephone: formData.telephone,
        genre: formData.genre,
        ville: formData.ville,
        adresse: formData.adresse,
        date_naissance: formData.date_naissance
          ? new Date(formData.date_naissance).toISOString()
          : null,
        // email volontairement exclu
      };

      await updateUser({
        ...payload, // <- envoie un objet JSON
        fetchOptions: {
          onRequest: () => setIsPending(true),
          onResponse: () => setIsPending(false),
          onError: (ctx) => toast.error(ctx.error.message),
          onSuccess: () => {
            toast.success("Utilisateur mis à jour avec succès !");
            onSave(formData)

          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour.");
      setIsPending(false);
    }
  };


  // console.log(formData);


  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 rounded-4">

          {/* Header */}
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">Modifier l'utilisateur</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">

            <form className="financial-section" onSubmit={handleSaveAccount}>

              <div className="row">

                {/* ===== Avatar Section ===== */}
                <div className="col-md-12 text-center mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="avatar-preview mb-3 rounded-[12px] border border-black bg-[#0b0823]">
                      <Image
                        src={formData.avatar || user.avatar || "/img/user-img.jpg"}
                        alt={formData.name || user.name}
                        width={150}
                        height={150}
                        className="rounded-full m-lg-5 w-[150px] h-[150px] object-cover text-transparent"
                      />

                    </div>

                    <div className="button-wrapper">
                      <label htmlFor="upload" className="btn btn-primary me-2 mb-3">
                        <span>Changer de photo</span>
                        <input
                          type="file"
                          id="upload"
                          name="avatar"
                          hidden
                          accept="image/png, image/jpeg"
                          onChange={handleChange}
                          disabled
                        />
                      </label>

                      <button
                        type="button"
                        className="btn btn-outline-secondary mb-3"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, avatar: user.avatar }))
                        }
                      >
                        Annuler
                      </button>

                      <p className="text-muted mb-0">
                        Formats acceptés : JPG, GIF, PNG. Taille max : 800K
                        <br />
                        (Seule l'utilisateur peut changer la photo de profil)
                      </p>
                    </div>
                  </div>

                </div>

                {/* ===== User Info Section ===== */}
                <div className="col-md-12">

                  <h6 className="fw-bold text-primary mb-3">Informations utilisateur</h6>

                  <div className="row">



                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Nom Complet</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Adresse</label>
                      <input
                        type="text"
                        name="adresse"
                        className="form-control"
                        value={formData.adresse || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Ville</label>
                      <input
                        type="text"
                        name="ville"
                        className="form-control"
                        value={formData.ville || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Téléphone</label>

                      <input
                        type="text"
                        name="telephone"
                        className="form-control"
                        value={formData.telephone || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Date de naissance</label>
                      <input
                        type="date"
                        name="date_naissance"
                        className="form-control"
                        value={formData.date_naissance || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Genre</label>
                      <select
                        name="genre"
                        className="form-control"
                        value={formData.genre}
                        onChange={handleChange}
                      >
                        <option value="F">Feminin</option>
                        <option value="M">Masculin</option>

                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Status Compte</label>
                      <select
                        name="statut_compte"
                        className="form-control"
                        value={formData.statut_compte}
                        onChange={handleChange}
                      >
                        <option value="actif">Active</option>
                        <option value="inactif">Inactive</option>
                        <option value="suspendu">Suspendu</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">ID Utilisateur</label>
                      <input
                        type="text"
                        className="form-control"
                        value={user.id}
                        disabled
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={emailForm.email || ""}
                        onChange={handleChange}
                        disabled
                      />
                    </div>


                  </div>

                  <button type="submit" disabled={isPending} className="btn btn-primary offset-md-10 mt-3">
                    {isPending ? "Sauvegarde en cours..." : "Sauvegarde"}
                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>
      </div>

      <style jsx>{`
        .modal {
          z-index: 1050;
        }
        .form-label {
          font-size: 0.9rem;
        }
        .fw-semibold {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
