"use client";
import { Sidebar } from "@/components/user/sidebar";
import { points } from "@/data/data";
import { useState } from "react";

export default function MesPoints() {
    const [coverImage, setCoverImage] = useState('/img/new/9.jpeg');

  return (
    <div className="min-h-screen" style={{backgroundColor:"#eee2d4"}}>

       {/* Header avec cover */}
      <div 
        className="h-64 bg-gradient-to-r from-purple-600 to-blue-600 relative"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        
        <div className="overlay position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}></div>
      </div>

      {/* Contenu principal */}
        <div className="pb-5">
            <div className="container">
                <div className="row">

                    {/* Sidebar */}
                    <Sidebar/>

                    {/* Main content */}
                    <div className="col-lg-8 ps-lg-0">
                        <div className="ps-lg-5 pt-lg-5">
                            <div className="d-flex align-items-center justify-content-between w-100 mb-5">
                            <h1 className="m-0 fw-bold">Mes Points (7 points)</h1>
                            </div>
                            <div>
                            <div className="row row-cols-xl-1 row-cols-lg-1 row-cols-md-1 row-cols-1 g-3">
                                {points.map((transaction) => (
                                <div key={transaction.id} className="col">
                                    <div className="d-flex align-items-center justify-content-between bg-white border px-4 py-4 rounded-4">
                                    <div className="w-75">
                                        <div className="d-flex align-items-center gap-3 osahan-mb-1">
                                        <i className={`ri-${transaction.isPositive ? 'add' : 'subtract'}-line text-muted fs-5`}></i>
                                        <div className="lh-sm">
                                            <h4 className={`fw-bold ${transaction.isPositive ? 'text-success' : 'text-danger'} mb-2`}>
                                            {transaction.type}
                                            </h4>
                                            <p className="text-truncate mb-2 small">
                                            Transaction ID: {transaction.transactionId}
                                            </p>
                                            <small className="text-muted">{transaction.date}</small>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="ms-auto d-flex align-items-center gap-3 text-center small">
                                        <span className={`${transaction.isPositive ? 'text-success' : 'text-danger'} fw-bold h5 m-0`}>
                                        {transaction.amount}
                                        </span>
                                    </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
       
    </div>
  );
}