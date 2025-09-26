// import Link from "next/link";

// export default function HeroHeader({ title, breadcrumbs }) {
//   return (
//     <section className="py-5">
//       <div className="container py-5">
//         <div className="row">
//           <div className="col-12">
//             <div className="text-center">
//               {/* Titre */}
//               <h1
//                 className="fw-bold display-1 pb-3"
//                 data-aos="fade-up"
//                 data-aos-duration="500"
//               >
//                 {title}
//               </h1>

//               {/* Breadcrumb */}
//               <nav
//                 style={{ "--bs-breadcrumb-divider": "'>'" }}
//                 aria-label="breadcrumb"
//                 className="d-flex align-items-center justify-content-center"
//               >
//                 <ol
//                   className="breadcrumb"
//                   data-aos="fade-up"
//                   data-aos-duration="600"
//                 >
//                   {breadcrumbs.map((item, index) => (
//                     <li
//                       key={index}
//                       className={`breadcrumb-item small ${
//                         item.active ? "active" : ""
//                       }`}
//                       aria-current={item.active ? "page" : undefined}
//                     >
//                       {item.active ? (
//                         item.label
//                       ) : (
//                         <Link href={item.href}>{item.label}</Link>
//                       )}
//                     </li>
//                   ))}
//                 </ol>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";
import React from "react";

const HeroHeader = ({ title, breadcrumbs, backgroundImage }) => {
  return (
    <div
      className="hero-section d-flex align-items-center justify-content-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "500px",
        position: "relative",
      }}
    >
      {/* Overlay sombre */}
      <div
        className="overlay position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      ></div>

      {/* Contenu */}
      <div className="position-relative">
        <h1 className="fw-bold">{title}</h1>
        <p className="mt-2">
          {breadcrumbs.map((item, index) => (
            <span key={index}>
              {item.href ? (
                <Link href={item.href} className="text-white text-decoration-none">
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
              {index < breadcrumbs.length - 1 && " > "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default HeroHeader;
