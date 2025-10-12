"use client";

import Hero from "@/components/hero";
import SubscribeSection from "@/components/newsletter";
import EnhancedPopularClasses from "@/components/popular-class";
import VideoSection from "@/components/video";
import YogaTypesSection from "@/components/YogaTypes";
import Image from "next/image";
import { useEffect, useState } from 'react';

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
                            <h1 className={"fw-bold pb-2 aos-init"} data-aos="fade-up" data-aos-duration="600">Les avantages du pilates <br />sur votre coprs et dans votre vie</h1>
                            <p className="text-muted aos-init" data-aos="fade-up" data-aos-duration="600">Le pilates renforce le coprs, améliore la posture et apaise l'esprit</p>
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
                        className="fw-bold display-4 pb-3"
                        data-aos="fade-right"
                        data-aos-duration="600"
                    >
                        Vôtre meilleur Studio Pilates
                    </h1>
                    <p data-aos="fade-right" data-aos-duration="600">
                        rue 12x34 Mermoz Dakar, Dakar - Sénégal
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

        {/* <PricingSection /> */}
        <EnhancedPopularClasses />

        {/* <!-- The Best Yoga Studio --> */}
        <section className="bg-primary py-5">
            <div className="container py-5">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Image Column */}
                <div 
                data-element="image"
                className={`transform transition-all duration-700 ${
                    isVisible.image 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-12 opacity-0'
                }`}
                >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                    <Image
                    src="/img/studio.png"
                    alt="Best Yoga Studio - Peaceful yoga practice"
                    width={600}
                    height={400}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                </div>

                {/* Content Column */}
                <div className="space-y-6">
                {/* Title */}
                <div 
                    data-element="title"
                    className={`transform transition-all duration-700 delay-200 ${
                    isVisible.title 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-12 opacity-0'
                    }`}
                >
                    <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                    MOON Lagree<br />Studio
                    </h1>
                </div>

                {/* Content */}
                <div 
                    data-element="text"
                    className={`space-y-4 transform transition-all duration-700 delay-300 ${
                    isVisible.text 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-12 opacity-0'
                    }`}
                >
                    <p className="text-white text-lg leading-relaxed">
                    Egestas diam in arcu cursus euismod. Dictum fusce ut placerat orci nulla. 
                    Tincidunt ornare massa eget egestas purus Tempor id eu nisl nunc mi ipsum faucibus. 
                    Fusce id velit ut tortor pretium.
                    </p>
                    
                    <p className="text-white/90 leading-relaxed">
                    Tempor incididunt ut labore et dolore magna aliqua. Bibendum est ultricies integer quis. 
                    Iaculis urna id volutpat lacus laoreet. Mauris vitae ultricies leo integer malesuada. 
                    Ac odio tempor orci dapibus ultrices in. Egestas diam in arcu cursus euismod. 
                    Dictum fusce ut placerat orci nulla. Tincidunt ornare massa eget egestas purus
                    </p>
                    
                    <p className="text-white/90 leading-relaxed">
                    Viverra accumsan in nisl. Tempor id eu nisl nunc mi ipsum faucibus. 
                    Fusce id velit ut tortor pretium. Massa ultricies mi quis. hendrerit dolor magna eget. 
                    Nullam eget felis eget nunc lobortis. Faucibus ornare suspendisse sed nisi.
                    </p>
                    
                    <p className="text-white/80 leading-relaxed">
                    Donec molestie nisi iaculis sodales mollis. Nullam non tellus sed elit pulvinar 
                    digniut vel ex. Phasellus at leo sed est egestas posuere eu eget magna. 
                    Donec eleifend, nisi ac aliquet tincidunt
                    </p>
                    
                    {/* Signature */}
                    <div className="pt-6 text-white">
                    <p className="text-right font-semibold tracking-wider">
                        - Celia Moon
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
