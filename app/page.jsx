import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingSection from "@/components/PricingSection";
import VideoSection from "@/components/video";
import YogaTypesSection from "@/components/YogaTypes";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main>

       {/* <!-- Many Styles of Yoga --> */}
        <div className="py-5">
            <div className="container py-5">
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="text-center">
                            <div className="text-center bg-primary px-5 title-line rounded-pill"><span className="px-5"></span></div>
                            <h1 className={"fw-bold pb-2 aos-init"} data-aos="fade-up" data-aos-duration="600">Many Styles of <br />Yoga to Suit Everyone</h1>
                            <p className="text-muted aos-init" data-aos="fade-up" data-aos-duration="600">Mind and Body practice with origins in ancient Indian Philosophy</p>
                        </div>
                    </div>
                </div>
                <YogaTypesSection />
            </div>
        </div>

        <VideoSection />

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
                        Best Yoga Studio in your City
                    </h1>
                    <p data-aos="fade-right" data-aos-duration="600">
                        9016 Goldfield StreetSouth Richmond Hill, New York 11419
                    </p>
                    </div>
                    <a
                    href="#"
                    className="btn btn-primary btn-lg rounded-pill"
                    data-aos="fade-right"
                    data-aos-duration="600"
                    >
                    Find Us On Map
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

        <PricingSection />
        
    </main>
    </>
  );
}
