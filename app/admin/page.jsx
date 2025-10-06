"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bx bx-home-circle', href: '/admin' },
    { id: 'users', label: 'Gérer les utilisateurs', icon: 'bx bx-user', href: '/admin/users' },
    { id: 'planning', label: 'Gérer les plannings', icon: 'bx bx-calendar', href: '/admin/planning' },
    { id: 'packs', label: 'Gérer les packs', icon: 'bx bx-package', href: '/admin/packs' },
    { id: 'stats', label: 'Statistiques des Sessions', icon: 'bx bx-bar-chart', href: '/admin/stats' }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* Menu Sidebar */}
        <aside 
          id="layout-menu" 
          className={`layout-menu menu-vertical menu bg-menu-theme ${isSidebarOpen ? 'menu-open' : ''}`}
        >
          <div className="app-brand demo">
            <Link href="/admin" className="app-brand-link">
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
        {/* / Menu */}

        {/* Layout page */}
        <div className="layout-page">
          {/* Navbar */}
          <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a 
                className="nav-item nav-link px-0 me-xl-4" 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
              >
                <i className="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* User Dropdown */}
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <a 
                    className="nav-link dropdown-toggle hide-arrow" 
                    href="#" 
                    data-bs-toggle="dropdown"
                  >
                    <div className="avatar avatar-online">
                      <Image 
                        src="/assets/img/avatars/1.png" 
                        alt="User Avatar" 
                        width={40}
                        height={40}
                        className="rounded-circle"
                      />
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              <Image 
                                src="/assets/img/avatars/1.png" 
                                alt="User Avatar" 
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block">John Doe</span>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/admin/profile">
                        <i className="bx bx-user me-2"></i>
                        <span className="align-middle">Mon profile</span>
                      </Link>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/logout">
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Déconnexion</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* / User */}
              </ul>
            </div>
          </nav>
          {/* / Navbar */}

          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
              <h1>ADMIN</h1>
              
              {/* Vous pouvez ajouter votre contenu ici */}
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Bienvenue dans le panneau d'administration</h5>
                      <p className="card-text">
                        Utilisez le menu de navigation pour gérer votre application.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* / Content */}

            {/* Footer */}
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0">
                  © {new Date().getFullYear()}, made with ❤️ by{' '}
                  <a 
                    href="https://themeselection.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer-link fw-bolder"
                  >
                    ThemeSelection
                  </a>
                </div>
                <div>
                  <a 
                    href="https://themeselection.com/license/" 
                    className="footer-link me-4" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    License
                  </a>
                  <a 
                    href="https://themeselection.com/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link me-4"
                  >
                    More Themes
                  </a>
                  <a
                    href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link me-4"
                  >
                    Documentation
                  </a>
                  <a
                    href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link me-4"
                  >
                    Support
                  </a>
                </div>
              </div>
            </footer>
            {/* / Footer */}

            <div className="content-backdrop fade"></div>
          </div>
          {/* Content wrapper */}
        </div>
        {/* / Layout page */}
      </div>

      {/* Overlay */}
      <div 
        className={`layout-overlay layout-menu-toggle ${isSidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
}