export default function VideoSection() {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12"data-aos="fade-up" data-aos-duration="600">
            <div className="card text-bg-dark rounded-4 border-0 overflow-hidden">
              {/* Image d’arrière-plan */}
              <img
                src="/img/video.jpeg"
                className="card-img opacity-50"
                alt="video"
              />

              {/* Overlay avec bouton lecture */}
              <div className="card-img-overlay d-flex align-items-center justify-content-center">
                <a
                  href="#"
                  className="link-light stretched-link"
                  data-bs-toggle="modal"
                  data-bs-target="#videoModal"
                >
                  <i className="ri-play-fill display-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
