export function reservationEmailTemplate({ clientName, date, time, location, instructor, nameSeance, date_reservation}) {
    return `
  <!DOCTYPE html>
<html class="dark" lang="fr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Confirmation Pilates</title>
<style>
 body { font-family: 'Lexend', sans-serif; margin:0; padding:0; color:#000; }
  .container { max-width:480px; margin:0 auto; padding:50px; background:#0b0823;}
  .header { text-align:center; padding:20px; }
  .header h1 { font-size:32px; color:#fff; }
  .header p { font-size:16px; color:#fff; }
  .card { background:#fdf0d5; border-radius:12px; padding:20px; margin:20px 0; border:1px solid #ddd; }
  .card h3 { font-size:20px; margin-bottom:15px; }
  .detail { display:flex; align-items:center; margin-bottom:10px; }
  .icon { background:#fff; color:#fff; border-radius:8px; padding:5px; margin-right:10px; text-align:center; display:flex; justify-content:center; align-items:center; }
  .button-primary { display:block; text-align:center; margin:20px auto; padding:12px 20px; background:#fff; color:#000; text-decoration:none; border-radius:12px; font-weight:bold; }
  .footer { text-align:center; font-size:10px; color:#888; margin-top:20px; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>Session Confirmée !</h1>
    <p>C’est confirmé, ${clientName} ! Préparez-vous pour votre séance de ${nameSeance}.</p>
  </div>

  <div class="card">
    <h3>Détails de la réservation</h3>
    <div class="detail"><div class="icon">📅</div><div>Date : ${date}</div></div>
    <div class="detail"><div class="icon">⏰</div><div>Heure : ${time}</div></div>
    <div class="detail"><div class="icon">📍</div><div>Lieu : ${location}</div></div>
    <div class="detail"><div class="icon">👤</div><div>Instructeur : ${instructor}</div></div>
    <div class="detail"><div class="icon">📞</div><div>Réserver le : ${date_reservation}</div></div>

  </div>

  <a href="${process.env.NEXT_PUBLIC_API_URL}/user/mes-sessions" class="button-primary">Voir mes séances</a>

  <div class="footer">
    Moon Lagree studio - Villa 9 x RUE KA 5 - Sicap Karak, Dakar - +221 76 820 60 66<br/>
    © 2026 MOON LAGREE STUDIO
  </div>
</div>
</body>
</html>
  `;
}
