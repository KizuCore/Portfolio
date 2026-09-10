export type ConsentChoice = "granted" | "denied";
const LS_KEY = "cookie-consent";

export function getConsent(): ConsentChoice | null {
  const v = localStorage.getItem(LS_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function updateConsent(granted: boolean) {
  // Les statistiques sont facultatives ; le stockage de sécurité reste autorisé pour respecter le consentement.
  const payload = granted
    ? {
        ad_storage: "denied",
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "denied",
        security_storage: "granted",
      }
    : {
        ad_storage: "denied",
        analytics_storage: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "granted",
      };

  window.gtag?.("consent", "update", payload);
  localStorage.setItem(LS_KEY, granted ? "granted" : "denied");
  window.dispatchEvent(new Event("cookie-consent-updated"));
}

// Conserve la passerelle d’événements historique pour les appels qui n’utilisent pas directement window.openCookiePreferences.
export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
}
