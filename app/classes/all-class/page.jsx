"use client"; // si tu es dans Next.js (App Router)

import Image from "next/image";
import { classes, heroHeaders,  } from "@/data/data";
import HeroHeader from "@/components/HeroSection";

export default function AllClasse () {
    return (
    
    <>
        <HeroHeader
        title={heroHeaders.all_class.title}
        breadcrumbs={heroHeaders.all_class.breadcrumbs}
    />

        <div className="py-5">
        <div className="container pb-5">
            <div className="row g-5">
            {classes.map((cls, index) => (
                <div
                key={cls.id}
                className="col-xl-4 col-lg-4 col-md-6 col-12"
                data-aos={index % 2 === 0 ? "flip-left" : "flip-right"}
                data-aos-duration={600 + index * 100}
                >
                <div className="card border-0 rounded-4 p-4">
                    {/* Image */}
                    <Image
                    src={cls.img}
                    alt={cls.title}
                    width={400}
                    height={300}
                    className="card-img-top rounded-4"
                    />

                    {/* Contenu */}
                    <div className="card-body px-0">
                    <a href="#">
                        <h5 className="card-title">{cls.title}</h5>
                    </a>
                    <p className="card-text">
                        Amet venenatis urna cursus eget. Aliquet porttitor lacus
                        luctus accumsan…
                    </p>
                    <a href="#" className="link-primary">
                        Read More <i className="ri-arrow-right-line ms-1"></i>
                    </a>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
        </>
  );
}