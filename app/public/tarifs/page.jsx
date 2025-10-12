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
                  Comment fonctionnent les crédits
                </h1>
                <p data-aos="fade-right" data-aos-duration="600">
                  Adresse à mettre ici, Mermoz - Dakar
                </p>
              </div>
            </div>

            <div className="col-lg-6 col-12">
                <p
                className="text-dark lead"
                data-aos="fade-left"
                data-aos-duration="700"
                >
                Egestas diam in arcu cursus euismod. Dictum fusce ut placerat
                orci nulla. Tincidunt ornare massa eget egestas purus Tempor id
                eu nisl nunc mi ipsum faucibus. Fusce id velit ut tortor pretium.
                </p>

                <p
                className="text-muted"
                data-aos="fade-left"
                data-aos-duration="700"
                >
                Tempor incididunt ut labore et dolore magna aliqua. Bibendum est
                ultricies integer quis. Iaculis urna id volutpat lacus laoreet.
                Mauris vitae ultricies leo integer malesuada. Ac odio tempor orci
                dapibus ultrices in. Egestas diam in arcu cursus euismod. Dictum
                fusce ut placerat orci nulla. Tincidunt ornare massa eget egestas
                purus
                </p>

                <p
                className="text-muted"
                data-aos="fade-left"
                data-aos-duration="700"
                >
                Viverra accumsan in nisl. Tempor id eu nisl nunc mi ipsum
                faucibus. Fusce id velit ut tortor pretium. Massa ultricies mi
                quis. hendrerit dolor magna eget. Nullam eget felis eget nunc
                lobortis. Faucibus ornare suspendisse sed nisi.
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
