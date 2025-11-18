import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <>
      {/* Partie principale du footer */}
      <footer className="footer py-5" style={{backgroundColor:"#0b0823"}}>
        <div className="container">
          <div className="row py-5">
            {/* Colonne gauche */}
            <div
              className="col-md-6 pe-5"
              data-aos="fade-up"
              data-aos-duration="500"
            >
               <Image
                  src="/img/logo/LOGO_PRIMAIRE_BLANC@4x.png"
                  alt="Profile"
                  width={200}
                  height={200}
                  
                />
              <p className="fs-5 text-white pt-1 pt-3 mb-0">
                moonlagree@gmail.com
              </p>
            </div>

            {/* Colonne droite */}
            <div className="col-md-6 col-12">
              <div className="row gx-4">
                <div
                  className="col-6"
                  data-aos="fade-up"
                  data-aos-duration="600"
                >
                  <h6 className="fw-bold text-white">Contact</h6>
                  <p className="text-white-50">
                    Nous sommes à votre écoute, contactez-nous dès aujourd’hui.
                  </p>
                </div>
                <div
                  className="col-6"
                  data-aos="fade-up"
                  data-aos-duration="700"
                >
                  <h6 className="fw-bold text-white">Localisation</h6>
                  <p className="text-white-50">
                    Passez nous voir au studio, on vous attend !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Partie bas du footer */}
      <div className="pt-4 pb-5" style={{backgroundColor:"#0b0823"}}>
        <div className="container">
          <div className="row align-items-center justify-content-between py-4">
            {/* Liens de navigation */}
            {/* <div className="col-auto">
              <div className="d-flex align-items-center gap-5 footer-links text-uppercase">
                <a href="/" className="link-secondary">ACCUEIL</a>
                <a href="/about" className="link-secondary">A PROPOS</a>
                <a href="/classes" className="link-secondary">CLASSES</a>
                <a href="/contact" className="link-secondary">CONTACT</a>
              </div>
            </div> */}

            {/* Copyright + réseaux sociaux */}
            <div className="col-auto d-flex gap-5">
              <p className="text-center m-0 text-white-50">
                Copyright ©{" "}
                <a href="#" className="text-white">
                  Moon Lagree Studio
                </a>{" "}
                {currentYear}
              </p>
              <div className="d-flex align-items-center gap-4">
                <a href="#" className="link-secondary">
                  <i className="ri-facebook-line ri-lg"></i>
                </a>
                {/* <a href="#" className="link-secondary">
                  <i className="ri-behance-line ri-lg"></i>
                </a> */}
                <a href="#" className="link-secondary">
                  <i className="ri-instagram-line ri-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
