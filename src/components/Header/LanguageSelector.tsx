import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { FaAngleDown } from "@react-icons/all-files/fa/FaAngleDown";
import { FaAngleUp } from "@react-icons/all-files/fa/FaAngleUp";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../../assets/styles/Header/header.css";

type SupportedLanguage = "en" | "es" | "fr";
type LanguageCode = SupportedLanguage | "bzh";

const LANGUAGE_OPTIONS: ReadonlyArray<{ code: SupportedLanguage; label: string }> = [
  { code: "en", label: "English" },
  { code: "es", label: "Espanol" },
  { code: "fr", label: "Francais" },
];

const FLAG_SOURCES: Readonly<Record<LanguageCode, string>> = {
  en: "/images/flags/flag_en.svg",
  es: "/images/flags/flag_es.svg",
  fr: "/images/flags/flag_fr.svg",
  bzh: "/images/flags/flag_bzh.svg",
};

function LanguageSelector(): JSX.Element {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const sequenceRef = useRef("");
  const bannerTimeoutRef = useRef<number | null>(null);

  const changeLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!isOpen) {
        return;
      }

      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      sequenceRef.current += event.key.toLowerCase();

      if (sequenceRef.current.includes("bzh")) {
        changeLanguage("bzh");
        setShowBanner(true);
        sequenceRef.current = "";

        if (bannerTimeoutRef.current) {
          window.clearTimeout(bannerTimeoutRef.current);
        }
        bannerTimeoutRef.current = window.setTimeout(() => setShowBanner(false), 3000);
      }

      if (sequenceRef.current.length > 10) {
        sequenceRef.current = sequenceRef.current.slice(-3);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      if (bannerTimeoutRef.current) {
        window.clearTimeout(bannerTimeoutRef.current);
      }
    };
  }, [changeLanguage]);

  const detectedLanguageCode = i18n.language.slice(0, 2) as SupportedLanguage;
  const normalizedLanguage: LanguageCode = i18n.language.startsWith("bzh")
    ? "bzh"
    : (LANGUAGE_OPTIONS.some((option) => option.code === detectedLanguageCode) ? detectedLanguageCode : "en");
  const currentLanguage = normalizedLanguage.toUpperCase();

  const renderFlag = (langCode: LanguageCode, className = "lang-flag") => {
    const src = FLAG_SOURCES[langCode] ?? FLAG_SOURCES.en;
    return <img src={src} className={className} alt={t(`flag_${langCode}`)} />;
  };

  return (
    <>
      <div className={`language-selector${isOpen ? " show" : ""}`} ref={dropdownRef}>
        <button
          type="button"
          id="language-selector-toggle"
          className="lang-toggle"
          aria-label={t("a11y.language_selector", { defaultValue: "Choose language" })}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={() => setIsOpen((previousValue) => !previousValue)}
        >
          <span className="lang-flag-wrap">{renderFlag(normalizedLanguage)}</span>
          <span className="lang-code">{currentLanguage}</span>
          <span className="lang-chevron" aria-hidden="true">
            {isOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </button>

        {isOpen ? (
          <div className="lang-menu" role="menu" aria-labelledby="language-selector-toggle">
            {LANGUAGE_OPTIONS.map((option) => {
              const isActive = normalizedLanguage === option.code;

              return (
                <button
                  type="button"
                  key={option.code}
                  role="menuitemradio"
                  aria-checked={isActive}
                  className={`lang-item${isActive ? " is-active active" : ""}`}
                  onClick={() => {
                    changeLanguage(option.code);
                    setIsOpen(false);
                  }}
                >
                  <span className="lang-item-flag">{renderFlag(option.code, "lang-flag")}</span>
                  <span className="lang-item-code">{option.code.toUpperCase()}</span>
                  <span className="lang-item-label">{option.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="easter-egg-banner"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
          >
            BZH mode active !
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default LanguageSelector;
