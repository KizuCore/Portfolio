import { CONSENT_EVENT, CONSENT_KEY, getConsentRecord } from "../utils/consent";

const MEASUREMENT_ID = "G-V5X3P7LFL6";
const DISABLE_KEY = `ga-disable-${MEASUREMENT_ID}`;
const PUBLIC_HOSTNAMES = new Set(["theo-guerin.fr", "www.theo-guerin.fr"]);
let started = false;
let requested = false;
let expiryTimer: number | undefined;

function removeAnalyticsCookies() {
  const labels = location.hostname.split(".");
  const domains = ["", ...labels.map((_, i) => labels.slice(i).join("."))];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax`;
    }
  }
}

function synchronizeAnalytics() {
  window.clearTimeout(expiryTimer);
  const record = getConsentRecord();
  if (record) {
    expiryTimer = window.setTimeout(() => {
      window.dispatchEvent(new Event(CONSENT_EVENT));
    }, Math.min(record.expiresAt - Date.now() + 1, 2_147_483_647));
  }
  if (!PUBLIC_HOSTNAMES.has(location.hostname) || record?.choice !== "granted") {
    Object.assign(window, { [DISABLE_KEY]: true });
    removeAnalyticsCookies();
    // Retirer la balise seule n’arrête pas le code exécuté : le rechargement le décharge.
    if (requested) window.location.reload();
    return;
  }
  if (requested) return;
  requested = true;
  Object.assign(window, { [DISABLE_KEY]: false });
  window.dataLayer = [];
  // Le format officiel de gtag utilise un objet Arguments dans dataLayer.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied",
    ad_personalization: "denied", personalization_storage: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: Math.max(1, Math.floor((record.expiresAt - Date.now()) / 1000)),
    cookie_update: false,
    cookie_flags: "SameSite=Lax;Secure",
  });
  const script = document.createElement("script");
  script.id = "consented-google-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function initializeAnalytics() {
  if (started) return;
  started = true;
  window.addEventListener(CONSENT_EVENT, synchronizeAnalytics);
  window.addEventListener("storage", (event) => {
    if (event.key === CONSENT_KEY || event.key === null) window.dispatchEvent(new Event(CONSENT_EVENT));
  });
  window.addEventListener("pageshow", synchronizeAnalytics);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") window.dispatchEvent(new Event(CONSENT_EVENT));
  });
  synchronizeAnalytics();
}
