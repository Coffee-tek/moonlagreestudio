import { FAQ } from "@/components/FAQ";
import HeroHeader from "@/components/HeroSection";
import Testimonials from "@/components/Témoignages";
import VideoSection from "@/components/video";
import { heroHeaders, aboutYoga, faqData } from "@/data/data";

export default function AboutPage() {
  return (
    <>
      {/* <HeroHeader
        title={heroHeaders.about.title}
        breadcrumbs={heroHeaders.about.breadcrumbs}
      /> */}

      <HeroHeader
        title={heroHeaders.about.title}
        breadcrumbs={heroHeaders.about.breadcrumbs}
        backgroundImage="/img/new/2.jpeg"
      />

      <div className="pt-5">
        <div className="container py-5">
          <div className="row g-4 g-md-5">
            {/* Col gauche */}
            <div
              className="col-lg-4 col-12"
              data-aos="fade-right"
              data-aos-duration="500"
            >
              <h1 className="fw-bold pb-3">{aboutYoga.title}</h1>
              <a
                href={aboutYoga.button.href}
                className="btn btn-primary btn-lg rounded-pill"
              >
                {aboutYoga.button.label}
              </a>
            </div>

            {/* Col droite */}
            <div className="col-lg-8 col-12">
              <p
                className="text-dark lead"
                data-aos="fade-left"
                data-aos-duration="700"
              >
                {aboutYoga.lead}
              </p>
              <p className="mb-0" data-aos="fade-up" data-aos-duration="600">
                {aboutYoga.description}
              </p>
            </div>
          </div>
        </div>
        <VideoSection 
          src="/video/pilate.mp4"
          title="Reconnectez-vous à vous-même"
          subtitle="Découvrez nos cours de yoga et méditation"
        />
      </div>

      <Testimonials />

     <FAQ data={faqData.about} />;

      
    </>
  );
}
