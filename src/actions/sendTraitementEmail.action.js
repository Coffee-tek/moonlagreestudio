"use server";

import { traitementAchatEmailTemplate } from "../emails/traitementAchatEmail";
import transporter from "../lib/nodemailer";

export async function sendTraitementEmail({to}) {
  // reservation = { clientName, date, time, location, instructor }

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: "Traitement en cours - Moon lagree Studio",
    html: traitementAchatEmailTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendTraiementEmail]:", err);
    return { success: false, error: err.message };
  }
}
