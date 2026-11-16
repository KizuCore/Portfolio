import { getIp, normalizePayload, isValidEmail } from '../lib/contact/validation.js';
import { isRateLimited } from '../lib/contact/rateLimit.js';
import { verifyRecaptcha } from '../lib/contact/recaptcha.js';
import { sendContactEmail, sendContactReceipt } from '../lib/contact/delivery.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Méthode non autorisée',
      errorCode: 'method_not_allowed',
    });
  }

  const payload = normalizePayload(req.body || {});
  const ip = getIp(req);

  if (!payload.captchaConsent) {
    return res.status(400).json({ success: false, errorCode: 'captcha_consent_required' });
  }

  if (!payload.name || !payload.email || !payload.subject || !payload.message || !payload.recaptchaToken) {
    return res.status(400).json({
      success: false,
      message: 'Champs requis manquants',
      errorCode: 'missing_fields',
    });
  }

  if (!isValidEmail(payload.email)) {
    return res.status(400).json({
      success: false,
      message: 'Adresse email invalide',
      errorCode: 'invalid_email',
    });
  }

  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message: 'Trop de tentatives. Veuillez patienter quelques secondes.',
      errorCode: 'rate_limited',
    });
  }

  const isHuman = await verifyRecaptcha(payload.recaptchaToken, ip);
  if (!isHuman) {
    return res.status(400).json({
      success: false,
      message: 'Validation captcha échouée',
      errorCode: 'captcha_failed',
    });
  }

  try {
    await sendContactEmail(payload, ip);
    // Une erreur sur l’accusé ne doit pas inciter à renvoyer un message déjà reçu.
    try {
      await sendContactReceipt(payload);
    } catch (error) {
      console.error("Erreur lors de l’envoi de l’accusé de réception :", error?.message || error);
    }
    return res.status(200).json({
      success: true,
      message: 'Email envoyé avec succès',
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi du message",
      errorCode: 'send_failed',
      error: error?.message || 'Unknown error',
    });
  }
}
