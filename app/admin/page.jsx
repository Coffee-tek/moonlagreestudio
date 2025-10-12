"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminFooter from '@/components/admin/layouts/footer';
import AdminSidebar from '@/components/admin/layouts/sidebar';
import AdminNavbar from '@/components/admin/layouts/navbar';

export default function AdminHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>     
      {/* Content */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <h1>ADMIN</h1>

        {/* ===== ROWS DES WIDGETS ===== */}
        <div className="row row-cols-xxl-4 row-cols-md-2 row-cols-1">

          {/* Caisse totale */}
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="avatar fs-60 avatar-img-size flex-shrink-0">
                    <span className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                      <i className="ti ti-credit-card"></i>
                    </span>
                  </div>
                  <div className="text-end">
                    <h3 className="mb-2 fw-normal">
                      <span data-target="124.7">124,70</span> XOF
                    </h3>
                    <p className="mb-0 text-muted">
                      <span>Caisse totale</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sessions réservées */}
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="avatar fs-60 avatar-img-size flex-shrink-0">
                    <span className="avatar-title bg-success-subtle text-success rounded-circle fs-24">
                      <i className="ti ti-shopping-cart"></i>
                    </span>
                  </div>
                  <div className="text-end">
                    <h3 className="mb-2 fw-normal">
                      <span data-target="2358">2 358</span>
                    </h3>
                    <p className="mb-0 text-muted">
                      <span>Sessions réservées</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nombre d'utilisateurs */}
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="avatar fs-60 avatar-img-size flex-shrink-0">
                    <span className="avatar-title bg-info-subtle text-info rounded-circle fs-24">
                      <i className="ti ti-users"></i>
                    </span>
                  </div>
                  <div className="text-end">
                    <h3 className="mb-2 fw-normal">
                      <span data-target="839">839</span>
                    </h3>
                    <p className="mb-0 text-muted">
                      <span>Nombre d’utilisateurs</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

           {/* Sessions annulées */}
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="avatar fs-60 avatar-img-size flex-shrink-0">
                    <span className="avatar-title bg-warning-subtle text-warning rounded-circle fs-24">
                      <i className="ti ti-rotate-clockwise-2"></i>
                    </span>
                  </div>
                  <div className="text-end">
                    <h3 className="mb-2 fw-normal">
                      <span data-target="41">41</span>
                    </h3>
                    <p className="mb-0 text-muted">
                      <span>Sessions annulées</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div> 


      </div>
      {/* / Content */}
    </>    
  );
}