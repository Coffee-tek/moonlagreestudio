
"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpEmailAction } from "../../actions/sign-up-email.action";


export const RegisterForm = () => {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        setIsPending(true);

        const formData = new FormData(e.target);

        const { error } = await signUpEmailAction(formData);

        if (error) {
            toast.error(error);
            console.error(error);

            setIsPending(false);
        } else {
            toast.success("Inscription terminée. Svp vérifiez vos mails");
            // router.push("/auth/connexion");
            router.push("/auth/inscription/success");

        }

    }

    return (
        <form onSubmit={handleSubmit} className="d-grid gap-2 input-group-lg">
            <div className="mb-3">
                <label className="form-label small">Prénom</label>
                <input
                    type="text"
                    id="prénom"
                    name="prenom"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrez votre prénom"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label small">Nom</label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrez votre nom"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label small">Téléphone</label>
                <input
                    type="number"
                    id="telephone"
                    name="telephone"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrez votre téléphone"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label small">Ville</label>
                <input
                    type="text"
                    id="ville"
                    name="ville"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrez votre ville"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label small">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrez votre email"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label small">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrez votre mot de passe"
                    required
                />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="termsCheck" />
                <label className="form-check-label small" htmlFor="termsCheck">
                    J'accepte les conditions d'utilisation et la politique de confidentialité du site.
                </label>
            </div>
            <button type="submit" className="btn btn-purple btn-theme" disabled={isPending}>
                {isPending ? "En cours..." : "Creer un compte"}
            </button>
        </form>
    );
};
