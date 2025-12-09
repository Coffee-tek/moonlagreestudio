"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center">
      {/* Image de fond */}
      <Image
        src="/img/new/banniere.WEBP" // mets ton image ici (public/images/hero.jpg)
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 text-white">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight " >
            MOON LAGREE STUDIO <br /> 
          </h1>
          <p className="mt-4 text-lg text-gray-200">
           Un espace où le mouvement devient une expérience : chaque séance sculpte le corps, apaise l’esprit et révèle votre force intérieure. Moon Lagree Studio vous invite à vivre l’entraînement nouvelle génération, alliant intensité, contrôle et équilibre, dans un cadre moderne et soigneusement pensé pour vos résultats.
          </p>

          {/* Boutons */}
          <div className="mt-6 flex gap-4">
            <Link
              href="/public/planning"
              className="btn btn-primary hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium"
            >
              Reserver ma seance
            </Link>
            {/* <Link
              href="#"
              className="btn btn-outline-primary hover:bg-yellow-400 text-black px-6 py-3 rounded-md font-medium"
            >
              Réserver une classe
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}