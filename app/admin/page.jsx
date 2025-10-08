"use client";

export default function AdminHome() {


  return (
    <>

      <div className="wrapper">
        {/* Sidenav Menu */}
        <div className="sidenav-menu">
          <a href="/" className="logo">
            <span className="logo logo-light">
              <span className="logo-lg">
                <img src="/assets/images/logo.png" alt="logo" />
              </span>
              <span className="logo-sm">
                <img src="/assets/images/logo-sm.png" alt="small logo" />
              </span>
            </span>
            <span className="logo logo-dark">
              <span className="logo-lg">
                <img src="/assets/images/logo-black.png" alt="dark logo" />
              </span>
              <span className="logo-sm">
                <img src="/assets/images/logo-sm.png" alt="small logo" />
              </span>
            </span>
          </a>

          <button className="button-on-hover">
            <i className="ti ti-menu-4 fs-22 align-middle"></i>
          </button>

          <button className="button-close-offcanvas">
            <i className="ti ti-x align-middle"></i>
          </button>

          <div className="scrollbar" data-simplebar>
            <div className="sidenav-user">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <a href="#" className="link-reset">
                    <img
                      src="/assets/images/users/user-3.jpg"
                      alt="user"
                      className="rounded-circle mb-2 avatar-md"
                    />
                    <span className="sidenav-user-name fw-bold">Geneva K.</span>
                    <span className="fs-12 fw-semibold">Art Director</span>
                  </a>
                </div>
                <div>
                  <a
                    className="dropdown-toggle drop-arrow-none link-reset sidenav-user-set-icon"
                    data-bs-toggle="dropdown"
                    href="#!"
                  >
                    <i className="ti ti-settings fs-24 align-middle ms-1"></i>
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdown-header noti-title">
                      <h6 className="text-overflow m-0">Welcome back!</h6>
                    </div>
                    <a href="#" className="dropdown-item">
                      <i className="ti ti-user-circle me-2 fs-17 align-middle"></i>
                      <span>Profile</span>
                    </a>
                    <a href="#" className="dropdown-item fw-semibold">
                      <i className="ti ti-logout-2 me-2 fs-17 align-middle"></i>
                      <span>Déconnexion</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <ul className="side-nav">
              <li className="side-nav-title mt-2">Navigation</li>

              <li className="side-nav-item active">
                <a
                  data-bs-toggle="collapse"
                  href="#sidebarDashboards"
                  className="side-nav-link"
                >
                  <span className="menu-icon">
                    <i data-lucide="circle-gauge"></i>
                  </span>
                  <span className="menu-text">Dashboards</span>
                </a>
              </li>

              <li className="side-nav-item">
                <a href="#" className="side-nav-link">
                  <span className="menu-icon">
                    <i data-lucide="users"></i>
                  </span>
                  <span className="menu-text">Gérer les utilisateurs</span>
                </a>
              </li>

              <li className="side-nav-item">
                <a href="#" className="side-nav-link">
                  <span className="menu-icon">
                    <i data-lucide="calendar"></i>
                  </span>
                  <span className="menu-text">Gérer les plannings</span>
                </a>
              </li>

              <li className="side-nav-item">
                <a href="#" className="side-nav-link">
                  <span className="menu-icon">
                    <i data-lucide="receipt-text"></i>
                  </span>
                  <span className="menu-text">Gérer les packs</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Topbar */}
        <header className="app-topbar z-100">
          <div className="container-fluid topbar-menu">
            <div className="d-flex align-items-center gap-2">
              <div className="logo-topbar">
                <a href="/" className="logo-light">
                  <span className="logo-lg">
                    <img src="/assets/images/logo.png" alt="logo" />
                  </span>
                  <span className="logo-sm">
                    <img src="/assets/images/logo-sm.png" alt="small logo" />
                  </span>
                </a>
                <a href="/" className="logo-dark">
                  <span className="logo-lg">
                    <img src="/assets/images/logo-black.png" alt="dark logo" />
                  </span>
                  <span className="logo-sm">
                    <img src="/assets/images/logo-sm.png" alt="small logo" />
                  </span>
                </a>
              </div>

              <button className="sidenav-toggle-button btn btn-default btn-icon">
                <i className="ti ti-menu-4 fs-22"></i>
              </button>

              <button
                className="topnav-toggle-button px-2"
                data-bs-toggle="collapse"
                data-bs-target="#topnav-menu-content"
              >
                <i className="ti ti-menu-4 fs-22"></i>
              </button>
            </div>

            <div className="d-flex align-items-center gap-2">
              <div className="app-search d-none d-xl-flex me-2">
                <input
                  type="search"
                  className="form-control topbar-search rounded-pill"
                  name="search"
                  placeholder="Quick Search..."
                />
                <i data-lucide="search" className="app-search-icon text-muted"></i>
              </div>

              <div className="topbar-item nav-user">
                <div className="dropdown">
                  <a
                    className="topbar-link dropdown-toggle drop-arrow-none px-2"
                    data-bs-toggle="dropdown"
                    href="#!"
                  >
                    <img
                      src="/assets/images/users/user-3.jpg"
                      width="32"
                      className="rounded-circle me-lg-2 d-flex"
                      alt="user"
                    />
                    <div className="d-lg-flex align-items-center gap-1 d-none">
                      <h5 className="my-0">Geneva</h5>
                      <i className="ti ti-chevron-down align-middle"></i>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <div className="dropdown-header noti-title">
                      <h6 className="text-overflow m-0">Welcome back 👋!</h6>
                    </div>
                    <a href="#" className="dropdown-item">
                      <i className="ti ti-user-circle me-1 fs-17 align-middle"></i>
                      <span>Profile</span>
                    </a>
                    <a href="#" className="dropdown-item fw-semibold">
                      <i className="ti ti-logout-2 me-1 fs-17 align-middle"></i>
                      <span>Déconnexion</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Footer */}
        {/* <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 text-center">
                © {new Date().getFullYear()} UBold By{" "}
                <span className="fw-semibold">Coderthemes</span>
              </div>
            </div>
          </div>
        </footer> */}
      </div>
    </>
  );
}
