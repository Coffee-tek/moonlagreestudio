

import Link from "next/link";
import React from "react";

const HeroHeader = ({ title, breadcrumbs, backgroundImage }) => {
  return (
    <div
      className="hero-section d-flex align-items-center justify-content-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "500px",
        position: "relative",
      }}
    >
      {/* Overlay sombre */}
      <div
        className="overlay position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      ></div>

      {/* Contenu */}
      <div className="position-relative">
        <h1 className="fw-bold">{title}</h1>
        <p className="mt-2">
          {breadcrumbs.map((item, index) => (
            <span key={index}>
              {item.href ? (
                <Link href={item.href} className="text-white text-decoration-none">
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
              {index < breadcrumbs.length - 1 && " > "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default HeroHeader;
