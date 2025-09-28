"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {popularClasses, categories as defaultCategories } from "@/data/data";
// import { popularClasses, categories as defaultCategories } from '../data/classes';

const EnhancedPopularClasses = ({ 
  title = "Nos Sessions",
  subtitle = "Découvrez les différentes sessions",
  classes = popularClasses,
  showViewAllButton = true,
  viewAllLink = "/planning",
  viewAllText = "Planning",
  sectionClassName = "py-5 ",
  containerClassName = "container",
  showFilters = false,
  categories = defaultCategories,
  layout = "grid" // "grid" ou "carousel"
}) => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const classesToDisplay = classes;

  // Filtrage par catégorie
  const filteredClasses = activeCategory === "Tous" 
    ? classesToDisplay 
    : classesToDisplay.filter(cls => cls.category === activeCategory);

  return (
    <div className={sectionClassName} >
      <div className={containerClassName} >
        {/* En-tête avec titre et description */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <div data-aos="fade-up" data-aos-duration="500">
              <h1 className="fw-bold mb-3">{title}</h1>
              {subtitle && (
                <p className="lead text-muted mb-4">{subtitle}</p>
              )}
            </div>
          </div>
        </div>

        {/* Filtres (optionnel) */}
        {showFilters && (
          <div className="row justify-content-center mb-5">
            <div className="col-auto">
              <div className="btn-group" data-aos="fade-up" data-aos-duration="600">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* En-tête avec bouton "Voir tout" */}
        <div className="row align-items-center justify-content-between mb-5">
          <div className="col-auto" data-aos="fade-right" data-aos-duration="600">
            <h2 className="h4 mb-0">
              {activeCategory !== "Tous" ? `Niveaux ${activeCategory}` : "Tous les niveaux"}
              {/* <span className="badge bg-primary ms-2">{filteredClasses.length}</span> */}
            </h2>
          </div>
          {showViewAllButton && (
            <div className="col-auto">
              <Link 
                href={viewAllLink} 
                className="btn btn-outline-primary btn-lg rounded-pill" 
                data-aos="fade-left" 
                data-aos-duration="600"
              >
                {viewAllText}
                <i className="ri-arrow-right-line ms-2"></i>
              </Link>
            </div>
          )}
        </div>

        {/* Grille des cours */}
        <div className="row g-5" >
          {filteredClasses.map((classItem, index) => (
            <div 
              key={classItem.id || index} 
              className="col-lg-3 col-md-6 col-12" 
              data-aos="fade-up" 
              data-aos-duration={classItem.animationDuration || (600 + index * 100)}
            >
              <div className="card border-0 rounded-4 h-100 class-card p-2" >
                {/* Image avec overlay */}
                <div className="position-relative overflow-hidden rounded-4">
                  <Image
                    src={classItem.image}
                    alt={classItem.title}
                    width={300}
                    height={200}
                    className="card-img-top rounded-4 w-100"
                    style={{ objectFit: 'cover', height: '200px' }}
                    priority={index < 2}
                  />
                  
                  {/* Badge de niveau */}
                  <span className="badge bg-primary position-absolute top-0 start-0 m-3">
                    {classItem.level || classItem.category}
                  </span>

                  {/* Badge de prix */}
                  {/* {classItem.price && (
                    <span className="badge bg-success position-absolute top-0 end-0 m-3">
                      {classItem.price}
                    </span>
                  )} */}

                  {/* Overlay au hover */}
                  {/* <div className="card-image-overlay">
                    <Link href={classItem.link || '#'} className="stretched-link">
                      <i className="ri-play-circle-fill"></i>
                    </Link>
                  </div> */}
                </div>

                <div className="card-body px-0 d-flex flex-column">
                  {/* Titre */}
                  <Link href={classItem.link || '#'} className="text-decoration-none">
                    <h5 className="card-title mb-2">{classItem.title}</h5>
                  </Link>

                  {/* Informations du cours */}
                  <div className="d-flex align-items-center mb-2 text-muted small">
                    {classItem.instructor && (
                      <>
                        <i className="ri-user-line me-1"></i>
                        <span className="me-3">{classItem.instructor}</span>
                      </>
                    )}
                    {classItem.duration && (
                      <>
                        <i className="ri-time-line me-1"></i>
                        <span>{classItem.duration}</span>
                      </>
                    )}
                  </div>

                  {/* Rating et nombre d'étudiants */}
                  {(classItem.rating || classItem.students) && (
                    <div className="d-flex align-items-center mb-3 text-muted small">
                      {classItem.rating && (
                        <>
                          <div className="d-flex align-items-center me-3">
                            <i className="ri-star-fill text-warning me-1"></i>
                            <span>{classItem.rating}</span>
                          </div>
                        </>
                      )}
                      {/* {classItem.students && (
                        <>
                          <i className="ri-group-line me-1"></i>
                          <span>{classItem.students} étudiants</span>
                        </>
                      )} */}
                    </div>
                  )}

                  {/* Description */}
                  <p className="card-text flex-grow-1 mb-3">{classItem.description}</p>

                  {/* Tags */}
                  {/* {classItem.tags && classItem.tags.length > 0 && (
                    <div className="mb-3">
                      {classItem.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="badge bg-light text-dark me-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )} */}

                  {/* Lien "Lire plus" */}
                  <Link 
                    href={classItem.readMoreLink || classItem.link || '#'} 
                    className="link-primary text-decoration-none fw-medium"
                  >
                    Voir plus
                    <i className="ri-arrow-right-line ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun cours trouvé */}
        {filteredClasses.length === 0 && (
          <div className="row">
            <div className="col-12 text-center py-5">
              <i className="ri-search-line display-4 text-muted mb-3"></i>
              <h4>Aucun cours trouvé</h4>
              <p className="text-muted">Aucun cours ne correspond à cette catégorie.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedPopularClasses;