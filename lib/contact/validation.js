const MAX_FIELD_LENGTHS = {
  name: 120,
  email: 180,
  subject: 180,
  message: 4000,
};

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

export function contactValidationError(payload) {
  if (!payload.captchaConsent) return 'captcha_consent_required';
  if (!payload.name || !payload.email || !payload.subject || !payload.message || !payload.recaptchaToken) {
    return 'missing_fields';
  }
  if (!isValidEmail(payload.email)) return 'invalid_email';
  return null;
}
