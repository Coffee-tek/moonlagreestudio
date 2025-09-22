"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center">
      {/* Image de fond */}
      <Image
        src="/img/hero.jpg" // mets ton image ici (public/images/hero.jpg)
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
            Massa ultricies mi quis. hendrerit dolor magna eget. Nullam eget felis
            eget nunc lobortis. Faucibus ornare suspendisse sed nisi consectetur
            incididunt ut labore.
          </p>

          {/* Boutons */}
          <div className="mt-6 flex gap-4">
            <Link
              href="#"
              className="btn btn-primary hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium"
            >
              En savoir plus
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