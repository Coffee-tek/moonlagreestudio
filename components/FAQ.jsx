"use client"; // seulement si tu es dans Next.js App Router

import Image from "next/image"; // Si Next.js, sinon utiliser <img>
// import faqImage from "../img/pages/faq.jpeg"; // adapte le chemin selon ton projet

export default function FAQ() {
  return (
    <div className="py-5">
      <div className="container py-5">
        <div className="row align-items-center g-4 g-md-5">
          {/* Image */}
          <div className="col-lg-6 col-12">
            {/* <Image
              src="/img/faq.jpeg"
              alt="faq"
              className="img-fluid rounded-4"
            /> */}
            <img
                src="/img/faq.png" 
                alt="hero-header"
                className="img-fluid rounded-3"
            />
          </div>

          {/* Texte + Accordion */}
          <div className="col-lg-6 col-12">
            <div className="mb-4">
              <h1 className="fw-bold pb-3">
                Apprenez-en plus grâce à notre foire aux questions
              </h1>
              <p className="lead">
                Sed a magna semper, porta purus eu, ullamcorper ligula. Nam sit
                amet consectetur sapien. Etiam dui ipsum, viverra vel turpis ut,
                dignissim elementum mauris. Sed dapibus auctor scelerisque
                pellentesque habitant morbi tristique senectus et netus et
                malesuada fames.
              </p>
            </div>

            {/* Accordion */}
            <div
              className="accordion accordion-flush mb-4"
              id="accordionFlushExample"
            >
              <div className="accordion-item p-4">
                <h2 className="accordion-header py-2">
                  <button
                    className="accordion-button collapsed bg-white shadow-none fw-bold text-dark px-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    What’s included in a cleaning?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body pt-0 px-0">
                    Description for this block. Use this space for describing
                    your block. Any text will do. Description for this block.
                    You can use this space for describing your block.
                  </div>
                </div>
              </div>

              <div className="accordion-item p-4">
                <h2 className="accordion-header py-2">
                  <button
                    className="accordion-button collapsed bg-white shadow-none fw-bold text-dark px-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Can I skip or reschedule bookings?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body pt-0 px-0">
                    Description for this block. Use this space for describing
                    your block. Any text will do. Description for this block.
                    You can use this space for describing your block.
                  </div>
                </div>
              </div>

              <div className="accordion-item p-4">
                <h2 className="accordion-header py-2">
                  <button
                    className="accordion-button collapsed bg-white shadow-none fw-bold text-dark px-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    How long should a house cleaning take?
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body pt-0 px-0">
                    Description for this block. Use this space for describing
                    your block. Any text will do. Description for this block.
                    You can use this space for describing your block.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
