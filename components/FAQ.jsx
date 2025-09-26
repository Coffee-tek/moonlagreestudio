"use client"; // seulement si tu es dans Next.js App Router

import Image from "next/image"; // Si Next.js, sinon utiliser <img>
import { useEffect } from 'react';

export function FAQ({data}) {
  
  return (
    <div className="py-5">
      <div className="container py-5">
        <div className="row align-items-center g-4 g-md-5">

          {/* Image */}
          <div className="col-lg-6 col-12">
            <img
              src={data.image}
              alt={data.title}
              className="img-fluid rounded-3"
            />
          </div>

          {/* Texte + Accordion */}
          <div className="col-lg-6 col-12">
            <div className="mb-4">
              <h1 className="fw-bold pb-3">{data.title}</h1>
              <p className="lead">{data.description}</p>
            </div>

            <div className="accordion" id="faqAccordion">
              {data.questions.map((q, index) => {
                const collapseId = `collapse${index}`;
                return (
                  <div className="accordion-item border-0 mb-3" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed bg-light fw-bold text-dark rounded-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${collapseId}`}
                        aria-expanded="false"
                        aria-controls={collapseId}
                      >
                        {q.question}
                      </button>
                    </h2>
                    <div
                      id={collapseId}
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body bg-light rounded-bottom">
                        <p className="text-muted mb-0">{q.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
