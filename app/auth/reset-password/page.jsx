// pages/resetPassword.jsx
import Link from "next/link";
import Image from "next/image";

export default function ResetPassword() {
  return (
    <>

      <div
        className="hero-section position-relative overflow-hidden vh-100 d-flex align-items-center flex-column bg-light px-lg-5"
        id="welcome"
        style={{
          backgroundImage: "url('/img/new/3.jpeg')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Overlay sombre */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // opacité pour obscurcir
            zIndex: 1,
          }}
        ></div>

        {/* Contenu de la page */}
        <nav className="navbar osahan-main-nav navbar-expand py-lg-4 py-3 gadgets-nav w-100 mb-auto px-lg-5" style={{ zIndex: 2 }}>
          <div className="container px-lg-5">
            <div className="position-relative d-flex align-items-center gap-2 site-brand">
              <div className="lh-1">
                 <Image
                    src="/img/logo/LOGO_PRIMAIRE_COULEUR@4x.png"
                    alt="Profile"
                    width={150}
                    height={150}
                    
                    />
              </div>
              <Link href="/" className="stretched-link"></Link>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="d-flex align-items-center gap-4 ms-auto">
                <p className="small m-0 text-white">
                  Vous n'avez pas de compte ?{" "}
                  <Link href="" className="text-decoration-none text-white">
                    Inscrivez-vous
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <div className="container m-auto px-lg-5" style={{ zIndex: 2 }}>
          <div className="row align-items-center px-lg-5">
            <div className="col-lg-7 col-12 text-white">
              <div className="ps-lg-0 pe-lg-5">
                <div className="py-3">
                  <div className="fw-bold display-4">Moon Lagree Studio</div>
                  <p className="py-4 lead">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quas. Laudantium temporibus placeat.
                  </p>
                  <Link href="/" className="btn btn-purple btn-theme">
                    Voir Plus
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-12 py-3">
              <div className="p-5 bg-white rounded-4 shadow">
                <h2 className="fw-bold mb-3">Mot de passe oublié</h2>
                <p className="lead mb-4">Entre votre adresse mail et réinitialiser votre mot de passe</p>
                <form action="account-orders.html" className="d-grid gap-3 input-group-lg">
                  <input
                    type="email"
                    className="form-control bg-light border-0 px-3 py-2"
                    id="exampleInputPassword1"
                    placeholder="Email"
                  />
                  <button type="submit" className="btn btn-purple btn-theme w-100">
                    Réinitialiser mot de passe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <footer className="py-4 mt-auto w-100 px-lg-5" style={{ zIndex: 2 }}>
          <div className="container text-center d-flex py-3 px-lg-5">
            <p className="m-0 text-white small">
              © Tous droits réservés. Réalisé avec <span className="text-danger mx-1">❤</span> par{" "}
              <a className="text-white text-decoration-none d-inline fw-normal p-0" href="#" target="_blank" rel="noopener noreferrer">
                Coffee Tech
              </a>
            </p>
            <div className="d-flex align-items-center gap-4 ms-auto">
              <a href="#" className="link-secondary">
                <i className="ri-facebook-circle-fill ri-lg"></i>
              </a>
             
              <a href="#" className="link-secondary">
                <i className="ri-instagram-fill ri-lg"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
