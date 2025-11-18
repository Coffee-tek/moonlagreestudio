import Image from "next/image";
import { instructors } from "@/data/data";

export default function InstructorsSection() {
  return (
    <section className="py-5">
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <div className="bg-primary px-5 title-line rounded-pill mx-auto">
              <span className="px-5"></span>
            </div>
            <h1
              className="fw-bold pb-2"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              Nos Instructeurs
            </h1>
            <p
              className="text-muted"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              Nous sommes passionnés du pilates
            </p>
          </div>
        </div>

        <div className="row g-4">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="col-lg-4 col-12"
              data-aos={instructor.animation}
              data-aos-duration="600"
            >
              <div className="card bg-transparent border-0 rounded-0 text-center">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  className="card-img-top rounded-4"
                  width={400}
                  height={400}
                />
                <div className="card-body">
                  <h5 className="card-title">{instructor.name}</h5>
                </div>
                <div className="card-footer bg-transparent border-0 d-flex align-items-center justify-content-center gap-4">
                  {instructor.socials.map((social, idx) => (
                    <a key={idx} href={social.url} className="link-primary">
                      <i className={`${social.icon} ri-lg`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
