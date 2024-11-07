import { Resend } from 'resend';
import axios from 'axios';

const resend = new Resend(process.env.RESEND_API_KEY);

// Envoie mail avec vérif hCaptcha
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message, hcaptchaToken } = req.body;

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
        html: `<p><strong>Nom :</strong> ${name}</p>
               <p><strong>Email :</strong> ${email}</p>
               <p><strong>Message :</strong> ${message}</p>`,
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
