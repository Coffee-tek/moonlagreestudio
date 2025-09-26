export default function VideoSection({ src, title, subtitle }) {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12"data-aos="fade-up" data-aos-duration="600">
            <div className="card text-bg-dark rounded-4 border-0 overflow-hidden">
              {/* Image d’arrière-plan */}
              <video
                className="w-100"
                src={src}
                autoPlay
                loop
                muted
                playsInline
                style={{ objectFit: "cover", height: "60vh" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

