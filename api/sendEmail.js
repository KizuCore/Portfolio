import { submitContact } from '../lib/contact/submitContact.js';

const errors = {
  captcha_consent_required: { status: 400 },
  missing_fields: { status: 400, message: 'Champs requis manquants' },
  invalid_email: { status: 400, message: 'Adresse email invalide' },
  rate_limited: { status: 429, message: 'Trop de tentatives. Veuillez patienter quelques secondes.' },
  captcha_failed: { status: 400, message: 'Validation captcha échouée' },
  send_failed: { status: 500, message: "Erreur lors de l'envoi du message" },
};

function getIp(req) {
  return (
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.socket?.remoteAddress ||
    ''
  ).trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Méthode non autorisée',
      errorCode: 'method_not_allowed',
    });
  }

  const result = await submitContact(req.body || {}, getIp(req));
  if (result.success) {
    return res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
  }

  const { status, ...details } = errors[result.errorCode];
  return res.status(status).json({ success: false, ...details, ...result });
}
