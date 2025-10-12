"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminProfile() {

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [avatar, setAvatar] = useState("/assets/img/avatars/1.png");

    const [passwordForm, setPasswordForm] = useState({
        newPassword: '',
        currentPassword: ''
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleReset = () => {
    setAvatar("/assets/img/avatars/1.png");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSavePassword = (e) => {
    e.preventDefault();
    console.log('Password changed');
    alert('Mot de passe modifié !');
    setPasswordForm({ newPassword: '', currentPassword: '' });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      console.log('Account deletion requested');
      alert('Demande de suppression de compte envoyée.');
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Paramètre du Compte /</span> Compte
      </h4>

      <div className="row">
        <div className="col-md-12">
          {/* Profile Details Card */}
          <div className="card mb-4">
            <h5 className="card-header">Details du profil</h5>

            <div className="card-body">
              <div className="d-flex align-items-start align-items-sm-center gap-4 mt-3">
                <Image
                  src={avatar}
                  alt="user-avatar"
                  className="d-block rounded"
                  height={100}
                  width={100}
                  id="uploadedAvatar"
                />
                <div className="button-wrapper">
                  <label
                    htmlFor="upload"
                    className="btn btn-primary me-2 mb-4"
                    tabIndex={0}
                  >
                    <span className="d-none d-sm-block">Changer de photo</span>
                    <i className="bx bx-upload d-block d-sm-none"></i>
                    <input
                      type="file"
                      id="upload"
                      className="account-file-input"
                      hidden
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                    />
                  </label>

                  <button
                    type="button"
                    className="btn btn-outline-secondary account-image-reset mb-4"
                    onClick={handleReset}
                  >
                    <i className="bx bx-reset d-block d-sm-none"></i>
                    <span className="d-none d-sm-block">Annuler</span>
                  </button>

                  <p className="text-muted mb-0">
                    Autorisé JPG, GIF or PNG. Max size of 800K
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-0" />

            <div className="card-body">
              <form id="formAccountSettings" method="POST" onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      Nom Complet
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="firstName"
                      name="firstName"
                      defaultValue="John"
                      autoFocus
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Nom d'utilisateur
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="lastName"
                      name="lastName"
                      defaultValue="Doe"
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      defaultValue="john.doe@example.com"
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">
                      Téléphone
                    </label>
                    <div className="input-group input-group-merge">
                      <span className="input-group-text">(+221)</span>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="form-control"
                        placeholder="202 555 0111"
                      />
                    </div>
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="address" className="form-label">
                      Addresse
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="Address"
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="state"
                      name="state"
                      placeholder="California"
                    />
                  </div>

                </div>

                <div className="mt-2">
                  <button type="submit" className="btn btn-primary me-2">
                    Save changes
                  </button>
                  <button type="reset" className="btn btn-outline-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Section Password */}
                <div className="bg-white rounded-4 p-4 mb-4 shadow-sm">
                  <h5 className="mb-4 text-primary">Mot de passe</h5>
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
                          {/* {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />} */}
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
                          {/* {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />} */}
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
                      <button type="submit" className="btn btn-primary px-4">
                        Sauvegarder mot de passe
                      </button>
                    </div>
                  </form>
                </div>

          {/* Delete Account */}
          <div className="card">
            <h5 className="card-header">Supprimer votre compte</h5>
            <div className="card-body">
              <div className="mb-3 col-12 mb-0 mt-3">
                <div className="alert alert-warning">
                  <h6 className="alert-heading fw-bold mb-1">
                    Êtes-vous sûr de vouloir supprimer votre compte ?
                  </h6>
                  <p className="mb-0">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
              </div>

              <form id="formAccountDeactivation" onSubmit={(e) => e.preventDefault()}>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="accountActivation"
                    id="accountActivation"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="accountActivation"
                  >
                    Je confirme la suppréssion de mon compte
                  </label>
                </div>
                <button type="submit" className="btn btn-danger deactivate-account">
                  Supprimer compte
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
