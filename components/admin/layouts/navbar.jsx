import Link from 'next/link';
import Image from 'next/image';

export default function AdminNavbar (){
    return (
        <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a 
                className="nav-item nav-link px-0 me-xl-4" 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
              >
                <i className="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* User Dropdown */}
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <a 
                    className="nav-link dropdown-toggle hide-arrow" 
                    href="#" 
                    data-bs-toggle="dropdown"
                  >
                    <div className="avatar avatar-online">
                      <Image 
                        src="/assets/img/avatars/1.png" 
                        alt="User Avatar" 
                        width={40}
                        height={40}
                        className="rounded-circle"
                      />
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              <Image 
                                src="/assets/img/avatars/1.png" 
                                alt="User Avatar" 
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block">John Doe</span>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/admin/profile">
                        <i className="bx bx-user me-2"></i>
                        <span className="align-middle">Mon profile</span>
                      </Link>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/logout">
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Déconnexion</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* / User */}
              </ul>
            </div>
        </nav>
    );
}