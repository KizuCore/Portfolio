import { JSX, useEffect, useState, Suspense } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import "../../assets/styles/Header/header.css";
import { Spinner } from "react-bootstrap";
import Flag from 'react-world-flags';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function LanguageSelector(): JSX.Element {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const lang = i18n.language.slice(0, 3); // supporte "bzh"
  const currentLanguage = lang.toUpperCase();

  // === Composant pour afficher le bon drapeau
  const renderFlag = (langCode: string) => {
    if (langCode === "bzh") {
      return (
        <img
          src="/images/flags/flag_bzh.svg"
          width="25"
          height="auto"
          style={{ marginBottom: "4px" }}
          alt={t("flag_bzh")}
        />
      );
    }

    const code = langCode === "fr" ? "FR" : langCode === "es" ? "ES" : "GB";
    return (
      <Flag
        code={code}
        width="25"
        height="auto"
        style={{ marginBottom: "4px" }}
        alt={t(`flag_${langCode}`)}
      />
    );
  };

  return (
    <Dropdown
      className="language-selector pb-4 pt-2 pb-md-0 pt-md-0"
      onToggle={(nextShow) => setIsOpen(nextShow)}
    >
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        aria-label="Language Selector"
      >
        <Suspense fallback={<Spinner animation="border" role="status" />}>
          {renderFlag(lang)}{" "}
          {currentLanguage}{" "}
          {isOpen ? <FaAngleUp style={{ marginBottom: "3px" }} /> : <FaAngleDown style={{ marginBottom: "3px" }} />}
        </Suspense>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage("bzh")}>
          {renderFlag("bzh")} BZH
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("en")}>
          {renderFlag("en")} EN
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("es")}>
          {renderFlag("es")} ES
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("fr")}>
          {renderFlag("fr")} FR
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;
