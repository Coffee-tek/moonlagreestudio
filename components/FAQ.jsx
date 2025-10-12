"use client";

import Image from "next/image";
import { useState } from "react";

export function FAQ({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
                const isOpen = openIndex === index;
                return (
                  <div className="accordion-item border-0 mb-3" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          !isOpen ? "collapsed" : ""
                        } bg-light fw-bold text-dark rounded-3`}
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={isOpen}
                      >
                        {q.question}
                      </button>
                    </h2>
                    <div
                      className={`accordion-collapse ${
                        isOpen ? "show" : "collapse"
                      }`}
                      style={{
                        transition: "all 0.3s ease-in-out",
                      }}
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

      <style jsx>{`
        .accordion-button {
          box-shadow: none !important;
        }

        .accordion-button:not(.collapsed) {
          background-color: #f8f9fa;
          color: #212529;
        }

        .accordion-button::after {
          transition: transform 0.2s ease-in-out;
        }

        .accordion-button:not(.collapsed)::after {
          transform: rotate(180deg);
        }

        .accordion-collapse {
          overflow: hidden;
        }

        .accordion-collapse.collapse {
          max-height: 0;
          visibility: hidden;
        }

        .accordion-collapse.show {
          max-height: 1000px;
          visibility: visible;
        }

        .accordion-item {
          border: none !important;
        }

        .accordion-body {
          padding: 1rem 1.25rem;
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}