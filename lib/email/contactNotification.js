import { escapeHtml } from './utils.js';

export function buildContactNotificationHtml({ name, email, subject, message, ip }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\r\n|\r|\n/g, '<br>');
  const safeIp = escapeHtml(ip);
  const emailLink = escapeHtml(`mailto:${encodeURIComponent(email).replace(/%40/g, '@')}`);
  const replyLink = escapeHtml(`mailto:${encodeURIComponent(email).replace(/%40/g, '@')}?subject=${encodeURIComponent(`Re: ${subject}`)}`);

  // Tables et styles intégrés pour que le mail reste lisible sans CSS externe ni images.
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nouveau message · Portfolio Théo Guérin</title>
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;color:#17263c;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${safeName} vous a écrit : ${safeSubject}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f7;">
    <tr><td align="center" style="padding:32px 12px;">
      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;table-layout:fixed;background-color:#ffffff;border:1px solid #dbe3ef;border-radius:16px;">
        <tr><td style="padding:28px 24px;background-color:#0e192b;border-radius:15px 15px 0 0;border-top:4px solid #4d92ff;">
          <p style="margin:0 0 18px;color:#aacbfa;font-size:11px;line-height:18px;font-weight:bold;letter-spacing:2px;">THÉO GUÉRIN &nbsp;/&nbsp; PORTFOLIO</p>
          <h1 style="margin:0;color:#f5f9ff;font-size:26px;line-height:34px;font-weight:bold;">Un nouveau message pour vous.</h1>
          <p style="margin:10px 0 0;color:#b5c5dc;font-size:14px;line-height:22px;">Reçu depuis le formulaire de contact de theo-guerin.fr</p>
        </td></tr>
        <tr><td style="padding:28px 24px 24px;word-wrap:break-word;overflow-wrap:anywhere;">
          <p style="margin:0 0 8px;color:#526782;font-size:11px;line-height:18px;font-weight:bold;letter-spacing:1.5px;">EXPÉDITEUR</p>
          <p style="margin:0 0 6px;color:#17263c;font-size:19px;line-height:27px;font-weight:bold;">${safeName}</p>
          <a href="${emailLink}" style="color:#2459ad;font-size:14px;line-height:22px;text-decoration:underline;word-break:break-all;">${safeEmail}</a>
        </td></tr>
        <tr><td style="padding:0 24px;word-wrap:break-word;overflow-wrap:anywhere;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;border-top:1px solid #e1e8f1;">
            <tr><td style="padding:24px 0 16px;">
              <p style="margin:0 0 8px;color:#526782;font-size:11px;line-height:18px;font-weight:bold;letter-spacing:1.5px;">OBJET</p>
              <h2 style="margin:0;color:#17263c;font-size:21px;line-height:29px;font-weight:bold;">${safeSubject}</h2>
            </td></tr>
            <tr><td style="padding:20px;background-color:#f3f6fb;border-left:3px solid #4d92ff;border-radius:0 8px 8px 0;color:#24364f;font-size:16px;line-height:27px;white-space:pre-wrap;word-break:break-word;">${safeMessage}</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:28px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" bgcolor="#276dee" style="border-radius:8px;mso-padding-alt:14px 24px;">
            <a href="${replyLink}" style="display:inline-block;padding:14px 24px;border:1px solid #276dee;border-radius:8px;color:#ffffff;font-size:15px;line-height:20px;font-weight:bold;text-decoration:none;">Répondre au message</a>
          </td></tr></table>
          <p style="margin:14px 0 0;color:#526782;font-size:12px;line-height:19px;">Vous pouvez aussi utiliser « Répondre » dans votre messagerie.</p>
        </td></tr>
        <tr><td style="padding:18px 24px;border-top:1px solid #e1e8f1;border-radius:0 0 15px 15px;background-color:#f8fafc;">
          <p style="margin:0;color:#61728a;font-size:11px;line-height:18px;word-break:break-all;">Informations techniques · Adresse IP : ${safeIp}</p>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
      <p style="margin:20px 0 0;color:#61728a;font-size:12px;line-height:19px;">Notification automatique · <a href="https://theo-guerin.fr" style="color:#526782;text-decoration:underline;">theo-guerin.fr</a></p>
    </td></tr>
  </table>
</body>
</html>`;
}

export function buildContactNotificationText(payload, ip) {
  return [
      `Nom : ${payload.name}`,
      `Email : ${payload.email}`,
      `Objet : ${payload.subject}`,
      '',
      payload.message,
      '',
      `Adresse IP : ${ip}`,
    ].join('\n');
}
