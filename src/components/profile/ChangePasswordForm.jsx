"use client"

import Link from 'next/link';
import { useState } from 'react'
import { toast } from 'sonner';
import { changePasswordAction } from '../../actions/change-password.action';

function ChangePasswordForm() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [passwordForm, setPasswordForm] = useState({
        newPassword: '',
        currentPassword: ''
    });

    const [isPending, setIsPending] = useState(false);


    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({ ...prev, [name]: value }));
    };



    const handleSavePassword = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('currentPassword', passwordForm.currentPassword);
        formData.append('newPassword', passwordForm.newPassword);

        setIsPending(true);

        const { error } = await changePasswordAction(formData);

        if (error) {
            toast.error(error);
        } else {
            toast.success("Mot de passe modifié avec succès !");
            setPasswordForm({ newPassword: '', currentPassword: '' });
        }

        setIsPending(false);
    };
    return (
        <form onSubmit={handleSavePassword} className="row row-cols-1 row-cols-lg-2">
            <div className="mb-4 col">
                <label className="form-label fw-semibold">Nouveau mot de passe</label>
                <div className="input-group">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        className="form-control"
                        placeholder="Nouveau mot de passe"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                        {showNewPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                    </button>
                </div>
            </div>

            <div className="mb-4 col">
                <label className="form-label fw-semibold">Mot de passe actuel</label>
                <div className="input-group">
                    <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        className="form-control"
                        placeholder="Mot de passe actuel"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                        {showCurrentPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                    </button>
                </div>
            </div>

            <div className="col-12">
                <p className="mb-4 text-muted">
                    Vous avez oublié votre mot de passe ?
                    <Link href="/forgot-password" className="text-primary text-decoration-none ms-1">
                        Réinitialiser votre mot de passe.
                    </Link>
                </p>
                <button type="submit" className="btn btn-primary px-4" disabled={isPending}>
                    Sauvegarder mot de passe
                </button>
            </div>
        </form>
    )
}

export default ChangePasswordForm