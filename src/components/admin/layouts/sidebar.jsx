import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


export default function AdminSidebar() {

  const pathname = usePathname(); // 🔥 donne l'URL actuelle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bx bx-home-circle', href: '/admin' },
    { id: 'users', label: 'Gérer les utilisateurs', icon: 'bx bx-user', href: '/admin/users' },
    { id: 'planning', label: 'Gérer les plannings', icon: 'bx bx-calendar', href: '/admin/plannings' },
    { id: 'reservations', label: 'Gérer des réservations', icon: 'bx bx-calendar', href: '/admin/reservations' },
    { id: 'packs', label: 'Gérer les packs', icon: 'bx bx-package', href: '/admin/packs' },
    { id: 'profil', label: 'Mon Profil', icon: 'bx bx-package', href: '/admin/profile' },
    { id: 'logout', label: 'Déconnexion', icon: 'bx bx-package', href: '/auth/connexion' },
  ];

  useEffect(() => {
    const current = menuItems.find(item => item.href === pathname);
    if (current) setActiveMenu(current.id);
  }, [pathname]); // 🔥 se met à jour automatiquement quand l'URL change

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside
      id="layout-menu"
      className={`layout-menu menu-vertical menu bg-menu-theme ${isSidebarOpen ? 'menu-open' : ''}`}
    >
      <div className="app-brand demo">
        <Link href="/" className="app-brand-link">
          <Image
            src="/img/logo/LOGO_PRIMAIRE_COULEUR@4x.png"
            alt="Profile"
            width={100}
            height={100}
          />
        </Link>

        <a
          href="#"
          className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          onClick={(e) => {
            e.preventDefault();
            toggleSidebar();
          }}
        >
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
          >
            <Link
              href={item.href}
              className="menu-link"
              onClick={() => setActiveMenu(item.id)}
            >
              <i className={`menu-icon tf-icons ${item.icon}`}></i>
              <div>{item.label}</div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}