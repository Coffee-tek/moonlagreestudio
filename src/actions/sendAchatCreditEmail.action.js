"use server";

import { achatCreditEmailTemplate } from "../emails/achatCreditEmail";
import transporter from "../lib/nodemailer";

export async function sendAchatCreditEmail({ to, transaction }) {
  // reservation = { clientName, date, time, location, instructor }

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: "Confirmation d'achat - Moon Lagree Studio",
    html: achatCreditEmailTemplate(transaction),
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendAchatCreditEmail]:", err);
    return { success: false, error: err.message };
  }
}
