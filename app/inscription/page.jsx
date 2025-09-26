"use client";

import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="overflow-hidden vh-100 d-flex align-items-center flex-column">
      <div className="container-fluid bg-white first-form overflow-hidden">
        <div className="row align-items-center " style={{backgroundColor:"#0b0823"}}>
          {/* Colonne gauche */}
          <div className="col-lg-4 col-12 p-5 vh-100 d-flex align-items-center flex-column" style={{backgroundColor:"#fdf0d5"}}>
            <div className="d-flex align-items-center justify-content-between w-100 mb-5" >
              <div className="position-relative d-flex align-items-center gap-2 site-brand">
                <i className="ri-body-scan-line fs-2 lh-1 text-black"></i>
                <div className="lh-1">
                  <h5 className="fw-bold m-0 text-black">YOGA</h5>
                  <small className="text-dark">Template</small>
                </div>
                <Link className="stretched-link" href="/" />
              </div>
              <Link href="/connexion" className="text-decoration-none">
                Se connecter
              </Link>
            </div>

            <div className="m-auto w-100">
              <h2 className="fw-bold">Rejoignez nous</h2>
              <p className="text-muted mb-4">Créer votre compte, c'est gratuit.</p>

              {/* Boutons Google / Facebook */}
              {/* <div className="d-grid d-md-flex gap-2">
                <button type="button" className="btn btn-outline-danger btn-lg w-100">
                  <i className="ri-google-line me-3"></i> Google
                </button>
                <button type="button" className="btn btn-outline-primary btn-lg w-100">
                  <i className="ri-facebook-line me-3"></i> Facebook
                </button>
              </div> */}

              <div className="d-flex align-items-center justify-content-between my-3 opacity-50">
                <hr className="w-100" />
                <span className="text-muted small px-4">Ou</span>
                <hr className="w-100" />
              </div>

              {/* Formulaire */}
              <form className="d-grid gap-2 input-group-lg">
                <div className="mb-3">
                  <label className="form-label small">Nom</label>
                  <input
                    type="text"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrer votre nom"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small">Email</label>
                  <input
                    type="email"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrer votre email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small">Mot de passe</label>
                  <input
                    type="password"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrer votre mot de passe"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="termsCheck" />
                  <label className="form-check-label small" htmlFor="termsCheck">
                    J'accepte les conditions d'utilisation et la politique de confidentialité du site.
                  </label>
                </div>
                <button type="submit" className="btn btn-purple btn-theme">
                  Créer votre compte
                </button>
              </form>

              <p className="m-0 pt-4 small text-muted text-center">
                © Tous droits réservés. Réalisé avec{" "}
                <span className="text-danger mx-1">❤</span> par{" "}
                <a
                  className="text-black text-decoration-none d-inline fw-normal p-0"
                  href="#"
                  target="_blank"
                  rel="noopener"
                >
                  Coffee Tek
                </a>
              </p>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="col-lg-8 py-4 d-none d-lg-block text-white" style={{backgroundColor:"#0b0823"}}>
            <div className="row justify-content-center">
              <div className="col-lg-8 col-12 overflow-hidden">
                <div className="text-center mb-5">
                  {/* <div className="small text-muted">OVERLINE</div> */}
                  <h1 className="fw-bold py-2 text-white display-5">
                    Votre passerelle vers une exploration continue
                  </h1>
                  <p className=" mb-4 lead text-white ">
                    Lorem ipsum dolor sit amet, consectetur adipisicing
                  </p>
                  {/* <Link href="/account/orders" className="btn btn-purple btn-theme">
                    View More
                  </Link> */}
                </div>
              </div>
            </div>

            <div className="px-5 text-center">
              <div className="px-5 mx-5">
                <Image
                  src="/img/pages/video.png"
                  alt="background"
                  width={800}
                  height={500}
                  className="img-fluid rounded-5 shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button id="back-to-top" title="Go to top">
        Top
      </button>
    </div>
  );
}
