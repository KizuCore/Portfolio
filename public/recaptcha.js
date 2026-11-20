// No Google request before the message sent after the visitor's explicit choice.
let started = false;
window.addEventListener("message", function (event) {
  if (started || window.parent === window || event.source !== window.parent || event.origin !== location.origin) return;
  const data = event.data;
  if (data?.type !== "recaptcha-start" || typeof data.requestId !== "string"
    || typeof data.siteKey !== "string" || data.action !== "contact") return;
  started = true;
  const reply = (token) => window.parent.postMessage({ type: "recaptcha-result", requestId: data.requestId, token }, location.origin);
  const script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js?render=" + encodeURIComponent(data.siteKey);
  script.async = true;
  script.onerror = () => reply(null);
  script.onload = () => {
    if (!window.grecaptcha) { reply(null); return; }
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(data.siteKey, { action: data.action }).then(reply).catch(() => reply(null));
    });
  };
  document.head.appendChild(script);
});
