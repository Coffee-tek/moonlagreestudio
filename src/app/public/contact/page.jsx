import HeroHeader from "@/components/HeroSection";
import InstructorsSection from "@/components/instructors";
import MapSection from "@/components/map";
import SubscribeSection from "@/components/newsletter";
import EnhancedPopularClasses from "@/components/popular-class";
import Testimonials from "@/components/Témoignages";
import VideoSection from "@/components/video";
import { heroHeaders, aboutYoga } from "@/data/data";

export default function ContactPage() {
      // 🔹 Données statiques locales
  const contactInfo = {
    address: "9016 Goldfield Street, South Richmond Hill, New York 11419",
    emails: ["Moon.Lagree@gmail.com",],
    phones: ["+1800-954-852", "+1800-954-852"],
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  return (
    <>
      <HeroHeader
        title={heroHeaders.contact.title}
        breadcrumbs={heroHeaders.contact.breadcrumbs}
         backgroundImage="/img/new/11.jpg"
      />

    <div className="py-5">
      <div className="container py-5">
        <div className="row g-4 g-md-5">
          {/* Formulaire */}
          <div className="col-lg-8 col-12">
            <h1
              className="fw-bold pb-4"
              data-aos="fade-right"
              data-aos-duration="600"
            >
              Contactez nous 
            </h1>
            <form className="row g-4">
              <div
                className="col-6"
                data-aos="fade-right"
                data-aos-duration="600"
              >
                <input
                  type="text"
                  className="form-control rounded-3 p-3"
                  placeholder="Nom"
                />
              </div>
              <div
                className="col-6"
                data-aos="fade-right"
                data-aos-duration="600"
              >
                <input
                  type="email"
                  className="form-control rounded-3 p-3"
                  placeholder="Email"
                />
              </div>
              <div
                className="col-12"
                data-aos="fade-right"
                data-aos-duration="600"
              >
                <input
                  type="text"
                  className="form-control rounded-3 p-3"
                  placeholder="Sujet"
                />
              </div>
              <div
                className="col-12"
                data-aos="fade-right"
                data-aos-duration="600"
              >
                <textarea
                  className="form-control rounded-3 p-3"
                  rows="5"
                  placeholder="Commentaire ou message"
                ></textarea>
              </div>
              <div
                className="col-auto"
                data-aos="fade-right"
                data-aos-duration="600"
              >
                <a
                  href="#"
                  className="btn btn-primary rounded-pill px-5 py-3"
                >
                  Envoyer Messages
                </a>
              </div>
            </form>
          </div>

          {/* Coordonnées */}
          <div className="col-lg-4 col-12">
            <div className="mb-5" data-aos="fade-left" data-aos-duration="600">
              <h5 className="fw-bold">Notre Addresse​</h5>
              <p className="text-muted">{contactInfo.address}</p>
            </div>
            <div className="mb-5" data-aos="fade-left" data-aos-duration="600">
              <h5 className="fw-bold">Address Email​</h5>
              <p className="text-muted">
                {contactInfo.emails.map((email, index) => (
                  <span key={index}>
                    {email}
                    <br />
                  </span>
                ))}
              </p>
            </div>
            <div className="mb-5" data-aos="fade-left" data-aos-duration="600">
              <h5 className="fw-bold">Tel</h5>
              <p className="text-muted">
                {contactInfo.phones.map((phone, index) => (
                  <span key={index}>
                    {phone}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Testimonials/>

    <MapSection
      title="Nous trouver"
      subtitle="Venez découvrir notre studio"
      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3859.1965179368817!2d-17.470693924891922!3d14.701475985796925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDQyJzA1LjMiTiAxN8KwMjgnMDUuMiJX!5e0!3m2!1sfr!2ssn!4v1760187337017!5m2!1sfr!2ssn"
    />

    {/* <SubscribeSection /> */}
      
    </>
  );
}