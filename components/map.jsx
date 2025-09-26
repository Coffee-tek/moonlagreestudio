"use client";

import React from "react";

export default function MapSection({ title, subtitle, src }) {
  return (
    <section className="map-section py-5">
      <div className="container text-center">
        <h2 className="fw-bold mb-3">{title}</h2>
        {subtitle && <p className="text-muted mb-4">{subtitle}</p>}

        <div className="ratio ratio-16x9">
          <iframe
            src={src}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
