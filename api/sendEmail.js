import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'theo.guerin35000@gmail.com';
const RESEND_FROM = process.env.RESEND_FROM || 'onboarding@resend.dev';
const RECAPTCHA_ACTION = 'contact';
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const RATE_LIMIT_WINDOW_MS = 30 * 1000;
const MAX_FIELD_LENGTHS = {
  name: 120,
  email: 180,
  subject: 180,
  message: 4000,
};
const RATE_LIMIT_MAX_ENTRIES = 500;

const rateLimitMap = new Map();

function getIp(req) {
  return (
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.socket?.remoteAddress ||
    ''
  ).trim();
}

function cleanField(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizePayload(body) {
  return {
    name: cleanField(body.name, MAX_FIELD_LENGTHS.name),
    email: cleanField(body.email, MAX_FIELD_LENGTHS.email),
    subject: cleanField(body.subject, MAX_FIELD_LENGTHS.subject),
    message: cleanField(body.message, MAX_FIELD_LENGTHS.message),
    recaptchaToken: cleanField(body.recaptchaToken, 4096),
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isRateLimited(ip) {
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip);

  if (rateLimitMap.size > RATE_LIMIT_MAX_ENTRIES) {
    for (const [storedIp, timestamp] of rateLimitMap) {
      if (now - timestamp > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(storedIp);
      }
    }
  }

  if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return true;
  }

  rateLimitMap.set(ip, now);
  return false;
}

async function verifyRecaptcha(token, ip) {
  try {
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error('RECAPTCHA_SECRET_KEY manquante');
      return false;
    }

    const response = await fetch(
      RECAPTCHA_VERIFY_URL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
          remoteip: ip || '',
        }),
      }
    );
    const data = await response.json();

    const minScore = Number(process.env.RECAPTCHA_MIN_SCORE || '0.5');
    const score = Number(data?.score);

    return (
      Boolean(data?.success) &&
      data?.action === RECAPTCHA_ACTION &&
      Number.isFinite(score) &&
      score >= minScore
    );
  } catch (error) {
    console.error('Erreur de vérification reCAPTCHA :', error.message);
    return false;
  }
}

function buildEmailHtml({ name, email, message, ip }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);
  const safeIp = escapeHtml(ip);

  return `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2 style="color: #276DEE;">Nouveau message reçu via le portfolio</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <tr><td><strong>Nom :</strong></td><td>${safeName}</td></tr>
        <tr><td><strong>Email :</strong></td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
        <tr><td><strong>Message :</strong></td><td style="white-space: pre-wrap;">${safeMessage}</td></tr>
        <tr><td><strong>Adresse IP :</strong></td><td>${safeIp}</td></tr>
      </table>
      <p style="margin-top: 2rem; font-size: 14px; color: #999;">
        Envoyé automatiquement depuis le portfolio KizuCore.
      </p>
    </div>
  `;
}

async function sendContactEmail(payload, ip) {
  return resend.emails.send({
    from: RESEND_FROM,
    to: CONTACT_EMAIL,
    subject: `Portfolio | ${payload.subject}`,
    html: buildEmailHtml({ ...payload, ip }),
    text: [
      `Nom : ${payload.name}`,
      `Email : ${payload.email}`,
      '',
      payload.message,
      '',
      `Adresse IP : ${ip}`,
    ].join('\n'),
  });
}

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
