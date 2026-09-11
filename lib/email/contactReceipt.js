import { escapeHtml } from './utils.js';

const receiptCopy = {
  fr: {
    subject: 'Accusé de réception de votre message — Théo Guérin',
    title: 'Accusé de réception de votre message',
    preview: 'Merci pour votre message. Je vous répondrai au plus vite.',
    heading: 'Votre message est bien reçu.',
    thanks: 'Merci d’avoir pris le temps de me contacter.',
    greeting: 'Bonjour',
    confirmation: 'J’ai bien reçu votre message et je vous répondrai au plus vite.',
    request: 'Votre demande',
    reply: 'Une précision à ajouter ? Vous pouvez simplement répondre à cet e-mail.',
    signoff: 'À bientôt,',
    role: 'Développeur web full-stack à Rennes',
    footer: 'Cet accusé de réception est envoyé automatiquement à la suite de votre message sur',
  },
  en: {
    subject: 'Your message has been received — Théo Guérin',
    title: 'Your message has been received',
    preview: 'Thank you for your message. I’ll get back to you as soon as possible.',
    heading: 'Your message is in good hands.',
    thanks: 'Thank you for taking the time to get in touch.',
    greeting: 'Hello',
    confirmation: 'I’ve received your message and will get back to you as soon as possible.',
    request: 'Your enquiry',
    reply: 'Anything else to add? You can simply reply to this email.',
    signoff: 'Best regards,',
    role: 'Full-stack web developer in Rennes, France',
    footer: 'This confirmation was sent automatically following your message on',
  },
};

function getReceiptCopy(locale) {
  return receiptCopy[locale === 'en' ? 'en' : 'fr'];
}

export function getContactReceiptSubject(locale) {
  return getReceiptCopy(locale).subject;
}

export function buildContactReceiptHtml({ name, subject, locale }) {
  const copy = getReceiptCopy(locale);
  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject);

  return `<!doctype html>
<html lang="${locale === 'en' ? 'en' : 'fr'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${copy.title}</title>
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;color:#17263c;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${copy.preview}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f7;">
    <tr><td align="center" style="padding:32px 12px;">
      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;table-layout:fixed;background-color:#ffffff;border:1px solid #dbe3ef;border-radius:16px;">
        <tr><td style="padding:28px 24px;background-color:#0e192b;border-radius:15px 15px 0 0;border-top:4px solid #4d92ff;">
          <p style="margin:0 0 18px;color:#aacbfa;font-size:11px;line-height:18px;font-weight:bold;letter-spacing:2px;">THÉO GUÉRIN &nbsp;/&nbsp; PORTFOLIO</p>
          <h1 style="margin:0;color:#f5f9ff;font-size:26px;line-height:34px;">${copy.heading}</h1>
          <p style="margin:10px 0 0;color:#b5c5dc;font-size:14px;line-height:22px;">${copy.thanks}</p>
        </td></tr>
        <tr><td style="padding:28px 24px;word-wrap:break-word;overflow-wrap:anywhere;color:#24364f;font-size:16px;line-height:27px;">
          <p style="margin:0 0 18px;">${copy.greeting} ${safeName},</p>
          <p style="margin:0 0 18px;">${copy.confirmation}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;margin:0 0 22px;">
            <tr><td style="padding:18px 20px;background-color:#f3f6fb;border-left:3px solid #4d92ff;border-radius:0 8px 8px 0;">
              <p style="margin:0 0 6px;color:#526782;font-size:11px;line-height:18px;font-weight:bold;letter-spacing:1.5px;">${copy.request.toUpperCase()}</p>
              <p style="margin:0;color:#17263c;font-size:16px;line-height:25px;font-weight:bold;word-break:break-word;">${safeSubject}</p>
            </td></tr>
          </table>
          <p style="margin:0 0 24px;">${copy.reply}</p>
          <p style="margin:0;">${copy.signoff}<br><strong style="color:#17263c;">Théo Guérin</strong><br><span style="color:#526782;font-size:14px;">${copy.role}</span></p>
        </td></tr>
        <tr><td style="padding:18px 24px;border-top:1px solid #e1e8f1;border-radius:0 0 15px 15px;background-color:#f8fafc;">
          <p style="margin:0;color:#61728a;font-size:12px;line-height:19px;">${copy.footer} <a href="https://theo-guerin.fr/${locale === 'en' ? 'en' : 'fr'}" style="color:#526782;text-decoration:underline;">theo-guerin.fr</a>.</p>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>`;
}

export function buildContactReceiptText({ name, subject, locale }) {
  const copy = getReceiptCopy(locale);
  return [
    `${copy.greeting} ${name},`,
    '',
    copy.confirmation,
    '',
    `${copy.request} : ${subject}`,
    '',
    copy.reply,
    '',
    copy.signoff,
    'Théo Guérin',
    copy.role,
    '',
    `${copy.footer} theo-guerin.fr.`,
  ].join('\n');
}
