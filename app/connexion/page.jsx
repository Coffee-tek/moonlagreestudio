"use client";

import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    // Cette propriété exclut le layout par défaut
    LoginPage.getLayout = function getLayout(page) {
        return page;
    };
  return (
    <div className="overflow-hidden vh-100 d-flex align-items-center flex-column">
      <div className="container-fluid bg-white first-form overflow-hidden">
        <div className="row align-items-center " style={{backgroundColor:"#0b0823"}}>
          {/* Colonne gauche */}
          <div className="col-lg-8  py-4 d-none d-lg-block" style={{backgroundColor:"#0b0823"}}>
            <div className="row justify-content-center">
              <div className="col-lg-8 col-12 overflow-hidden">
                <div className="text-center mb-5">
                  {/* <div className="small text-muted">OVERLINE</div> */}
                  <h1 className="fw-bold py-2 text-white display-5">
                    Votre passerelle vers une exploration continue
                  </h1>
                  <p className="text-white mb-4 lead">
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
                  alt="About"
                  className="img-fluid rounded-5 shadow"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>

          {/* Colonne droite (formulaire) */}
          <div className="col-lg-4 col-12 p-5 vh-100 d-flex align-items-center flex-column" style={{backgroundColor:"#fdf0d5"}}>
            <div className="d-flex align-items-center justify-content-between w-100 mb-5">
              {/* Logo */}
              <div className="position-relative d-flex align-items-center gap-2 site-brand">
                <i className="ri-body-scan-line fs-2 lh-1 text-black"></i>
                <div className="lh-1">
                  <h5 className="fw-bold m-0 text-black">YOGA</h5>
                  <small className="text-dark">Template</small>
                </div>
                <Link href="/" className="stretched-link"></Link>
              </div>
              <Link href="/inscription" className="text-decoration-none">
                S'inscrire
              </Link>
            </div>

            {/* Formulaire */}
            <div className="m-auto w-100">
              <h2 className="fw-bold">Bon retour</h2>
              <p className="text-muted mb-4">
                Lorem ipsum dolor sit amet consectetu..
              </p>

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

              <form action="/account/orders" className="d-grid gap-2 input-group-lg">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label small">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrer votre email"
                    id="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label small">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control bg-light border-0 px-3 py-2"
                    placeholder="Entrer votre mot de passe"
                    id="password"
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3 form-check ps-0">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label small" htmlFor="remember">
                      Se souvenir de moi
                    </label>
                  </div>
                  <Link href="/reset-password" className="text-decoration-none small">
                    Mot de passe oublié
                  </Link>
                </div>
                <button type="submit" className="btn btn-purple btn-theme">
                  Se connecter
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
                  Coffee Tech
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
