export function achatCreditEmailTemplate({ nomPack, credits, expiration, transaction,prix }) {
  return `
  <!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Confirmation d'achat</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f8f7;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f8f7;padding:20px 0;">
    <tr>
      <td align="center">

        <!-- Container -->
        <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:32px 24px 16px;">
              <div style="width:96px;height:96px;background:#36e28c33;border-radius:50%;display:flex;align-items:center;justify-content:center;">
                <span style="font-size:48px;">✅</span>
              </div>
              <h1 style="margin:24px 0 8px;font-size:24px;color:#112119;">
                C’est confirmé !
              </h1>
              <p style="margin:0;font-size:15px;color:#4e5e56;">
                Votre achat de crédits a été effectué avec succès.
              </p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="padding:24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:10px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 6px;color:#0b0823;font-size:12px;font-weight:bold;text-transform:uppercase;">
                      Achat effectué : ${prix} cfa
                    </p>
                    <h3 style="margin:0 0 16px;font-size:18px;color:#112119;">
                     ${nomPack}
                    </h3>

                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;color:#4e5e56;font-size:14px;">
                          ➕ Crédits ajoutés
                        </td>
                        <td align="right" style="padding:8px 0;font-weight:bold;color:#112119;">
                          +${credits} crédits
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#4e5e56;font-size:14px;">
                          📅 Date d’expiration
                        </td>
                        <td align="right" style="padding:8px 0;color:#112119;">
                         ${expiration}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#4e5e56;font-size:14px;">
                          🔢 Transaction
                        </td>
                        <td align="right" style="padding:8px 0;font-family:monospace;font-size:12px;">
                          #${transaction}
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:12px 24px 28px;">
              <a href="${process.env.NEXT_PUBLIC_API_URL}/user/mes-credits" style="display:block;width:100%;max-width:260px;margin-bottom:12px;padding:14px 0;background:#0b0823;color:#fff;text-decoration:none;border-radius:999px;font-weight:bold;">
                Voir mes crédits
              </a>
              <a href="${process.env.NEXT_PUBLIC_API_URL}/public/planning" style="display:block;width:100%;max-width:260px;padding:12px 0;border:1px solid #d1d5db;color:#112119;text-decoration:none;border-radius:999px;">
                Réserver un cours
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:16px 24px 24px;color:#6b7280;font-size:11px;">
              🔒 Paiement sécurisé <br/><br/>
              Une question ? Contactez-nous à<br/>
              <a href="mailto:moon.lagree@gmail.com" style="color:#0b0823;text-decoration:none;">
                moon.lagree@gmail.com
              </a>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>

  `;
}
