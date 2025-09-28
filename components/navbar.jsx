"use client";

import { useEffect } from "react";
import { useState } from 'react';
import Link from "next/link";
import Hero from "./hero";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname(); // récupère l'URL actuelle

  // Configuration des liens de navigation
  const links = [
    { href: "/", label: "Accueil", icon: "ri-apps-2-line" },
    { href: "/a-propos", label: "A propos" },
    { href: "/planning", label: "Planning" },
    // {
    //   href: "/classes",
    //   label: "Classes",
    //   dropdown: [
    //     { href: "/classes/all-class", label: "Liste des classes" },
    //     { href: "/classes/book-class", label: "Réserver une classe" },
    //   ],
    // },
    { href: "/tarifs", label: "Acheter Crédit" },
    { href: "/contact", label: "Contact" },
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
            <i className="ri-body-scan-line fs-2 lh-1 text-primary"></i>
            <div className="lh-1">
              <h5 className="fw-bold m-0 text-success">MOON</h5>
              <small className="text-dark-50">Studio</small>
            </div>
            <Link href="/" className="stretched-link"></Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-collapse">
           <ul className="navbar-nav ms-auto gap-4 m-none text-uppercase">
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
              {/* <button 
                className="link-dark bg-transparent border-0" 
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <i className="ri-search-line ri-lg"></i>
              </button> */}
              <Link href="/user-profil/profil-settings" className="link-dark">
                <i className="ri-account-circle-line ri-lg"></i>
              </Link>
              <Link href="/connexion" className="btn btn-primary rounded-pill px-3 d-none d-lg-block">
                Connexion
              </Link>
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
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
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
        <div className="offcanvas offcanvas-start show" style={{visibility: 'visible'}}>
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
              <Link href="/join" className="btn btn-primary rounded-pill w-100">
                Connexion
              </Link>
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