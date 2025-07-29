import { Resend } from 'resend';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialise l’API Resend avec ta clé d’API
const resend = new Resend(process.env.RESEND_API_KEY);

// Map de limitation de fréquence par IP (anti-spam)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 30 * 1000; // 30 secondes

// Fonction utilitaire pour récupérer l’adresse IP du client
function getIp(req: NextApiRequest): string {
  return (
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.socket.remoteAddress ||
    ''
  ).trim();
}

// Vérifie le token hCaptcha avec l’API officielle
async function verifyHcaptcha(token: string): Promise<boolean> {
  try {
    const response = await axios.post(
      'https://hcaptcha.com/siteverify',
      new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY!,
        response: token,
      })
    );
    return response.data.success;
  } catch (err) {
    console.error('Erreur lors de la vérification hCaptcha :', err);
    return false;
  }
}

// Envoie un email via Resend contenant les infos du formulaire
async function sendContactEmail({ name, email, subject, message, ip }: { name: string, email: string, subject: string, message: string, ip: string }) {
  return resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'theo.guerin35000@gmail.com',
    subject: `Portfolio | ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #276DEE;">Nouveau message reçu via le portfolio</h2>
        <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
          <tr><td><strong>Nom :</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email :</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Message :</strong></td><td style="white-space: pre-wrap;">${message}</td></tr>
          <tr><td><strong>Adresse IP :</strong></td><td>${ip}</td></tr>
        </table>
        <p style="margin-top: 2rem; font-size: 14px; color: #999;">Envoyé automatiquement depuis le portfolio KizuCore.</p>
      </div>
    `,
  });
}

// Handler principal de l’API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Autoriser uniquement la méthode POST
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Méthode non autorisée' });
  }

  // Récupère les données du formulaire + IP
  const { name, email, subject, message, hcaptchaToken } = req.body;
  const ip = getIp(req);

  // Vérification des champs obligatoires
  if (!name || !email || !subject || !message || !hcaptchaToken) {
    return res
      .status(400)
      .json({ success: false, message: 'Champs requis manquants' });
  }

  // Anti-spam : limitation par IP
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip);
  if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return res.status(429).json({
      success: false,
      message: 'Trop de tentatives. Veuillez patienter quelques secondes.',
    });
  }
  rateLimitMap.set(ip, now);

  // Vérification hCaptcha
  const isHuman = await verifyHcaptcha(hcaptchaToken);
  if (!isHuman) {
    return res
      .status(400)
      .json({ success: false, message: 'Validation hCaptcha échouée' });
  }

  // Envoi du mail
  try {
    await sendContactEmail({ name, email, subject, message, ip });
    return res
      .status(200)
      .json({ success: true, message: 'Email envoyé avec succès' });
  } catch (err) {
    console.error('Erreur lors de l’envoi de l’email :', err);
    return res
      .status(500)
      .json({ success: false, message: 'Erreur lors de l’envoi du message' });
  }
}










