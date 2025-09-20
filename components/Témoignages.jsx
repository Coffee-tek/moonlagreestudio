"use client";

import { testimonials } from "@/data/data";

export default function Testimonials() {

  return (
    <div className="py-4">
      <div className="container py-5">
        {/* Titre */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="text-center">
              <div className="text-center bg-primary px-5 title-line rounded-pill">
                <span className="px-5"></span>
              </div>
              <h1
                className="fw-bold pb-2"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                Témoignages
              </h1>
              <p
                className="text-muted"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                Quelques mots de nos participants
              </p>
            </div>
          </div>
        </div>

        {/* Liste des témoignages */}
        <div className="row g-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`col-lg-6 col-12`}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-duration={index % 2 === 0 ? "600" : "700"}
            >
              <div className="bg-light rounded-4 text-center p-5">
                <p className="lead">{testimonial.description}</p>
                <h5 className="fw-bold pb-2 mb-0 pt-3">{testimonial.title}</h5>
                <small>{testimonial.author}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
