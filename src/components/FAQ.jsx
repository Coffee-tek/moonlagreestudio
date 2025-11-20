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
                        <ul className="text-muted ">
                          {q.answers.map((ans, i) => {
                            const key = Object.keys(ans)[0];
                            return <li key={i}>{ans[key]}</li>;
                          })}
                        </ul>
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