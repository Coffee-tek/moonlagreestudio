"use client";

import React, { useEffect } from "react";
// import "./styles/vendor/fonts/boxicons.css";
import "./styles/vendor/css/core.css";
import "./styles/vendor/css/theme-default.css";
import "./styles/css/demo.css";
import "./styles/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "./styles/vendor/libs/apex-charts/apex-charts.css";

// Optionnel : scripts JS spécifiques
export default function AdminLayout({ children }) {
  useEffect(() => {
    // Import dynamique des scripts JS après le rendu
    import("./styles/vendor/js/helpers.js");
  }, []);

  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
