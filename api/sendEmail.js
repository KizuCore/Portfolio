import { Resend } from 'resend';
import axios from 'axios';

const resend = new Resend(process.env.RESEND_API_KEY);

// Envoie mail avec vérif hCaptcha
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message, hcaptchaToken } = req.body;
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;

    // Vérif token hCaptcha
    try {
      const hcaptchaResponse = await axios.post(
        'https://hcaptcha.com/siteverify',
        new URLSearchParams({
          secret: process.env.HCAPTCHA_SECRET_KEY,
          response: hcaptchaToken,
        })
      );

      if (!hcaptchaResponse.data.success) {
        return res.status(400).json({ success: false, message: 'hCaptcha validation failed' });
      }
    } catch (error) {
      console.error('Error verifying hCaptcha:', error);
      return res.status(500).json({ success: false, message: 'Failed to verify hCaptcha' });
    }

    // Si hCaptcha vérif, envoie le mail
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'theo.guerin35000@gmail.com',
        subject: `Portfolio | ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <h2 style="color: #276DEE;">Nouveau message reçu via le portfolio</h2>
            <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
              <tr>
                <td><strong>Nom :</strong></td>
                <td>${name}</td>
              </tr>
              <tr>
                <td><strong>Email :</strong></td>
                <td><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td><strong>Message :</strong></td>
                <td style="max-width: 600px; white-space: pre-wrap;">${message}</td>
              </tr>
              <tr>
                <td><strong>Adresse IP :</strong></td>
                <td>${ip}</td>
              </tr>
            </table>
            <p style="margin-top: 2rem; font-size: 14px; color: #999;">Envoyé automatiquement depuis le portfolio KizuCore.</p>
          </div>
        `
      });


      return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
 