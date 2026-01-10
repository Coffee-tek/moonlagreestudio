"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { requestPasswordReset } from '../../lib/auth-client';

export default function ForgotPasswordForm() {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = String(formData.get("email")).trim();

        if (!email) return toast.error("Please enter your email.");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return toast.error("Email invalide");

        try {
            setIsPending(true);
            console.log("Requesting password reset for:", email);
            await requestPasswordReset({
                email,
                redirectTo: "/auth/reset-password",
            });
            toast.success(
                "Un lien de réinitialisation a été envoyé à votre adresse e-mail."
            );
            router.push("/auth/forgot-password/success");
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Une erreur est survenue.");
        } finally {
            setIsPending(false);
        }
    }


    return (
        <form action="account-orders.html" className="d-grid gap-3 input-group-lg" onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                className="form-control bg-light border-0 px-3 py-2"
                id="exampleInputPassword1"
                placeholder="Email"
            />
            <button type="submit" className="btn btn-purple btn-theme w-100" disabled={isPending}>
                Réinitialiser mot de passe
            </button>
        </form>
    )
}
