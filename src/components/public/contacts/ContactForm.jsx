"use client"
import React, { useState } from "react";
import { sendContactEmail } from "../../../actions/sendContactEmail.action";

export default function ContactForm() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendContactEmail({
      nom: form.nom,
      email: form.email,
      sujet: form.sujet,
      message: form.message,
    });

    // optionnel : reset formulaire
    setForm({ nom: "", email: "", sujet: "", message: "" });
  };

  return (
    <div className="col-lg-8 col-12">
      <h1 className="fw-bold pb-4" data-aos="fade-right" data-aos-duration="600">
        Contactez nous
      </h1>

      <form className="row g-4" onSubmit={handleSubmit}>
        <div className="col-6" data-aos="fade-right" data-aos-duration="600">
          <input
            type="text"
            name="nom"
            className="form-control rounded-3 p-3"
            placeholder="Nom"
            value={form.nom}
            onChange={handleChange}
          />
        </div>

        <div className="col-6" data-aos="fade-right" data-aos-duration="600">
          <input
            type="email"
            name="email"
            className="form-control rounded-3 p-3"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-12" data-aos="fade-right" data-aos-duration="600">
          <input
            type="text"
            name="sujet"
            className="form-control rounded-3 p-3"
            placeholder="Sujet"
            value={form.sujet}
            onChange={handleChange}
          />
        </div>

        <div className="col-12" data-aos="fade-right" data-aos-duration="600">
          <textarea
            name="message"
            className="form-control rounded-3 p-3"
            rows="5"
            placeholder="Commentaire ou message"
            value={form.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-auto" data-aos="fade-right" data-aos-duration="600">
          <button type="submit" className="btn btn-primary rounded-pill px-5 py-3">
            Envoyer le Message
          </button>
        </div>
      </form>
    </div>
  );
}
