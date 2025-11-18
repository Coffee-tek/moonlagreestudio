export default function PricingSection() {
  return (
    <div className="py-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-12">
            <div className="text-center">
              <div className="text-center bg-primary px-5 title-line rounded-pill">
                <span className="px-5"></span>
              </div>
              <h1 className="fw-bold pb-2" data-aos="fade-up" data-aos-duration="500">
                Straight <br />Forward Pricing
              </h1>
              <p className="text-muted" data-aos="fade-up" data-aos-duration="600">
                Massa ultricies mi quis hendrerit dolor magna
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* One visit */}
          <div className="col-lg-4 col-12" data-aos="fade-right" data-aos-duration="600">
            <div className="card bg-light border-0 rounded-4 text-center overflow-hidden p-5 h-100">
              <div className="card-header bg-transparent border-0">
                <i className="ri-mental-health-line text-success display-1"></i>
                <h5 className="pt-2">One visit</h5>
              </div>
              <div className="card-body py-5">
                <h1 className="card-title display-1 fw-bold text-primary">$7</h1>
                <p className="card-text text-muted">
                  Massa ultricies mi quis. hendrerit dolor magna eget. Nullam eget felis eget nunc lobortis..
                </p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <a href="#" className="btn btn-primary btn-lg rounded-pill">Buy Now</a>
              </div>
            </div>
          </div>

          {/* Monthly */}
          <div className="col-lg-4 col-12" data-aos="flip-right" data-aos-duration="600">
            <div className="card bg-primary border-0 rounded-4 text-center text-white overflow-hidden p-5 h-100">
              <div className="card-header bg-transparent border-0">
                <i className="ri-empathize-line text-white display-1"></i>
                <h5 className="pt-2">Monthly</h5>
              </div>
              <div className="card-body py-5">
                <h1 className="card-title display-1 fw-bold">$50</h1>
                <p className="card-text text-white-50">
                  Massa ultricies mi quis. hendrerit dolor magna eget. Nullam eget felis eget nunc lobortis..
                </p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <a href="#" className="btn btn-light btn-lg rounded-pill">Buy Now</a>
              </div>
            </div>
          </div>

          {/* Yearly */}
          <div className="col-lg-4 col-12" data-aos="fade-left" data-aos-duration="600">
            <div className="card bg-light border-0 rounded-4 text-center overflow-hidden p-5 h-100">
              <div className="card-header bg-transparent border-0">
                <i className="ri-heart-pulse-line text-success display-1"></i>
                <h5 className="pt-2">Yearly</h5>
              </div>
              <div className="card-body py-5">
                <h1 className="card-title display-1 fw-bold text-primary">$99</h1>
                <p className="card-text text-muted">
                  Massa ultricies mi quis. hendrerit dolor magna eget. Nullam eget felis eget nunc lobortis..
                </p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <a href="#" className="btn btn-primary btn-lg rounded-pill">Buy Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
