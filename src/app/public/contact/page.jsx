import HeroHeader from "@/components/HeroSection";
import InstructorsSection from "@/components/instructors";
import MapSection from "@/components/map";
import SubscribeSection from "@/components/newsletter";
import EnhancedPopularClasses from "@/components/popular-class";
import Testimonials from "@/components/Témoignages";
import VideoSection from "@/components/video";
import { heroHeaders, aboutYoga } from "@/data/data";
import ContactForm from "../../../components/public/contacts/ContactForm";

export default function ContactPage() {
  // 🔹 Données statiques locales
  const contactInfo = {
    address: "Villa 9 x RUE KA 5 - Sicap Karak en face ecole de police à l’angle de l’Ambassade de l’Afrique du Sud",
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
            <ContactForm />

            {/* Coordonnées */}
            <div className="col-lg-4 col-12">
              <div className="mb-5" data-aos="fade-left" data-aos-duration="600">
                <h5 className="fw-bold">Notre Adresse​</h5>
                <p className="text-muted">{contactInfo.address}</p>
              </div>
              <div className="mb-5" data-aos="fade-left" data-aos-duration="600">
                <h5 className="fw-bold">Adresse Email​</h5>
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

      {/* <Testimonials/> */}

      <MapSection
        title="Nous trouver"
        subtitle="Venez découvrir notre studio"
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3859.1965179368817!2d-17.470693924891922!3d14.701475985796925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDQyJzA1LjMiTiAxN8KwMjgnMDUuMiJX!5e0!3m2!1sfr!2ssn!4v1760187337017!5m2!1sfr!2ssn"
      />

      {/* <SubscribeSection /> */}

    </>
  );
}