import React, { useEffect, Suspense } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import '../../Assets/style/Header/header.css';
import { Spinner } from 'react-bootstrap';

// Chargement différé des composants Flag et FaAngleDown
const Flag = React.lazy(() => import('react-world-flags'));
const FaAngleDown = React.lazy(() => import('react-icons/fa').then(module => ({ default: module.FaAngleDown })));

function LanguageSelector() {
  const { i18n, t } = useTranslation();
  
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  // MAJ balise <html lang="">
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const currentLanguage = i18n.language === "fr" ? "FR" : "EN";
  const flagCode = i18n.language === "fr" ? "FR" : "GB";

  return (
    <Dropdown className="language-selector">
      <Dropdown.Toggle variant="secondary" id="dropdown-basic" aria-label="Language Selector">
        <Suspense fallback={<Spinner animation="border" role="status" />}>
          <Flag
            code={flagCode}
            height="auto"
            width="25"
            style={{ marginBottom: "2px" }}
            alt={t(`flag_${i18n.language}`)}
          />
          {' '}
          {currentLanguage} <FaAngleDown />
        </Suspense>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage("en")}>
          <Suspense fallback={<Spinner animation="border" role="status" />}>
            <Flag code="GB" width="25" height="auto" style={{ marginRight: "10px" }} alt={t("flag_en")} />
          </Suspense>
          EN
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("fr")}>
          <Suspense fallback={<Spinner animation="border" role="status" />}>
            <Flag code="FR" width="25" height="auto" style={{ marginRight: "10px" }} alt={t("flag_fr")} />
          </Suspense>
          FR
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;
