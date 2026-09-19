// Le cadre temporaire isole le script tiers et disparaît après chaque vérification.
export function getRecaptchaToken(siteKey: string, action: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const frame = document.createElement("iframe");
    const requestId = crypto.randomUUID();
    frame.src = "/recaptcha.html";
    frame.hidden = true;
    frame.title = "reCAPTCHA";
    frame.setAttribute("aria-hidden", "true");
    const cleanup = () => {
      window.clearTimeout(timeout);
      window.removeEventListener("message", receive);
      window.removeEventListener("pagehide", cancel);
      frame.remove();
    };
    const cancel = () => { cleanup(); reject(new Error("recaptcha_cancelled")); };
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.contentWindow || event.data?.requestId !== requestId) return;
      if (event.data.type !== "recaptcha-result") return;
      cleanup();
      if (typeof event.data.token === "string" && event.data.token) resolve(event.data.token);
      else reject(new Error("recaptcha_failed"));
    };
    const timeout = window.setTimeout(() => { cleanup(); reject(new Error("recaptcha_timeout")); }, 20000);
    window.addEventListener("message", receive);
    window.addEventListener("pagehide", cancel);
    frame.onload = () => frame.contentWindow?.postMessage({ type: "recaptcha-start", requestId, siteKey, action }, location.origin);
    frame.onerror = () => { cleanup(); reject(new Error("recaptcha_load_failed")); };
    document.body.appendChild(frame);
  });
}
