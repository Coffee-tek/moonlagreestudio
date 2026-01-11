"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';

import { usePathname } from "next/navigation";
import { useSession } from '../../../lib/auth-client';

export default function Navbar() {
  const { data: session, isPending } = useSession();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // console.log(session);


  const pathname = usePathname(); // récupère l'URL actuelle

  // Configuration des liens de navigation
  const links = [
    { href: "/", label: "Accueil", icon: "ri-apps-2-line" },
    // { href: "/public/a-propos", label: "A propos" },
    { href: "/public/planning", label: "Planning" },
    { href: "/public/tarifs", label: "Achat crédits" },
    { href: "/public/contact", label: "Contact" },
  ];

  // Fonction pour déterminer si un lien est actif
  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Fonction pour obtenir les classes CSS du lien
  const getLinkClasses = (href) => {
    return `nav-link ${isActiveLink(href) ? 'active' : ''}`;
  };

  return (
    <>
      <nav className="navbar osahan-main-nav navbar-expand yoga-nav py-3 py-lg-0">
        <div className="container">
          {/* Brand */}
          <div className="position-relative d-flex align-items-center gap-2 site-brand">
            {/* <i className="ri-body-scan-line fs-2 lh-1 text-primary"></i> */}
            <div className="lh-1">
              {/* <h5 className="fw-bold m-0 text-success">MOON</h5>
              <small className="text-dark-50">Studio</small> */}
              <img
                src="/img/logo/LOGO PRINCIPAL NOIR.svg"
                alt="Profile"
                width={130}
                height={100}

              />
            </div>
            <Link href="/" className="stretched-link"></Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-collapse">
            <ul className="navbar-nav ms-auto gap-4 m-none">
              {links.map((link) =>
                link.dropdown ? (
                  <li
                    key={link.href}
                    className="nav-item dropdown single-dropdown-nav"
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {link.label}
                    </a>
                    <ul className="dropdown-menu">
                      {link.dropdown.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className="dropdown-item"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={link.href} className="nav-item">
                    <Link
                      href={link.href}
                      className={getLinkClasses(link.href)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.icon && <i className={`${link.icon} me-1`}></i>}
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* Action Buttons */}
            <div className="d-flex align-items-center gap-4 ms-auto">

              {isPending ? (
                <span className="btn btn-primary rounded-pill px-3 opacity-50">
                  Chargement...
                </span>
              ) : session ? (
                session.user?.role === "client" ? (
                  <Link
                    href="/user/profil-settings"
                    className="btn btn-primary rounded-pill px-3 d-none d-lg-block"
                  >
                    Mon profil
                  </Link>
                ) : (
                  <Link
                    href="/admin"
                    className="btn btn-primary rounded-pill px-3 d-none d-lg-block"
                  >
                    Tableau de bord
                  </Link>
                )
              ) : (
                <Link
                  href="/auth/connexion"
                  className="btn btn-primary rounded-pill px-3 d-none d-lg-block"
                >
                  Connexion
                </Link>
              )}

              <button
                className="link-dark d-lg-none bg-transparent border-0"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Menu"
              >
                <i className="ri-menu-3-line ri-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Rechercher</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Rechercher..."
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="offcanvas offcanvas-start show" style={{ visibility: 'visible' }}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              {links.map((link) => (
                <li key={link.href} className="nav-item">
                  <Link
                    href={link.href}
                    className={getLinkClasses(link.href)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon && <i className={`${link.icon} me-2`}></i>}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3">

              {isPending ? (
                <span className="btn btn-primary rounded-pill w-100 opacity-50">Chargement...</span>
              ) : session ? (
                <Link
                  href="/user/profil-settings"
                  className="btn btn-primary rounded-pill w-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mon profil
                </Link>
              ) : (
                <Link
                  href="/auth/connexion"
                  className="btn btn-primary rounded-pill w-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {/* {isMobileMenuOpen && (
        <div 
          className="offcanvas-backdrop fade show" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )} */}

      {/* <Hero /> */}
    </>
  );
}