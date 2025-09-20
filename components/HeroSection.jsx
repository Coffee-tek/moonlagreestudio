import Link from "next/link";

export default function HeroHeader({ title, breadcrumbs }) {
  return (
    <section className="py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              {/* Titre */}
              <h1
                className="fw-bold display-1 pb-3"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {title}
              </h1>

              {/* Breadcrumb */}
              <nav
                style={{ "--bs-breadcrumb-divider": "'>'" }}
                aria-label="breadcrumb"
                className="d-flex align-items-center justify-content-center"
              >
                <ol
                  className="breadcrumb"
                  data-aos="fade-up"
                  data-aos-duration="600"
                >
                  {breadcrumbs.map((item, index) => (
                    <li
                      key={index}
                      className={`breadcrumb-item small ${
                        item.active ? "active" : ""
                      }`}
                      aria-current={item.active ? "page" : undefined}
                    >
                      {item.active ? (
                        item.label
                      ) : (
                        <Link href={item.href}>{item.label}</Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
