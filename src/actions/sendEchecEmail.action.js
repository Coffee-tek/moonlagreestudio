"use server";

import { echecAchatEmailTemplate } from "../emails/echecAchatEmailTemplate";
import transporter from "../lib/nodemailer";

export async function sendEchecEmail({to}) {
  // reservation = { clientName, date, time, location, instructor }

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: "Echec de créditation - Moon Lagree Studio",
    html: echecAchatEmailTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendTraiementEmail]:", err);
    return { success: false, error: err.message };
  }
}
