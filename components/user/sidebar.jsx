"use client"
import Link from "next/link";
import Image from 'next/image';
import { useRef, useState } from "react";
import { usePathname } from 'next/navigation';

export function Sidebar(){

  const pathname = usePathname();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profileImage, setProfileImage] = useState('/img/pages/team/member-1.jpg');
  const [coverImage, setCoverImage] = useState('');
  
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
    { href: '/user/profil-settings',  label: 'Profil', active: true },
    { href: '/user/mes-sessions',  label: 'Mes Sessions', active: false },
    { href: '/user/mes-credits', label: 'Mes crédits', active: false },
    // { href: '/account/address', label: 'Address', active: false },
    // { href: '/account/notifications',  label: 'Notification', active: false },
    { href: '/', label: 'Déconnexion', active: false }
  ];

  const isActive = (href) => {
    return pathname === href;
  };

  return (
    <div className="col-lg-4">
      <div className="rounded-4 border bg-white mb-4" style={{ marginTop: '-100px', position: 'relative', zIndex: 10 }}>
        {/* Profil */}
        <div className="text-center p-5 border-bottom">
          <div className="position-relative d-inline-block mb-4">
            <Image
              src={profileImage}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-circle"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="position-absolute bottom-0 end-0 btn btn-sm btn-primary rounded-circle p-2"
              style={{ transform: 'translate(25%, 25%)' }}
            >
              {/* <Camera size={12} /> */}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfileImageChange}
              accept="image/*"
              className="d-none"
            />
          </div>
          <h3 className="fw-bold mb-1">{accountForm.displayName}</h3>
          <p className="m-0 text-muted">{accountForm.email}</p>
        </div>

        {/* Navigation */}
        <div className="p-4">
          {sidebarLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`d-flex align-items-center p-3 text-decoration-none rounded-3 mb-2 transition-all ${
                isActive(link.href)
                  ? 'bg-primary text-white' 
                  : 'text-dark hover-bg-light'
              }`}
            >
              {/* <link.icon size={18} className="me-3" /> */}
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}