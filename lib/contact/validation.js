const MAX_FIELD_LENGTHS = {
  name: 120,
  email: 180,
  subject: 180,
  message: 4000,
};

export function getIp(req) {
  return (
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.socket?.remoteAddress ||
    ''
  ).trim();
}

export function cleanField(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

export function normalizePayload(body) {
  return {
    name: cleanField(body.name, MAX_FIELD_LENGTHS.name),
    email: cleanField(body.email, MAX_FIELD_LENGTHS.email),
    subject: cleanField(body.subject, MAX_FIELD_LENGTHS.subject),
    message: cleanField(body.message, MAX_FIELD_LENGTHS.message),
    recaptchaToken: cleanField(body.recaptchaToken, 4096),
    captchaConsent: body.captchaConsent === true,
    locale: body.locale === 'en' ? 'en' : 'fr',
  };
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
