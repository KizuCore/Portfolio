declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SCRIPT_ID = "google-recaptcha-v3";

let recaptchaScriptPromise: Promise<void> | null = null;

export function loadRecaptcha(siteKey: string) {
  if (window.grecaptcha) {
    return Promise.resolve();
  }

  if (recaptchaScriptPromise) {
    return recaptchaScriptPromise;
  }

  recaptchaScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(RECAPTCHA_SCRIPT_ID);

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("recaptcha_load_failed")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("recaptcha_load_failed"));

    document.head.appendChild(script);
  });

  return recaptchaScriptPromise;
}

export async function getRecaptchaToken(siteKey: string, action: string) {
  await loadRecaptcha(siteKey);

  return new Promise<string>((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error("recaptcha_unavailable"));
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        ?.execute(siteKey, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}
