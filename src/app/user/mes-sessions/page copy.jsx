"use client";

import { Sidebar } from "@/components/user/sidebar";
import { useState } from "react";

// import "bootstrap-icons/font/bootstrap-icons.css";

export default function MesSessions() {

    const [coverImage, setCoverImage] = useState('/img/new/9.jpeg');


    return (

        <div className="row">

            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="col-lg-8 ps-lg-0">
                <div className="ps-lg-5 pt-lg-5">
                    <div className="d-flex align-items-center justify-content-between w-100 mb-5">
                        <h1 className="m-0 fw-bold">Mes Sessions</h1>
                    </div>

                    {/* Tabs navigation */}
                    <ul
                        className="nav nav-pills align-items-center justify-content-center bg-light order-tabs  p-2 purple-tab nav-fill"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link py-2 px-4 active"
                                id="pills-in-progress-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-in-progress"
                                type="button"
                                role="tab"
                                aria-controls="pills-in-progress"
                                aria-selected="true"
                            >
                                Réservée(s)
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link py-2 px-4"
                                id="pills-order-history-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-order-history"
                                type="button"
                                role="tab"
                                aria-controls="pills-order-history"
                                aria-selected="false"
                            >
                                Annulée(s)
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link py-2 px-4"
                                id="pills-return-requests-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-return-requests"
                                type="button"
                                role="tab"
                                aria-controls="pills-return-requests"
                                aria-selected="false"
                            >
                                Historique
                            </button>
                        </li>
                    </ul>

                    {/* Tabs content */}
                    <div className="tab-content" id="pills-tabContent">
                        {/* Sessions réservée */}
                        <div
                            className="tab-pane fade show active"
                            id="pills-in-progress"
                            role="tabpanel"
                        >
                            <div className="mb-4">
                                {/* <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-4">
                                            <h4 className="fw-bold m-0">
                                                Sessions réservées{" "}
                                            </h4>
                                            
                                        </div> */}

                                <div className="bg-white p-4">
                                    {/* Product 1 */}
                                    <div className="pb-4 border-bottom mb-4">
                                        <div className="row">
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-4">
                                                <img
                                                    src="/img/pages/products/product-1.jpg"
                                                    className="img-fluid rounded-3"
                                                    alt="deliverd-order"
                                                />
                                            </div>
                                            <div className="col-xl-10 col-lg-9 col-md-9 col-8">
                                                <div className="card-body d-flex align-items-start justify-content-between">
                                                    <div>
                                                        <span className="px-3 py-2 rounded-pill bg-opacity-purple text-purple mb-3 badge">
                                                            <span className="fw-bold">Session</span> Réservée
                                                        </span>
                                                        <h6 className="card-title fw-bold mb-1">
                                                            Pilates au sol (Matwork)
                                                        </h6>
                                                        <div className="card-text">
                                                            <div className="row">
                                                                <small className="text-body-secondary">
                                                                    Date : 25 Oct 2025
                                                                </small>
                                                                <small className="text-body-secondary">
                                                                    Heure : 15H00
                                                                </small>
                                                                <small className="text-body-secondary">
                                                                    Crédits : 17
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <h5 className="card-text fw-bold mb-0">
                                                            Avec coach Karen
                                                        </h5>
                                                    </div>
                                                    <a href="#" className="btn btn-danger rounded-pill">Annuler</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                  
                                </div>
                            </div>
                        </div>

                        {/* Session terminées*/}
                        <div
                            className="tab-pane fade"
                            id="pills-order-history"
                            role="tabpanel"
                        >
                            {/* <h4 className="fw-bold mb-4 border-bottom pb-4">Sessions terminées</h4> */}
                            {/* Exemple d’items ici */}
                        </div>

                        {/* Historique des sessions*/}
                        <div
                            className="tab-pane fade"
                            id="pills-return-requests"
                            role="tabpanel"
                        >
                            {/* <h4 className="fw-bold mb-4 border-bottom pb-4">Historique des sessions</h4> */}
                            {/* Exemple d’items ici */}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}
