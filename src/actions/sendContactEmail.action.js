"use server";

import { contactEmailTemplate } from "../emails/contactEmailTemplate";
import transporter from "../lib/nodemailer";

export async function sendContactEmail({ nom, email, sujet, message }) {
  const mailOptions = {
    from: `"Contact Site" <${process.env.NODEMAILER_USER}>`,
    to: process.env.NODEMAILER_USER, // 📩 TOI
    subject: `Nouveau message de contact `,
    replyTo: email, // pour répondre directement au client
    html: contactEmailTemplate({
      nom,
      email,
      sujet,
      message,
    }),
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendContactEmail]", err);
    return { success: false, error: err.message };
  }
}
