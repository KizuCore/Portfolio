// Ce script démarre avant la lecture du corps de page pour que le contenu statique reste accessible si React échoue.
document.documentElement.setAttribute("data-app-loading", "");
window.setTimeout(function () {
  document.documentElement.removeAttribute("data-app-loading");
}, 8000);
