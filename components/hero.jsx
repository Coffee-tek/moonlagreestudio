"use client";
import FloatingBtn from "./FloatingBtn";

export default function Hero() {
  return (
    <div className="container py-5 py-md-0">
      <div className="row align-items-center g-4">
        {/* Texte */}
        <div className="col-lg-6 col-12 pe-lg-5">
          <h1
            // className="fw-bold fs-96 mb-3 text-success"
            className="fw-bold fs-96 mb-3 text-success aos-init aos-animate"
            data-aos="fade-right"
            data-aos-duration="500"
          >
            Transform Your Life with Yoga
          </h1>
          <p
            className="lead text-muted pe-lg-5 aos-init aos-animate"
            data-aos="fade-right"
            data-aos-duration="600"
          >
            Massa ultricies mi quis. hendrerit dolor magna eget. Nullam eget felis
            eget nunc lobortis. Faucibus ornare suspendisse sed nisi consectetur
            incididunt ut labore.
          </p>
          <div
            className="d-flex align-items-center gap-2 mt-5 aos-init aos-animate"
            data-aos="fade-right"
            data-aos-duration="600"
          >
            <a href="#" className="btn btn-primary rounded-pill btn-lg">
              Join Class
            </a>
            <a href="#" className="btn btn-outline-primary rounded-pill btn-lg">
              Learn More
            </a>
          </div>
        </div>

        {/* Image */}
        <div
          className="col-lg-6 col-12 aos-init aos-animate"
          data-aos="fade-left"
          data-aos-duration="600"
        >
          <img
            src="/img/hero-header2.png" // Assure-toi que l'image est dans /public/img/
            alt="hero-header"
            className="img-fluid rounded-3"
          />
        </div>
      </div>
    </div>
  );
}
