import Image from "next/image";
import { subscribe } from "@/data/data";

export default function SubscribeSection() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card text-bg-dark border-0 rounded-4 text-center overflow-hidden">
              {/* Image de fond */}
              <Image
                src={subscribe.image}
                alt="subscribe"
                className="card-img rounded-0 opacity-50"
                width={1200}
                height={600}
                priority
              />

              {/* Overlay avec le texte */}
              <div className="card-img-overlay d-flex align-items-center justify-content-center w-50 mx-auto">
                <div>
                  <h1
                    className="card-title fw-bold"
                    data-aos="fade-up"
                    data-aos-duration="500"
                  >
                    {subscribe.title}
                  </h1>
                  <p
                    className="card-text"
                    data-aos="fade-up"
                    data-aos-duration="600"
                  >
                    {subscribe.description}
                  </p>

                  {/* Formulaire */}
                  <form
                    className="d-flex gap-3 mt-4"
                    role="search"
                    data-aos="fade-up"
                    data-aos-duration="600"
                  >
                    <input
                      className="form-control rounded-pill"
                      type="email"
                      placeholder={subscribe.placeholder}
                      aria-label={subscribe.placeholder}
                    />
                    <button className="btn btn-secondary rounded-pill px-4">
                      {subscribe.buttonText}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
