"use client";

import { FAQ } from "@/components/FAQ";
import HeroHeader from "@/components/HeroSection";
import SubscribeSection from "@/components/newsletter";
import { faqData, heroHeaders } from "@/data/data";
import Link from "next/link";

export default function PricingPage() {
  const packs = [
    {
      name: "Essai",
      credits: 1,
      price: {
        price1: 10000,
        price2: 23456,
      },
    },
    { name: "Débutant", credits: 10, price: 120000 },
    { name: "Standard", credits: 20, price: 40000 },
    { name: "Premium", credits: 125, price: 50000 },
  ];

  return (
    <>
      <HeroHeader
        title={heroHeaders.tarifs.title}
        breadcrumbs={heroHeaders.tarifs.breadcrumbs}
        backgroundImage="/img/new/4.jpeg"
      />

      {/* <!-- Comment fonctionne les crédits --> */}
      <div className="py-5">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-6 col-12">
              <div className="mb-5">
                <h1
                  className="fw-bold display-4 pb-3"
                  data-aos="fade-right"
                  data-aos-duration="600"
                >
                 Comment ça marche ?
                </h1>
                <p className="fw-bold fs-5" data-aos="fade-right" data-aos-duration="600">
                  Credits & Reservations 
                </p>
              </div>
            </div>

            <div className="col-lg-6 col-12">
                <p
                className="text-dark"
                data-aos="fade-left"
                data-aos-duration="700"
                >
                  <span className="fw-bold">Comment réserver une séance ?</span>  <br/>
                  <ol style={{ listStyleType: "decimal" }}>
                      <li>Créez votre compte.</li>
                      <li>Consultez le planning des cours (Moon Burn, Full Moon, Moon Flow…).</li>
                      <li>Choisissez votre créneau</li>
                      <li>Choisissez votre moyen de paiement (Via vos credits, Via Mobile Money ou en espèces sur place)</li>
                      <li>confirmer la reservation.</li>
                  </ol>
                </p>
                
                <p
                className="text-dark"
                data-aos="fade-left"
                data-aos-duration="700"
                >
                  <span className="fw-bold">Comment réserver une séance ?</span>  <br/>
                  <ol style={{ listStyleType: "decimal" }}>
                      <li>Créez votre compte.</li>
                      <li>Consultez le planning des cours (Moon Burn, Full Moon, Moon Flow…).</li>
                      <li>Choisissez votre créneau</li>
                      <li>Choisissez votre moyen de paiement (Via vos credits, Via Mobile Money ou en espèces sur place)</li>
                      <li>confirmer la reservation.</li>
                  </ol>
                </p>

                <p
                className="text-dark"
                data-aos="fade-left"
                data-aos-duration="700"
                >
                  <span className="fw-bold">Annulation & modification</span>  <br/>
                  <ul style={{ listStyleType: "disc" }}>
                      <li>Vous pouvez annuler ou déplacer votre séance jusqu’à X heures avant le début du cours (tu me diras ton délai : 4h ? 8h ? 12h ?).</li>
                      <li>Passé ce délai, le crédit est perdu car la place aurait pu être réattribuée.</li>
                      <li>Si le cours est complet, vous pouvez vous inscrire sur liste d’attente : si une place se libère, vous recevez une notification automatique.</li>
                  </ul>
                </p>

                <p
                className="text-dark"
                data-aos="fade-left"
                data-aos-duration="700"
                >
                  <span className="fw-bold">L'arrivée au studio</span>  <br/>
                Nous vous recommandons d’arriver 10 minutes avant le début du cours pour vous installer, rencontrer votre coach et démarrer sereinement.
                </p>

                <p
                className="text-dark"
                data-aos="fade-left"
                data-aos-duration="700"
                >
                ✨ Réservez au rythme qui vous convient. <br/>
                ✨ Des crédits flexibles, un planning simple, une expérience premium.
                </p>

                <p
                className="text-dark fw-bold"
                data-aos="fade-left"
                data-aos-duration="700"
                >
                Pour toute question ou soucis à la reservation n’hesitez pas a nous contacter. 
                </p>
             </div>

          </div>
        </div>
      </div>

      {/* <!-- Crédits--> */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Choisis le pack qui te correspond !</h2>
          <p className="text-muted mb-5">
            Découvre nos différentes formules et choisis le forfait qui
            s&apos;intègre parfaitement dans ton quotidien selon ton rythme et tes envies.
          </p>

          <div className="row g-4 justify-content-center">
            {packs.map((pack, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-3">
                <div className="card shadow-sm border-0 h-100 text-center p-3">
                  {/* Logo + Titre */}
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                    <i className="ri-refresh-line fs-3 text-primary"></i>
                    <h6 className="m-0 fw-bold">Pack {pack.name}</h6>
                  </div>

                  {/* Contenu */}
                  <hr />
                  <h4 className="fw-bold">{pack.credits}</h4>
                  <p className="text-muted">crédits</p>

                  {/* Affichage du prix (objet ou nombre) */}
                  {typeof pack.price === "object" ? (
                    <>
                      <h5 className="fw-bold">
                        {pack.price.price1.toLocaleString()} FCFA
                      </h5>
                      <h6 className="text-muted" style={{ textDecoration: "line-through" }}>
                         {pack.price.price2.toLocaleString()} FCFA
                      </h6>
                    </>
                  ) : (
                    <h5 className="fw-bold">
                      {pack.price.toLocaleString()} FCFA
                    </h5>
                  )}

                  {/* Bouton */}
                  <Link
                    href="#"
                    className="btn btn-primary rounded-pill mt-3 w-100"
                  >
                    Recharger
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ data={faqData.credits} />
      {/* <SubscribeSection /> */}
    </>
  );
}
