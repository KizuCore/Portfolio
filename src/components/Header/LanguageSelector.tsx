import { JSX, useCallback, useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Flag from "react-world-flags";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../../assets/styles/Header/header.css";

type SupportedLanguage = "en" | "es" | "fr";

const LANGUAGE_OPTIONS: ReadonlyArray<{ code: SupportedLanguage; label: string }> = [
  { code: "en", label: "English" },
  { code: "es", label: "Espanol" },
  { code: "fr", label: "Francais" },
];

function LanguageSelector(): JSX.Element {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
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

  const normalizedLanguage = i18n.language.startsWith("bzh") ? "bzh" : i18n.language.slice(0, 2);
  const currentLanguage = normalizedLanguage.toUpperCase();

  const renderFlag = (langCode: string, className = "lang-flag") => {
    if (langCode === "bzh") {
      return <img src="/images/flags/flag_bzh.svg" className={className} alt={t("flag_bzh")} />;
    }

    const code = langCode === "fr" ? "FR" : langCode === "es" ? "ES" : "GB";
    return <Flag code={code} className={className} alt={t(`flag_${langCode}`)} />;
  };

  return (
    <>
      <Dropdown className="language-selector" align="end" onToggle={(nextShow) => setIsOpen(nextShow)}>
        <Dropdown.Toggle
          variant="secondary"
          id="language-selector-toggle"
          className="lang-toggle"
          aria-label={t("a11y.language_selector", { defaultValue: "Choose language" })}
        >
          <span className="lang-flag-wrap">{renderFlag(normalizedLanguage)}</span>
          <span className="lang-code">{currentLanguage}</span>
          <span className="lang-chevron" aria-hidden="true">
            {isOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu className="lang-menu">
          {LANGUAGE_OPTIONS.map((option) => {
            const isActive = normalizedLanguage === option.code;

            return (
              <Dropdown.Item
                key={option.code}
                className={`lang-item${isActive ? " is-active" : ""}`}
                active={isActive}
                onClick={() => {
                  changeLanguage(option.code);
                  setIsOpen(false);
                }}
              >
                <span className="lang-item-flag">{renderFlag(option.code, "lang-flag")}</span>
                <span className="lang-item-code">{option.code.toUpperCase()}</span>
                <span className="lang-item-label">{option.label}</span>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>

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
