"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { resetPassword } from '../../lib/auth-client';

export default function ResetPasswordForm({ token }) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const password = String(formData.get("password"));
        if (!password) return toast.error("Veuillez saisir votre adresse e-mail.");

        const confirmPassword = String(formData.get("confirmPassword"));

        if (password !== confirmPassword) {
            return toast.error("Les mots de passe ne correspondent pas.");
        }

        await resetPassword({
            newPassword: password,
            token,
            fetchOptions: {
                onRequest: () => {
                    setIsPending(true);
                },
                onResponse: () => {
                    setIsPending(false);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: () => {
                    toast.success("Le mot de passe a été réinitialisé avec succès.");
                    router.push("/auth/connexion");
                },
            },
        });
    }
    return (
        <div className="col-lg-7 col-12 py-3">
            <div className="p-5 bg-white rounded-4 shadow">
                <h2 className="fw-bold mb-3">Réinitialisation du mot de passe</h2>
                <p className="lead mb-4">Enregistrer votre nouveau mot de passe</p>
                <form action="account-orders.html" className="d-grid gap-3 input-group-lg" onSubmit={handleSubmit}>
                    <label htmlFor="password">Nouveau mot de passe </label>
                    <input
                        type="password"
                        className="form-control bg-light border-0 px-3 py-2"
                        id="password"
                        placeholder=""
                        name="password"
                    />

                    <label htmlFor="password">Confirmation du mot de passe</label>
                    <input
                        type="password"
                        className="form-control bg-light border-0 px-3 py-2"
                        id="confirmPassword"
                        placeholder=""
                        name="confirmPassword"
                    />
                    <button type="submit" className="btn btn-purple btn-theme w-100" disabled={isPending}>
                        Sauvegarder
                    </button>
                </form>
            </div>
        </div>
    )
}
