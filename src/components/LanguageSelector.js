import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Flag from 'react-world-flags';
import { FaAngleDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Dropdown className="language-selector">
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        <Flag code={i18n.language === "fr" ? "FR" : "GB"} height="auto" width="25" style={{ marginBottom: "2px" }} />{' '}
        {i18n.language === "fr" ? "FR" : "EN"} <FaAngleDown />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage("en")}>
          <Flag code="GB" width="25" height="auto" style={{ marginRight: "10px" }} /> EN
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("fr")}>
          <Flag code="FR" width="25" height="auto" style={{ marginRight: "10px" }} /> FR
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;
