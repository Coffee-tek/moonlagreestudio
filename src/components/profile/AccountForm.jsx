"use client"

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { updateUser } from "../../lib/auth-client";
import { toast } from "sonner";


function AccountForm({ users }) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();


    const [accountForm, setAccountForm] = useState({
        name: users?.name || "",
        phone: users?.telephone || "",
        adresse: users?.adresse || "",
        ville: users?.ville || "",
        // Si date_naissance existe, formate en 'YYYY-MM-DD', sinon chaîne vide
        date_naissance: users?.date_naissance
            ? new Date(users.date_naissance).toISOString().split("T")[0]
            : "",
        genre: users?.genre || "",
    });

    const [emailForm, setEmailForm] = useState({
        email: users?.email || "",
    });

    const handleAccountChange = (e) => {
        const { name, value } = e.target;
        setAccountForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveAccount = async (e) => {
        e.preventDefault();

        // console.log(accountForm);

        // Validation simple
        if (!accountForm.name || !accountForm.phone) {
            toast.error("Le nom et le numéro de téléphone sont obligatoires.");
            return;
        }

        try {
            // Préparer payload pour Prisma
            const payload = {
                ...accountForm,
                // Convertir la date en ISO si remplie, sinon null
                date_naissance: accountForm.date_naissance
                    ? new Date(accountForm.date_naissance).toISOString()
                    : null,
            };

            await updateUser({
                ...payload,
                fetchOptions: {
                    onRequest: () => setIsPending(true),
                    onResponse: () => setIsPending(false),
                    onError: (ctx) => toast.error(ctx.error.message),
                    onSuccess: () => {
                        toast.success("Profil mis à jour avec succès !");
                        router.refresh();
                    },
                },
            });
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la mise à jour.");
            setIsPending(false);
        }
    };

    return (
        <form onSubmit={handleSaveAccount} className="row row-cols-1 row-cols-lg-2">

            <div className="mb-4 col">
                <label className="form-label fw-semibold">Nom Complet</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your real name"
                    value={accountForm.name}
                    onChange={handleAccountChange}
                />
            </div>

            <div className="mb-4 col">
                <label className="form-label fw-semibold">Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="example@gmail.com"
                    value={emailForm.email}
                    disabled

                />
            </div>

            <div className="mb-3 col-md-6">
                <label htmlFor="phone" className="form-label">
                    Téléphone
                </label>
                <div className="input-group input-group-merge">
                    <span className="input-group-text">(+221)</span>
                    <input
                        type="number"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="202 555 0111"
                        value={accountForm.phone}
                        onChange={handleAccountChange}


                    />
                </div>
            </div>

            <div className="mb-4 col">
                <label className="form-label fw-semibold">Adresse</label>
                <input
                    type="text"
                    name="adresse"
                    className="form-control"
                    placeholder="Entrez votre adresse"
                    value={accountForm.adresse}
                    onChange={handleAccountChange}
                />
            </div>
            <div className="mb-4 col">
                <label className="form-label fw-semibold">Date de naissance</label>
                <input
                    type="date"
                    name="date_naissance"
                    className="form-control"
                    placeholder="Entrez votre adresse"
                    value={accountForm.date_naissance}
                    onChange={handleAccountChange}
                />
            </div>

            <div className="mb-4 col-4">
                <label className="form-label fw-semibold">ville</label>
                <input
                    type="text"
                    name="ville"
                    className="form-control"
                    placeholder="Entrez votre ville"
                    value={accountForm.ville}
                    onChange={handleAccountChange}
                />
            </div>
            <div className="mb-4 col-4">
                <label className="form-label fw-semibold">Genre</label>
                <select
                    name="genre"
                    className="form-control"
                    value={accountForm.genre}
                    onChange={handleAccountChange}
                >
                    <option value="F">Feminin</option>
                    <option value="M">Masculin</option>

                </select>
            </div>

            <div className="col-12">
                <button type="submit" disabled={isPending} className="btn btn-primary px-4">
                    {isPending ? "Sauvegarde en cours..." : "Sauvegarde"}
                </button>
            </div>
        </form>
    )
}

export default AccountForm