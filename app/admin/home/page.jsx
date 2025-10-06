"use client";
import React from "react";

export default function AdminHome() {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* Menu latéral */}
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
          <div className="app-brand demo">
            <a href="#" className="app-brand-link">
              <span className="app-brand-logo demo">LOLGO</span>
              <span className="app-brand-text demo menu-text fw-bolder ms-2">Sneat</span>
            </a>

            <a
              href="#"
              className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
            >
              <i className="bx bx-chevron-left bx-sm align-middle"></i>
            </a>
          </div>

          <div className="menu-inner-shadow"></div>

          <ul className="menu-inner py-1">
            <li className="menu-item active">
              <a href="#" className="menu-link">
                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Dashboard</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="#" className="menu-link">
                <i className="menu-icon tf-icons bx bx-dock-top"></i>
                <div data-i18n="Analytics">Gérer les utilisateurs</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="#" className="menu-link">
                <i className="menu-icon tf-icons bx bx-dock-top"></i>
                <div data-i18n="Analytics">Gérer les plannings</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="#" className="menu-link">
                <i className="menu-icon tf-icons bx bx-dock-top"></i>
                <div data-i18n="Analytics">Gérer les packs</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="#" className="menu-link">
                <i className="menu-icon tf-icons bx bx-dock-top"></i>
                <div data-i18n="Analytics">Statistiques des Sessions</div>
              </a>
            </li>
          </ul>
        </aside>

        {/* Layout principal */}
        <div className="layout-page">
          {/* Navbar */}
          <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a className="nav-item nav-link px-0 me-xl-4" href="#">
                <i className="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <a
                    className="nav-link dropdown-toggle hide-arrow"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    <div className="avatar avatar-online">
                      <img
                        src="/assets/img/avatars/1.png"
                        alt="user"
                        className="w-px-40 h-auto rounded-circle"
                      />
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              <img
                                src="/assets/img/avatars/1.png"
                                alt="user"
                                className="w-px-40 h-auto rounded-circle"
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
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-user me-2"></i>
                        <span className="align-middle">Mon profil</span>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Déconnexion</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>

          {/* Contenu principal */}
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <h1>ADMIN</h1>
            </div>

            {/* Footer */}
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0">
                  © {new Date().getFullYear()}, fait avec ❤️ par{" "}
                  <a
                    href="https://themeselection.com"
                    target="_blank"
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
                  >
                    License
                  </a>
                  <a
                    href="https://themeselection.com/"
                    className="footer-link me-4"
                    target="_blank"
                  >
                    More Themes
                  </a>
                  <a
                    href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                    className="footer-link me-4"
                    target="_blank"
                  >
                    Documentation
                  </a>
                  <a
                    href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                    className="footer-link me-4"
                    target="_blank"
                  >
                    Support
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
}
