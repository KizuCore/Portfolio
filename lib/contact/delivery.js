import { buildContactNotificationHtml, buildContactNotificationText } from '../email/contactNotification.js';
import { buildContactReceiptHtml, buildContactReceiptText, getContactReceiptSubject } from '../email/contactReceipt.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'theo.guerin35000@gmail.com';
const RESEND_FROM = process.env.RESEND_FROM || 'onboarding@resend.dev';
export async function sendContactEmail(payload, ip) {
  const result = await resend.emails.send({
    from: RESEND_FROM,
    to: CONTACT_EMAIL,
    replyTo: payload.email,
    subject: `Portfolio | ${payload.subject}`,
    html: buildContactNotificationHtml({ ...payload, ip }),
    text: buildContactNotificationText(payload, ip),
  });
  if (result.error) throw new Error(result.error.message);
}

export async function sendContactReceipt({ name, email, subject, locale }) {
  const result = await resend.emails.send({
    from: RESEND_FROM,
    to: email,
    replyTo: CONTACT_EMAIL,
    subject: getContactReceiptSubject(locale),
    html: buildContactReceiptHtml({ name, subject, locale }),
    text: buildContactReceiptText({ name, subject, locale }),
    headers: { 'Auto-Submitted': 'auto-replied', 'X-Auto-Response-Suppress': 'All' },
  });
  if (result.error) throw new Error(result.error.message);
}
