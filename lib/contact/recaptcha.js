const RECAPTCHA_ACTION = 'contact';
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

export async function verifyRecaptcha(token, ip) {
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
