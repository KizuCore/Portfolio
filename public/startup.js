// Run before the body is parsed; keep the static content available if React fails.
document.documentElement.setAttribute("data-app-loading", "");
window.setTimeout(function () {
  document.documentElement.removeAttribute("data-app-loading");
}, 8000);
