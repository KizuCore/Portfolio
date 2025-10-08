export type ConsentChoice = "granted" | "denied";
const LS_KEY = "cookie-consent";

export function getConsent(): ConsentChoice | null {
  const v = localStorage.getItem(LS_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function updateConsent(granted: boolean) {
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
}

export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
}
