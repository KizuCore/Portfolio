import { contactValidationError, normalizePayload } from './validation.js';
import { isRateLimited } from './rateLimit.js';
import { verifyRecaptcha } from './recaptcha.js';
import { sendContactEmail, sendContactReceipt } from './delivery.js';

export async function submitContact(body, ip) {
  const payload = normalizePayload(body);
  const errorCode = contactValidationError(payload);
  if (errorCode) return { errorCode };
  if (isRateLimited(ip)) return { errorCode: 'rate_limited' };
  if (!(await verifyRecaptcha(payload.recaptchaToken, ip))) return { errorCode: 'captcha_failed' };

  try {
    await sendContactEmail(payload, ip);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error?.message || error);
    return { errorCode: 'send_failed', error: error?.message || 'Unknown error' };
  }

  // Une panne de l’accusé de réception ne doit pas faire renvoyer un message déjà reçu.
  try {
    await sendContactReceipt(payload);
  } catch (error) {
    console.error("Erreur lors de l’envoi de l’accusé de réception :", error?.message || error);
  }
  return { success: true };
}
