"use client"
import { useState } from 'react';
import Image from 'next/image';
import HeroHeader from "@/components/HeroSection";
import { heroHeaders } from '@/data/data';
import EnhancedPopularClasses from '@/components/popular-class';

export default function SessionDetails() {
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(5);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    review: '',
    saveInfo: false
  });

  const handleReviewChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('Review submitted:', reviewForm, 'Rating:', rating);
    alert('Avis soumis avec succès !');
    setReviewForm({ name: '', email: '', review: '', saveInfo: false });
  };

  const renderStars = (count) => {
    return Array(5).fill(0).map((_, index) => (
      <i key={index} className={`ri-star-fill ${index < count ? 'text-warning' : 'text-muted'}`}></i>
    ));
  };

  return (

    <>
        <HeroHeader
          title={heroHeaders.session_details.title}
          breadcrumbs={heroHeaders.session_details.breadcrumbs}
          backgroundImage="/img/new/4.jpeg"
        />

        <div>
        {/* Product Section */}
        <div className="py-5">
            <div className="container py-4">
            <div className="row g-5">
                <div className="col-lg-6 col-12 mb-4">
                <div className="big-img">
                    <Image
                    src="/img/pages/products/product-1.jpg"
                    alt="Pilates au sol"
                    width={600}
                    height={200}
                    className="img-fluid rounded-4"
                    
                    />
                </div>
                </div>
                <div className="col-lg-6 col-12 ps-lg-5">
                <p className="text-uppercase text-purple mb-1 fw-bold">Débutant</p>
                <h1 className="fw-bold pb-2 display-5">Pilates au sol (Matwork)</h1>
                <div className="d-flex align-items-center gap-1 mb-3">
                    {renderStars(5)}
                </div>
                <h5 className="fw-bold text-purple">10 crédits</h5>
                <div className="border-bottom py-4">
                    <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus exercitationem quisquam quia provident nobis suscipit esse aliquam autem ducimus, placeat ab? Sequi, soluta minus tempora nulla nesciunt
                    aperiam distinctio beatae?
                    </p>
                </div>
                <div className="border-bottom py-4 mb-4">
                    <div className="mb-3">
                    <p className="form-label small">Coach</p>
                    <div className="btn-group gap-2" role="group" aria-label="Basic radio toggle button group">
                        <h5>Karen Moon</h5>
                    </div>
                    </div>
                </div>
                <div className="row align-items-center pt-3 pb-3">
                    <div className="col-6">
                    <a href="#" className="btn btn-dark btn-lg py-3 px-3 rounded w-100">Réserver</a>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Tabs Section */}
        <div className="py-5 fle justify-content-center bg-light col-10 mx-auto">
            <div className="container py-4">
            <div className="row">
                <div className="col-12">
                <nav>
                    <div className="nav nav-tabs d-flex justify-content-center gap-2 nav-tabs-osahan" id="nav-tab" role="tablist">
                    <button
                        className={`nav-link text-primary px-lg-4 py-lg-3 ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => setActiveTab('description')}
                        type="button"
                    >
                        Description
                    </button>
                    <button
                        className={`nav-link text-primary px-lg-4 py-lg-3 ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                        type="button"
                    >
                        Commentaires (1)
                    </button>
                    </div>
                </nav>

                <div className="tab-content bg-white p-lg-5 p-4 border-end border-bottom border-start" id="nav-tabContent">
                    {/* Description Tab */}
                    {activeTab === 'description' && (
                    <div className="tab-pane fade show active">
                        <h4 className="fw-bold pb-2">Description</h4>
                        <p>
                        Morbi tincidunt ornare massa eget egestas purus viverra. In vitae turpis massa sed elementum tempus egestas sed. Euismod in pellentesque massa placerat duis ultricies. Justo donec enim diam vulputate ut
                        pharetra sit. At auctor urna nunc id cursus metus aliquam eleifend. Ipsum nunc aliquet bibendum enim. Et malesuada fames ac turpis egestas sed tempus.
                        </p>
                        <p>Nisi scelerisque eu ultrices vitae auctor. Sodales ut etiam sit amet nisl purus in mollis. Turpis tincidunt id aliquet risus. Aliquet sagittis id consectetur purus.</p>
                    </div>
                    )}

                    

                    {/* Reviews Tab */}
                    {activeTab === 'reviews' && (
                    <div className="tab-pane fade show active">
                        <div className="row">
                        <div className="col-lg-6 col-12 pe-lg-5">
                            <h4 className="fw-bold border-bottom pb-4">1 Review for Aturna condimentum mattis pell</h4>
                            <div className="d-flex align-items-start gap-3 py-3">
                            <Image
                                className="rounded-circle"
                                src="/img/pages/team/member-1.jpg"
                                alt="Black Smith"
                                width={50}
                                height={50}
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                            <div className="w-100">
                                <div className="d-flex justify-content-between mb-2">
                                <div className="d-flex align-items-end gap-2">
                                    <h5 className="fw-bold m-0">Black Smith</h5>
                                    <span className="text-muted fw-normal small">/  13 Mars 2024</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    {renderStars(5)}
                                </div>
                                </div>
                                <p className="text-muted">At auctor urna nunc id cursus metus aliquam eleifend. Ipsum nunc aliquet bibendum enim. Et malesuada fames ac turpis egestas sed tempus.</p>
                            </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-12">
                            <div className="mb-3">
                            <h4 className="fw-bold">Ajouter un commentaire</h4>
                            <p>Votre adresse mail ne sera pas publié. Champs obligatoire sont marqués *</p>
                            <div className="d-flex gap-4">
                                <p className="mb-0">Votre Note:</p>
                                <div className="d-flex align-items-center gap-2">
                                {Array(5).fill(0).map((_, index) => (
                                    <i
                                    key={index}
                                    className={`ri-star-fill ${index < rating ? 'text-warning' : 'text-muted'}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setRating(index + 1)}
                                    ></i>
                                ))}
                                </div>
                            </div>
                            </div>

                            <form onSubmit={handleSubmitReview}>
                            <div className="mb-3">
                                <textarea
                                className="form-control bg-transparent"
                                rows="5"
                                placeholder="Votre commentaire"
                                name="review"
                                value={reviewForm.review}
                                onChange={handleReviewChange}
                                required
                                ></textarea>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                <input
                                    type="text"
                                    className="form-control bg-transparent"
                                    placeholder="Nom"
                                    name="name"
                                    value={reviewForm.name}
                                    onChange={handleReviewChange}
                                    required
                                />
                                </div>
                                <div className="col">
                                <input
                                    type="email"
                                    className="form-control bg-transparent"
                                    placeholder="Email"
                                    name="email"
                                    value={reviewForm.email}
                                    onChange={handleReviewChange}
                                    required
                                />
                                </div>
                            </div>
                            <div className="mb-4 form-check">
                                <input
                                type="checkbox"
                                className="form-check-input"
                                id="exampleCheck1"
                                name="saveInfo"
                                checked={reviewForm.saveInfo}
                                onChange={handleReviewChange}
                                />
                                <label className="form-check-label small" htmlFor="exampleCheck1">
                                Sauvegarder mon nom, email, et website dans ce navigateur pour la prochaine fois que je commentes.
                                </label>
                            </div>
                            <button type="submit" className="btn btn-dark px-3">Envoyer</button>
                            </form>
                        </div>
                        </div>
                    </div>
                    )}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

        <EnhancedPopularClasses/>
    </>
  );
}