"use client"
import {defaultYogaTypes } from "@/data/data";
import Image from 'next/image';
import FloatingBtn from "./FloatingBtn";

export default function YogaTypesSection() {

    const yogaTypes = [];

    const typesToDisplay = yogaTypes.length > 0 ? yogaTypes : defaultYogaTypes;

    return (
        
        <div className="row g-4 g-md-5">
                        {typesToDisplay.map((type, index) => (
                        <div 
                            key={type.id || index}
                            className="col-lg-4 col-md-6 col-12 aos-init" 
                            data-aos={type.animation || (index % 2 === 0 ? "flip-left" : "flip-right")} 
                            data-aos-duration={type.duration || 600}
                            >
                            <div className="card bg-transparent border-0 rounded-0 text-center">
                                <div className="position-relative mx-auto" style={{ width: '50%', height: '150px' }}>
                                    <Image
                                        src={type.image}
                                        alt={`${type.title} illustration`}
                                        fill
                                        className="card-img-top object-fit-contain"
                                        priority={index < 3} // Priorité pour les 3 premières images
                                    />
                                </div>
                                <div className="card-body py-0">
                                    <h4 className="card-title">{type.title}</h4>
                                    <p className="card-text text-muted">{type.description}</p>
                                </div>
                            </div>
                        </div>
                        ))}

                        <div className="col-12">
                            <div className="text-center mt-4"  data-aos-duration="600">
                                <FloatingBtn 
                                    text="Choisir mon abonnement"
                                    href="/public/tarifs"
                                    variant="outline-primary"
                                    size="lg"
                                />
                            </div>
                        </div>
        </div>
          
    );
}