export type ConsentChoice = "granted" | "denied";
export type ConsentRecord = { version: 1; choice: ConsentChoice; savedAt: number; expiresAt: number };
export const CONSENT_KEY = "cookie-consent";
export const CONSENT_EVENT = "cookie-consent-updated";
let sessionChoice: ConsentRecord | null = null;
let storageUnavailable = false;

export function consentExpiry(savedAt: number): number {
  const date = new Date(savedAt);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + 6);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return date.getTime();
}

export function parseConsent(raw: string | null, now = Date.now()): ConsentRecord | null {
  try {
    const record = JSON.parse(raw ?? "null");
    if (record?.version !== 1 || !["granted", "denied"].includes(record.choice)
      || !Number.isFinite(record.savedAt) || !Number.isFinite(record.expiresAt)
      || record.savedAt > now || record.expiresAt <= now
      || record.expiresAt <= record.savedAt || record.expiresAt > consentExpiry(record.savedAt)) return null;
    return record;
  } catch { return null; }
}

export function getConsentRecord(): ConsentRecord | null {
  if (storageUnavailable) return parseConsent(JSON.stringify(sessionChoice));
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    const record = parseConsent(raw);
    // Legacy choices have no expiry and must be requested again.
    if (raw && !record) localStorage.removeItem(CONSENT_KEY);
    return record;
  } catch {
    storageUnavailable = true;
    return parseConsent(JSON.stringify(sessionChoice));
  }
}

export function getConsent(): ConsentChoice | null {
  return getConsentRecord()?.choice ?? null;
}

export function updateConsent(granted: boolean) {
  const savedAt = Date.now();
  sessionChoice = { version: 1, choice: granted ? "granted" : "denied", savedAt, expiresAt: consentExpiry(savedAt) };
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(sessionChoice)); }
  catch { storageUnavailable = true; }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function openCookiePreferences() {
  window.openCookiePreferences?.();
}
