"use client";

import React, { useEffect } from "react";
// import "./styles/vendor/fonts/boxicons.css";
import "./styles/vendor/css/core.css";
import "./styles/vendor/css/theme-default.css";
import "./styles/css/demo.css";
import "./styles/css/admin-shared.css";
import "./styles/css/admin-users.css";
import "./styles/css/admin-planning.css"
import "./styles/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "./styles/vendor/libs/apex-charts/apex-charts.css";
import AdminFooter from "@/components/admin/layouts/footer";
import AdminNavbar from "@/components/admin/layouts/navbar";
import { useState } from "react";
import AdminSidebar from "../../components/admin/layouts/sidebar";

// Optionnel : scripts JS spécifiques
export default function AdminLayout({ children, session }) {
 
  useEffect(() => {
    // Import dynamique des scripts JS après le rendu
    import("./styles/vendor/js/helpers.js");
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* Menu Sidebar */}
        <AdminSidebar />
        {/* / Menu */}

        {/* Layout page */}
        <div className="layout-page">

          {/* Navbar */}
          <AdminNavbar session={session} toggleSidebar={toggleSidebar}/>
          {/* / Navbar */}

          {/* Content wrapper */}
          <div className="content-wrapper">
            {children}
            {/* Footer */}
            <AdminFooter />
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
