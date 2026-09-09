import { JSX, useCallback, useEffect, useRef, useState } from "react";
import BretonTakeover from "../Easter/BretonTakeover";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { getContentLocale, getHtmlLang, getLocalizedPath, getShortLocale, ROUTE_SEO, splitLocalizedPath } from "../../config/seo";
import type { SupportedLocale } from "../../config/seo";
import "../../assets/styles/Header/Navigation.css";

function LanguageSelector(): JSX.Element {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const sequenceRef = useRef("");
  const [takeover, setTakeover] = useState<{ language: string } | null>(null);
  const dismissTakeover = useCallback(() => setTakeover(null), []);
  const currentRoutePath = splitLocalizedPath(location.pathname).pathname;
  const canLocalizeCurrentRoute = Boolean(ROUTE_SEO[currentRoutePath] && !ROUTE_SEO[currentRoutePath].noindex);
  const currentLanguage = getShortLocale(i18n.resolvedLanguage ?? i18n.language);
  const nextLanguage = currentLanguage === "fr" ? "en" : "fr";
  const changeLanguage = useCallback((lang: SupportedLocale) => {
    void i18n.changeLanguage(lang);
    // Preserve the current page, query parameters and anchor when switching.
    if (canLocalizeCurrentRoute) {
      navigate({ pathname: getLocalizedPath(lang, currentRoutePath), search: location.search, hash: location.hash }, { replace: true });
    }
  }, [canLocalizeCurrentRoute, currentRoutePath, i18n, navigate, location.search, location.hash]);

  useEffect(() => {
    document.documentElement.lang = getHtmlLang(getContentLocale(currentLanguage, currentRoutePath));
  }, [currentLanguage, currentRoutePath]);

  useEffect(() => {
    // Hidden shortcut: typing "bzh" enables the Breton locale without adding it to the main menu.
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat || event.isComposing) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        sequenceRef.current = "";
        return;
      }

      sequenceRef.current += event.key.toLowerCase();

      if (sequenceRef.current.includes("bzh")) {
        const sourceLanguage = getShortLocale(i18n.resolvedLanguage ?? i18n.language);
        setTakeover(current => current ?? { language: sourceLanguage === "bzh" ? "fr" : sourceLanguage });
        changeLanguage("bzh");
        sequenceRef.current = "";
      }

      if (sequenceRef.current.length > 10) {
        sequenceRef.current = sequenceRef.current.slice(-3);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [changeLanguage, i18n]);

  return (
    <div className="language-selector">
      {takeover && <BretonTakeover language={takeover.language} onComplete={dismissTakeover} />}
      <button
        type="button"
        className="lang-toggle lang-switch"
        aria-label={`${t("a11y.language_selector")} : ${t( nextLanguage === "en" ? "language_options.en" : "language_options.fr")}`}
        onClick={() => changeLanguage(nextLanguage)}
      >
        {currentLanguage === "bzh" ? <span className="is-current">BZH</span> : (
          <span className={currentLanguage === "fr" ? "is-current" : ""}>FR</span>
        )}
        <span aria-hidden="true" className="lang-switch-divider">/</span>
        <span className={currentLanguage === "en" ? "is-current" : ""}>EN</span>
      </button>
    </div>
  );
}

export default LanguageSelector;
