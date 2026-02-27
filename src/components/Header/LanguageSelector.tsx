import { JSX, useEffect, useState, Suspense, useRef, useCallback } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import "../../assets/styles/Header/header.css";
import { Spinner } from "react-bootstrap";
import Flag from "react-world-flags";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Sélecteur de langue avec Easter Egg "BZH mode".
 * - Permet de changer la langue (FR/EN/ES)
 * - Active le mode "BZH" quand l'utilisateur tape "bzh" au clavier
 * - Affiche un petit bandeau animé lors de l'activation
 */
function LanguageSelector(): JSX.Element {
  const { i18n, t } = useTranslation(); // Hook i18next
  const [isOpen, setIsOpen] = useState(false); // état du dropdown
  const [showBanner, setShowBanner] = useState(false); // affichage du bandeau BZH
  const sequence = useRef(""); // stocke la séquence de touches tapées

  /**
   * Fonction stable (via useCallback) pour changer de langue.
   * -> empêche la création d'une nouvelle référence à chaque rendu
   * -> évite les warnings ESLint dans les useEffect
   */
  const changeLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
  }, [i18n]);

  /**
   * Effet 1 : Met à jour l’attribut <html lang="...">
   * Chaque fois que la langue change, on synchronise le DOM.
   * (Cette partie est indépendante du listener clavier.)
   */
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  /**
   * Effet 2 : Détecte la séquence "bzh" au clavier.
   * - On attache un seul listener global sur window.
   * - Lorsqu'on tape "bzh", on active la langue et on affiche la bannière.
   */
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      sequence.current += e.key.toLowerCase();

      // Si la séquence contient "bzh", on active le mode Breton
      if (sequence.current.includes("bzh")) {
        changeLanguage("bzh");
        try {
          localStorage.setItem("i18nextLng", "bzh"); // persiste la langue
        } catch {
          // Ignorer les erreurs d'accès au localStorage
        }
        setShowBanner(true);
        sequence.current = "";

        // Cache la bannière après 3 secondes
        setTimeout(() => setShowBanner(false), 3000);
      }

      // Garde uniquement les 3 derniers caractères pour éviter une string trop longue
      if (sequence.current.length > 10) {
        sequence.current = sequence.current.slice(-3);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [changeLanguage]); // dépend seulement de la fonction stable

  /**
   * Langue courante (supporte "bzh")
   */
  const lang = i18n.language.slice(0, 3);
  const currentLanguage = lang.toUpperCase();

  /**
   * Rend le bon drapeau selon la langue
   * - "bzh" → image personnalisée
   * - autres → composant react-world-flags
   */
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

    // Mapping simple FR/ES/EN -> code ISO
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

  /**
   * Rendu principal
   */
  return (
    <>
      {/* === Sélecteur de langue (Dropdown Bootstrap) === */}
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
            {renderFlag(lang)} {currentLanguage}{" "}
            {isOpen ? (
              <FaAngleUp style={{ marginBottom: "3px" }} />
            ) : (
              <FaAngleDown style={{ marginBottom: "3px" }} />
            )}
          </Suspense>
        </Dropdown.Toggle>

        <Dropdown.Menu>
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

      {/* === Bannière d'easter egg "BZH mode" === */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="easter-egg-banner"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
          >
            🎉 BZH mode activé !
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default LanguageSelector;
