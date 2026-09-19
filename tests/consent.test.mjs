import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { test } from 'node:test';

function loadConsent({ blockedStorage = false } = {}) {
  const stored = new Map();
  const events = [];
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(new URL('../src/utils/consent.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const context = {
    exports, Date, JSON, Event,
    localStorage: {
      getItem(key) { if (blockedStorage) throw new Error('denied'); return stored.get(key) ?? null; },
      setItem(key, value) { if (blockedStorage) throw new Error('denied'); stored.set(key, value); },
      removeItem(key) { stored.delete(key); },
    },
    window: { dispatchEvent(event) { events.push(event.type); } },
  };
  vm.runInNewContext(source, context);
  return { ...exports, stored, events };
}

test('consent expires after six calendar months, including short months', () => {
  const { consentExpiry } = loadConsent();
  assert.equal(new Date(consentExpiry(Date.parse('2026-08-31T12:34:56Z'))).toISOString(), '2027-02-28T12:34:56.000Z');
  assert.equal(new Date(consentExpiry(Date.parse('2023-08-31T12:34:56Z'))).toISOString(), '2024-02-29T12:34:56.000Z');
});

test('legacy, expired, malformed and future consent never authorise analytics', () => {
  const { parseConsent, consentExpiry } = loadConsent();
  const savedAt = Date.parse('2026-01-20T12:00:00Z');
  const expiresAt = consentExpiry(savedAt);
  const record = { version: 1, choice: 'granted', savedAt, expiresAt };
  for (const raw of [null, 'granted', 'denied', '{', '{}', 'null',
    JSON.stringify({ ...record, version: 0 }), JSON.stringify({ ...record, choice: 'yes' }),
    JSON.stringify({ ...record, expiresAt: expiresAt + 1 }), JSON.stringify({ ...record, expiresAt: 'forever' })]) {
    assert.equal(parseConsent(raw, savedAt + 1), null);
  }
  assert.equal(parseConsent(JSON.stringify(record), savedAt - 1), null);
  assert.equal(parseConsent(JSON.stringify(record), expiresAt), null);
  assert.equal(parseConsent(JSON.stringify(record), expiresAt - 1)?.choice, 'granted');
});

test('acceptance and refusal share expiry and are saved before notification', () => {
  const consent = loadConsent();
  for (const granted of [true, false]) {
    consent.updateConsent(granted);
    const record = JSON.parse(consent.stored.get(consent.CONSENT_KEY));
    assert.equal(record.choice, granted ? 'granted' : 'denied');
    assert.equal(record.expiresAt, consent.consentExpiry(record.savedAt));
    assert.equal(consent.getConsent(), record.choice);
  }
  assert.deepEqual(consent.events, [consent.CONSENT_EVENT, consent.CONSENT_EVENT]);
});

test('undated stored choices are removed and requested again', () => {
  const consent = loadConsent();
  consent.stored.set(consent.CONSENT_KEY, 'granted');
  assert.equal(consent.getConsent(), null);
  assert.equal(consent.stored.has(consent.CONSENT_KEY), false);
});

test('blocked localStorage does not crash or imply acceptance', () => {
  const consent = loadConsent({ blockedStorage: true });
  assert.equal(consent.getConsent(), null);
  consent.updateConsent(true);
  assert.equal(consent.getConsent(), 'granted');
  consent.updateConsent(false);
  assert.equal(consent.getConsent(), 'denied');
  assert.equal(loadConsent({ blockedStorage: true }).getConsent(), null);
});
