"use client";

import React, { useEffect } from "react";
import "./styles/css/vendors.min.css";
import "./styles/css/app.min.css";

export default function AdminLayout({ children }) {
  useEffect(() => {
    // Import dynamique des scripts JS après le rendu
    import("./styles/js/config.js");
    import("./styles/js/vendors.min.js");
  }, []);

  return (
    <>
      {/* Ici, on peut utiliser Head pour favicon ou scripts */}
      <head>
        <link rel="shortcut icon" href="./styles/favicon.ico" />
      </head>

      <main>{children}</main>
    </>
  );
}
