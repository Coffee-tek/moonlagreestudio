"use client";

import { useEffect } from "react";
import { useState } from 'react';
import Link from "next/link";
import Hero from "./hero";
// import "./../public/vender/bootstrap/js/bootstrap.bundle.min.js"

export default function Navbar() {

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
    <nav className="navbar osahan-main-nav navbar-expand yoga-nav py-3 py-lg-0">
        <div className="container">
          {/* Brand */}
          <div className="position-relative d-flex align-items-center gap-2 site-brand">
            <i className="ri-body-scan-line fs-2 lh-1 text-primary"></i>
            <div className="lh-1">
              <h5 className="fw-bold m-0 text-success">YOGA</h5>
              <small className="text-dark-50">Template</small>
            </div>
            <Link href="/" className="stretched-link"></Link>
          </div>

          {/* Desktop Menu */}
          <div className=" navbar-collapse">
            <ul className="navbar-nav ms-auto gap-4 m-none text-uppercase">
              <li className="nav-item">
                <Link href="/" className="nav-link active">
                  <i className="ri-apps-2-line"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link href="/classes" className="nav-link">Classes</Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="d-flex align-items-center gap-4 ms-auto">
              <button 
                className="link-dark bg-transparent border-0" 
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <i className="ri-search-line ri-lg"></i>
              </button>
              <Link href="/profile" className="link-dark">
                <i className="ri-account-circle-line ri-lg"></i>
              </Link>
              <Link href="/join" className="btn btn-primary rounded-pill px-3 d-none d-lg-block">
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
                <h5 className="modal-title">Search</h5>
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
                  placeholder="Search..." 
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
              <li className="nav-item">
                <Link href="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/classes" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Classes
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>
              </li>
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
      {isMobileMenuOpen && (
        <div 
          className="offcanvas-backdrop fade show" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <Hero />
    </>
  );
}
