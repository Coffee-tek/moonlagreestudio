'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sidebar } from '@/components/user/sidebar';
// import { 
//   Edit3, 
//   FileText, 
//   Settings, 
//   MapPin, 
//   Wallet, 
//   Bell, 
//   LogOut,
//   Camera,
//   Eye,
//   EyeOff
// } from 'lucide-react';

export default function ProfilSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profileImage, setProfileImage] = useState('/img/pages/team/member-1.jpg');
  const [coverImage, setCoverImage] = useState('/img/new/9.jpeg');
  
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [accountForm, setAccountForm] = useState({
    displayName: 'Jose Fuller',
    realName: 'Jose Fuller',
    email: 'example@gmail.com',
    phone: '+33 1 23 45 67 89',
    location: 'Paris, France',
    language: 'Français'
  });

  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    currentPassword: ''
  });

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCoverImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    console.log('Account saved:', accountForm);
    alert('Détails du compte sauvegardés !');
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

  const sidebarLinks = [
    { href: '/account/settings',  label: 'Profil', active: true },
    { href: '/account/orders',  label: 'Mes Sessions', active: false },
    { href: '/account/wallet', label: 'Mes crédits', active: false },
    { href: '/account/address', label: 'Address', active: false },
    { href: '/account/notifications',  label: 'Notification', active: false },
    { href: '/', label: 'Déconnexion', active: false }
  ];

  return (
    <div className="min-h-screen" style={{backgroundColor:"#eee2d4"}}>
      
      {/* Header avec cover */}
      <div 
        className="h-64 bg-gradient-to-r from-purple-600 to-blue-600 relative"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        
        <div className="overlay position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}></div>

      </div>

      {/* Contenu principal */}
      <div className="pb-5">
        <div className="container">
          <div className="row">

            {/* Sidebar */}
           <Sidebar/>

            {/* Contenu principal */}
            <div className="col-lg-8 ps-lg-0 pb-5">
              <div className="ps-lg-5 pt-lg-5">
                <div className="d-flex align-items-center justify-content-between w-100 mb-5">
                  <h1 className="m-0 fw-bold">Paramètres</h1>
                </div>

                {/* Section Account Details */}
                <div className="bg-white rounded-4 p-4 mb-4 shadow-sm">
                  <h5 className="mb-4 text-primary">Détails du compte</h5>
                  <form onSubmit={handleSaveAccount} className="row row-cols-1 row-cols-lg-2">
                    <div className="mb-4 col">
                      <label className="form-label fw-semibold">Nom d'utilisateur</label>
                      <input 
                        type="text" 
                        name="displayName"
                        className="form-control" 
                        placeholder="Enter your display name"
                        value={accountForm.displayName}
                        onChange={handleAccountChange}
                      />
                    </div>
                    
                    <div className="mb-4 col">
                      <label className="form-label fw-semibold">Nom Complet</label>
                      <input 
                        type="text" 
                        name="realName"
                        className="form-control" 
                        placeholder="Enter your real name"
                        value={accountForm.realName}
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
                        value={accountForm.email}
                        onChange={handleAccountChange}
                      />
                    </div>
                    
                    <div className="mb-4 col">
                      <label className="form-label fw-semibold">Phone</label>
                      <input 
                        type="text" 
                        name="phone"
                        className="form-control" 
                        placeholder="Phone number"
                        value={accountForm.phone}
                        onChange={handleAccountChange}
                      />
                    </div>
                    
                    <div className="mb-4 col">
                      <label className="form-label fw-semibold">Adresse</label>
                      <input 
                        type="text" 
                        name="location"
                        className="form-control" 
                        placeholder="Enter your location"
                        value={accountForm.location}
                        onChange={handleAccountChange}
                      />
                    </div>
                    
                    <div className="mb-4 col">
                      <label className="form-label fw-semibold">Language</label>
                      <select 
                        name="language"
                        className="form-control"
                        value={accountForm.language}
                        onChange={handleAccountChange}
                      >
                        <option value="Français">Français</option>
                        <option value="English">English</option>
                        <option value="Español">Español</option>
                        <option value="Deutsch">Deutsch</option>
                      </select>
                    </div>
                    
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary px-4">
                        Sauvegarder
                      </button>
                    </div>
                  </form>
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

                {/* Section Delete Account */}
                <div className="bg-white rounded-4 p-4 shadow-sm border border-danger border-opacity-25">
                  <h5 className="mb-4 text-danger">Supprimer votre compte</h5>
                  <p className="mb-2 text-muted">Voulez-vous supprimé votre compte ?</p>
                  <p className="mb-4 text-muted">
                    Supprimer votre compte va retirer toutes vos sessinos et tous les détails.
                  </p>
                  <button 
                    onClick={handleDeleteAccount}
                    className="btn btn-outline-danger"
                  >
                    Je veux supprimer mon compte
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}