export function traitementAchatEmailTemplate({ }) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Notification de Statut</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #ffffff;
        color: #111111;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 20px;
        text-align: center;
        background-color: #ffffff;
      }
      .circle {
        width: 80px;
        height: 80px;
        margin: 0 auto 20px;
        border-radius: 50%;
        background-color: #f9f9f9;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #e5e5e5;
        font-size: 50px;
        color: #36e28c;
      }
      h1 {
        font-size: 24px;
        margin-bottom: 12px;
      }
      p {
        font-size: 14px;
        color: #555555;
        margin-bottom: 30px;
      }
      .buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: 100%;
      }
      .button-primary {
        display: inline-block;
        background-color: #111111;
        color: #ffffff;
        text-decoration: none;
        padding: 14px 0;
        width: 100%;
        max-width: 300px;
        border-radius: 50px;
        font-weight: bold;
      }
      .button-secondary {
        display: inline-block;
        color: #888888;
        text-decoration: none;
        font-size: 12px;
      }
      .footer {
        font-size: 11px;
        color: #aaaaaa;
        margin-top: 40px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="circle">✔️</div>
      <h1>Action effectuée</h1>
      <p>Votre demande a été traitée avec succès. Vous recevrez une confirmation détaillée par e-mail sous peu.</p>
      <div class="buttons">
        <a href="${process.env.NEXT_PUBLIC_API_URL}/public/planning" class="button-primary">Continuer</a>
        <a href="${process.env.NEXT_PUBLIC_API_URL}/" class="button-secondary">Retour à l'accueil</a>
      </div>
      <div class="footer">
         Moon Lagree studio - Villa 9 x RUE KA 5 - Sicap Karak, Dakar - +221 76 820 60 66<br/>
         © 2026 MOON LAGREE STUDIO
      </div>
    </div>
  </body>
  </html>
  `;
}
