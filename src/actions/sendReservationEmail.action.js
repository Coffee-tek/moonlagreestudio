"use server";

import { reservationEmailTemplate } from "../emails/reservationEmail";
import transporter from "../lib/nodemailer";

export async function sendReservationEmail({ to, reservation }) {
  // reservation = { clientName, date, time, location, instructor }

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: "Confirmation de réservation",
    html: reservationEmailTemplate(reservation),
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendReservationEmail]:", err);
    return { success: false, error: err.message };
  }
}
