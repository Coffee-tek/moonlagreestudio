"use client";

import Hero from "@/components/hero";
import SubscribeSection from "@/components/newsletter";
import VideoSection from "@/components/video";
import YogaTypesSection from "@/components/YogaTypes";
import Image from "next/image";
import { useEffect, useState } from 'react';
import EnhancedPopularClasses from "../components/popular-class";

export default function Home() {

    const [isVisible, setIsVisible] = useState({
        image: false,
        title: false,
        text: false
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target.getAttribute('data-element');
                        setIsVisible(prev => ({ ...prev, [target]: true }));
                    }
                });
            },
            { threshold: 0.2 }
        );

        const elements = document.querySelectorAll('[data-element]');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <main>
                <Hero />

                {/* <!-- Many Styles of Yoga --> */}
                <div className="py-5">
                    <div className="container py-5">
                        <div className="row mb-5">
                            <div className="col-12">
                                <div className="text-center">
                                    <div className="text-center bg-primary px-5 title-line rounded-pill"><span className="px-5"></span></div>
                                    <h1 className={"fw-bold pb-2 aos-init"} data-aos="fade-up" data-aos-duration="600">Les avantages du Lagree <br />sur votre coprs et dans votre vie</h1>
                                    <p className="text-muted aos-init" data-aos="fade-up" data-aos-duration="600">Le lagree, une méthode qui  renforce et transforme votre corps</p>
                                </div>
                            </div>
                        </div>
                        <YogaTypesSection />
                    </div>
                </div>

                <VideoSection
                    src="/video/pilate.mp4"
                    title="Reconnectez-vous à vous-même"
                    subtitle="Découvrez nos cours de yoga et méditation"
                />

                {/* <!-- Best Yoga --> */}
                <div className="py-5">
                    <div className="container py-5">
                        <div className="row g-4">
                            <div className="col-lg-6 col-12">
                                <div className="mb-5">
                                    <h1
                                        className="fw-bold fs-3 display-4 pb-3"
                                        data-aos="fade-right"
                                        data-aos-duration="600"
                                    >
                                        Moon Lagree Studio <br />  Un Studio , Une Énergie <br />  Un objectif
                                    </h1>
                                    <p data-aos="fade-right" data-aos-duration="600">
                                        Villa 9 x RUE KA 5 - Sicap Karak <br />   en face ecole de police à <br /> l’angle de l’Ambassade de l’Afrique du Sud
                                    </p>
                                </div>
                                <a
                                    href="https://maps.app.goo.gl/e2BTgUVvN5TJj19F6"
                                    target="_blank" rel="noopener noreferrer"
                                    className="btn btn-primary btn-lg rounded-pill"
                                    data-aos="fade-right"
                                    data-aos-duration="600"
                                >
                                    Notre localisation
                                </a>
                            </div>
                            <div className="col-lg-6 col-12">
                                <p
                                    className="text-dark lead"
                                    data-aos="fade-left"
                                    data-aos-duration="700"
                                >
                                    <span className="fw-bold">Moon Lagree Studio</span>  est le premier studio au Sénégal dédié
                                    à la méthode Lagree™️ sur Microformer DELUXE : un entraînement innovant,
                                    intense et ultra-efficace, qui sculpte le corps en profondeur tout en respectant vos articulations.
                                </p>
                                <p
                                    className="text-muted"
                                    data-aos="fade-left"
                                    data-aos-duration="700"
                                >
                                    Ici, chaque séance est pensée pour renforcer, tonifier et transformer votre corps —
                                    mais aussi votre esprit.
                                    Grâce à la technologie du Microformer, nous offrons des séances accessibles à tous
                                    les niveaux, du débutant au confirmé, avec un suivi personnalisé et une attention portée à la technique.
                                </p>
                                <p
                                    className="text-muted"
                                    data-aos="fade-left"
                                    data-aos-duration="700"
                                >
                                    Notre espace a été conçu comme un cocon moderne :
                                    bienveillant et inspirant, où vous progressez à votre rythme,
                                    encadré par des coachs certifiés.
                                </p>

                              
                            </div>
                            <div
                                className="col-lg-12 col-12"
                                style={{
                                    backgroundColor: "#0b0823",
                                    padding: "70px",
                                    borderRadius: "12px",
                                    color: "white",
                                }}
                            >
                                <blockquote
                                    className="italic text-center relative px-6"
                                    data-aos="fade-left"
                                    data-aos-duration="700"
                                >
                                    {/* Gros guillemet ouvrant */}
                                    <span className="absolute  top-0 text-white opacity-20 select-none"
                                        style={{ fontSize: "120px", lineHeight: "0.7", left:"-30px" }}>
                                        “
                                    </span>

                                    <p className="relative z-10">
                                        Rejoignez notre studio où chaque séance est un moment pour vous,
                                        pour évoluer, pour respirer, vous transformer, lâcher prise,
                                        vous dépasser et célébrer votre puissance.
                                        
                                    </p>

                                    {/* Gros guillemet fermant */}
                                    <span className="absolute right-0 bottom-0 text-white opacity-20 select-none"
                                        style={{ fontSize: "120px", lineHeight: "0.7" }}>
                                        ”
                                    </span>

                                    <footer className="mt-6 not-italic font-semibold opacity-70">
                                        — L'équipe Moon
                                    </footer>
                                </blockquote>
                            </div>


                        </div>
                    </div>
                </div>

                {/* <PricingSection /> */}
                <EnhancedPopularClasses />

                {/* <!-- The Best Yoga Studio --> */}
                <section className="bg-primary py-5">
                    <div className="container py-5">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                            {/* Image Column */}
                            <div
                                data-element="image"
                                className={`transform transition-all duration-700 ${isVisible.image
                                    ? 'translate-x-0 opacity-100'
                                    : '-translate-x-12 opacity-0'
                                    }`}
                            >
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                                    <img
                                        src="/img/new/7.jpeg"
                                        alt="Best Yoga Studio - Peaceful yoga practice"
                                        // width={600}
                                        // height={400}
                                        className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                                        priority
                                        sizes="(max-width: 768px) 40px, 60px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>

                            {/* Content Column */}
                            <div className="space-y-6">
                                {/* Title */}
                                <div
                                    data-element="title"
                                    className={`transform transition-all duration-700 delay-200 ${isVisible.title
                                        ? 'translate-x-0 opacity-100'
                                        : 'translate-x-12 opacity-0'
                                        }`}
                                >
                                    <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                                        L’EXPERIENCE LAGREE - Un entrainement nouvelle generation
                                    </h1>
                                </div>

                                {/* Content */}
                                <div
                                    data-element="text"
                                    className={`space-y-4 transform transition-all duration-700 delay-300 ${isVisible.text
                                        ? 'translate-x-0 opacity-100'
                                        : 'translate-x-12 opacity-0'
                                        }`}
                                >
                                    <p className="text-white text-lg leading-relaxed">
                                        La Methode Lagree : <br /> Inventée par Sébastien Lagree, ancien bodybuilder et expert du fitness, la méthode Lagree est un entraînement révolutionnaire venu des États-Unis.
                                        La methode offre un entrainement intense, complet et a faible impact sur les articulations, combinant force, cardio et endurance.
                                    </p>

                                    <p className="text-white/90 leading-relaxed">
                                        Moon Lagree Studio est le premier studio à Dakar équipé de Microformers, une version plus agile, plus dynamique et incroyablement efficace de la machine Lagree qui fait fureur dans les plus grandes villes du monde entier.
                                    </p>

                                    <span className="text-white/90 leading-relaxed">
                                        Des résultats visibles et rapides:
                                        La méthode Lagree est reconnue mondialement pour : <br />
                                        <ul style={{ listStyleType: "disc" }}>
                                            <li>Affiiner la silhouette</li>
                                            <li>renforcer la ceinture abdominale</li>
                                            <li>tonifier fessiers et bras</li>
                                            <li>améliorer posture et mobilité</li>
                                            <li>booster endurance et contrôle</li>
                                        </ul>
                                        En quelques séances déjà, on ressent la différence. En quelques semaines, on la voit.
                                    </span>

                                    <p className="text-white/80 leading-relaxed">
                                        <br /> ATTENTION : : le Lagree, ce n’est pas du Pilates. <br /><br />
                                        Bien qu’elles partagent certaines inspirations (notamment le contrôle et la précision des mouvements), la méthode Lagree est plus intense, plus dynamique, et conçue pour des résultats rapides et durables.
                                        Là où le Pilates se concentre sur la stabilité et la rééducation, le Lagree cible la transformation physique : brûler, sculpter, renforcer… tout en préservant les articulations.
                                    </p>

                                    {/* Signature */}
                                    <div className="pt-6 text-white">
                                        <p className="text-right font-semibold tracking-wider">
                                            - L'équipe Moon
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <SubscribeSection />

            </main>
        </>
    );
}
