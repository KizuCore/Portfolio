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

  const lang = i18n.language.slice(0, 2);
  const currentLanguage = lang.toUpperCase();
  const flagCode = lang === "fr" ? "FR" : lang === "es" ? "ES" : "GB";

  return (
    <Dropdown
      className="language-selector"
      onToggle={(nextShow) => setIsOpen(nextShow)}
    >
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        aria-label="Language Selector"
      >
        <Suspense fallback={<Spinner animation="border" role="status" />}>
          <Flag
            code={flagCode}
            height="auto"
            width="25"
            style={{ marginBottom: "4px" }}
            alt={t(`flag_${lang}`)}
          />
          {' '}
          {currentLanguage}{" "}
          {isOpen ? <FaAngleUp style={{ marginBottom: "3px" }} /> : <FaAngleDown style={{ marginBottom: "3px" }} />}
        </Suspense>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage("en")}>
          <Suspense fallback={<Spinner animation="border" role="status" />}>
            <Flag
              code="GB"
              width="25"
              height="auto"
              style={{ marginRight: "8px", marginBottom: "3px" }}
              alt={t("flag_en")}
            />
          </Suspense>
          EN
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("fr")}>
          <Suspense fallback={<Spinner animation="border" role="status" />}>
            <Flag
              code="FR"
              width="25"
              height="auto"
              style={{ marginRight: "8px", marginBottom: "3px" }}
              alt={t("flag_fr")}
            />
          </Suspense>
          FR
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("es")}>
          <Suspense fallback={<Spinner animation="border" role="status" />}>
            <Flag
              code="ES"
              width="25"
              height="auto"
              style={{ marginRight: "8px", marginBottom: "3px" }}
              alt={t("flag_es")}
            />
          </Suspense>
          ES
        </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;
