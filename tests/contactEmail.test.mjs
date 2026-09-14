import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildContactReceiptHtml, buildContactReceiptText } from '../lib/email/contactReceipt.js';

// Aucun appel réseau réel : les identifiants et destinataires sont fictifs.
process.env.RESEND_API_KEY = 're_test_only';
process.env.RESEND_FROM = 'portfolio@example.com';
process.env.CONTACT_EMAIL = 'owner@example.com';
process.env.RECAPTCHA_SECRET_KEY = 'test-only';
const { default: handler } = await import('../api/sendEmail.js');

const payload = {
  name: 'Camille <Martin>', email: 'client@example.com', subject: 'Projet <web>',
  message: 'Bonjour !\nUne demande privée.', recaptchaToken: 'test-token',
};

test('contact notification and receipt', async (t) => {
  let nextIp = 0;
  async function submit(t, { rejectSend = 0, captcha = true, locale } = {}) {
    const sent = [];
    t.mock.method(globalThis, 'fetch', async (url, options) => {
      if (String(url) === 'https://www.google.com/recaptcha/api/siteverify') {
        return Response.json({ success: captcha, action: 'contact', score: 0.9 });
      }
      assert.equal(String(url), 'https://api.resend.com/emails');
      sent.push(JSON.parse(options.body));
      return sent.length === rejectSend
        ? Response.json({ message: 'Delivery rejected', name: 'validation_error' }, { status: 422 })
        : Response.json({ id: `email-${sent.length}` });
    });
    t.mock.method(console, 'error', () => {});
    const res = {
      status(code) { this.code = code; return this; },
      json(body) { this.body = body; return this; },
    };
    const ip = `192.0.2.${++nextIp}`;
    await handler({ method: 'POST', body: { ...payload, locale }, headers: { 'x-forwarded-for': ip } }, res);
    return { sent, res, ip };
  }

  await t.test('sends distinct emails with correct reply addresses and no IP in receipt', async (t) => {
    const { sent, res, ip } = await submit(t);
    assert.equal(res.code, 200);
    assert.equal(sent.length, 2);
    assert.equal(sent[0].to, 'owner@example.com');
    assert.equal(sent[1].to, 'client@example.com');
    assert.equal(sent[0].reply_to, 'client@example.com');
    assert.equal(sent[1].reply_to, 'owner@example.com');
    assert(sent[0].html.includes(ip));
    assert(sent[0].text.includes(payload.message));
    assert(sent[1].html.includes('au plus vite'));
    assert(sent[1].html.includes('Camille &lt;Martin&gt;'));
    assert(sent[1].html.includes('Projet &lt;web&gt;'));
    for (const body of [sent[1].html, sent[1].text]) {
      assert(!body.includes(ip));
      assert(!body.includes('Adresse IP'));
      assert(!body.includes(payload.message));
    }
    assert.equal(sent[1].headers['Auto-Submitted'], 'auto-replied');
  });

  await t.test('does not acknowledge a rejected notification', async (t) => {
    const { sent, res } = await submit(t, { rejectSend: 1 });
    assert.equal(sent.length, 1);
    assert.equal(res.code, 500);
    assert.equal(res.body.success, false);
  });

  await t.test('keeps submission successful if only the receipt fails', async (t) => {
    const { sent, res } = await submit(t, { rejectSend: 2 });
    assert.equal(sent.length, 2);
    assert.equal(res.code, 200);
    assert.equal(res.body.success, true);
  });

  await t.test('sends neither email when captcha fails', async (t) => {
    const { sent, res } = await submit(t, { captcha: false });
    assert.equal(sent.length, 0);
    assert.equal(res.code, 400);
  });

  for (const locale of ['en', 'fr', 'bzh', 'unknown', undefined]) {
    await t.test(`receipt language for ${locale ?? 'missing locale'}`, async (t) => {
      const { sent, res, ip } = await submit(t, { locale });
      assert.equal(res.code, 200);
      const receipt = sent[1];
      const english = locale === 'en';
      assert(receipt.subject.startsWith(english ? 'Your message' : 'Accusé de réception'));
      assert(receipt.html.includes(`<html lang="${english ? 'en' : 'fr'}">`));
      for (const body of [receipt.html, receipt.text]) {
        assert(body.includes(english ? 'Hello Camille' : 'Bonjour Camille'));
        assert(body.includes(english ? 'as soon as possible' : 'au plus vite'));
        assert(!body.includes(english ? 'Votre demande' : 'Your enquiry'));
        assert(!body.includes(ip));
      }
      assert(sent[0].html.includes('EXPÉDITEUR'));
    });
  }
});

test('receipt escapes HTML and ignores technical payload fields', () => {
  const data = { name: '<img src=x onerror=alert(1)>', subject: '<script>alert(1)</script>', ip: '192.0.2.99' };
  const html = buildContactReceiptHtml(data);
  assert(!html.includes('<img'));
  assert(!html.includes('<script>'));
  assert(html.includes('&lt;script&gt;'));
  assert(!html.includes(data.ip));
  assert(!buildContactReceiptText(data).includes(data.ip));
});
