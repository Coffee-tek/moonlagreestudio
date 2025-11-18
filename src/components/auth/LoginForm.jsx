
"use client";

import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { signInEmailAction } from "../../actions/sign-in-email.action";




export const LoginForm = () => {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        setIsPending(true);

        const formData = new FormData(e.target);

        const { error } = await signInEmailAction(formData);

        if (error) {
            toast.error(error);
            setIsPending(false);
        } else {
            toast.success("Connexion réussie. Ravi de vous revoir.");
            router.push("/user/profil-settings");
        }

    }

    return (
        <form onSubmit={handleSubmit} className="d-grid gap-2 input-group-lg">
            <div className="mb-3">
                <label htmlFor="email" className="form-label small">
                    Email
                </label>
                <input
                    type="email"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrer votre email"
                    id="email"
                    name="email"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label small">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrer votre mot de passe"
                    id="password"
                    name="password"
                />
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3 form-check ps-0">
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label small" htmlFor="remember">
                        Se souvenir de moi
                    </label>
                </div>
                <Link href="/auth/reset-password" className="text-decoration-none small">
                    Mot de passe oublié
                </Link>
            </div>
            <button type="submit" className="btn btn-purple btn-theme" disabled={isPending} >
                {isPending ? "Connexion en cours..." : "Se connecter"}
            </button>
        </form>
    );
};
