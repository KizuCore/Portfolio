import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguageSelector from "../LanguageSelector";
import Logo from "../Logo/LogoContainer";
import NavItem from "./NavItem";
import { getLocalizedPath, getShortLocale, splitLocalizedPath } from "../../../config/seo";
import { SITE_PROFILE } from "../../../config/site";
import "../../../assets/styles/Easter/style_easter.css";
import "../../../assets/styles/Header/Navigation.css";

// Durées de l’interaction cachée déclenchée par un appui long sur le logo.
const FAST_CLICK_THRESHOLD = 500;
const LONG_CLICK_REDIRECT_DELAY = 9500;
const MENU_FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

// Isole l’interaction cachée du logo de l’état visuel de la barre de navigation.
function useLogoNavigation(navigate: ReturnType<typeof useNavigate>, homePath: string) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLongClick, setIsLongClick] = useState(false);
  const [isClickValid, setIsClickValid] = useState(false);

  const redirectTimeoutRef = useRef<number | null>(null);
  const clickTimeoutRef = useRef<number | null>(null);

  const clearLogoTimers = useCallback(() => {
    if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
  }, []);

  useEffect(() => {
    return clearLogoTimers;
  }, [clearLogoTimers]);

  const handleMouseDown = () => {
    setIsAnimating(true);
    setIsClickValid(true);
    setIsLongClick(false);

    clickTimeoutRef.current = window.setTimeout(() => {
      setIsLongClick(true);
      redirectTimeoutRef.current = window.setTimeout(() => {
        navigate("/arcane");
      }, LONG_CLICK_REDIRECT_DELAY);
    }, FAST_CLICK_THRESHOLD);
  };

  const handleMouseUp = () => {
    setIsAnimating(false);

    clearLogoTimers();

    if (!isLongClick && isClickValid) {
      navigate(homePath);
    }

    setIsClickValid(false);
  };

  const handleMouseLeave = () => {
    setIsAnimating(false);
    setIsLongClick(false);
    setIsClickValid(false);
    clearLogoTimers();
  };

  return { isAnimating, handleMouseDown, handleMouseUp, handleMouseLeave };
}

function NavBar(): JSX.Element {
  const { i18n, t } = useTranslation();
  const [expand, setExpand] = useState(false);
  const [navColour, setNavColour] = useState(() => window.scrollY >= 20);
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const localizedPath = splitLocalizedPath(location.pathname);
  const currentLocale = localizedPath.locale ?? getShortLocale(i18n.resolvedLanguage ?? i18n.language ?? "fr");

  const { isAnimating, handleMouseDown, handleMouseUp, handleMouseLeave } = useLogoNavigation(navigate, getLocalizedPath(currentLocale, "/"));

  useEffect(() => {
    // La classe sticky change uniquement lorsque le seuil de défilement est franchi.
    const scrollHandler = () => {
      const shouldUseStickyStyle = window.scrollY >= 20;
      setNavColour((previous) => (previous === shouldUseStickyStyle ? previous : shouldUseStickyStyle));
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    // Ferme le menu mobile après une navigation, y compris avec les boutons précédent et suivant du navigateur.
    setExpand(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!expand) {
      return;
    }

    const getFocusableMenuItems = () =>
      Array.from(navRef.current?.querySelectorAll<HTMLElement>(MENU_FOCUSABLE_SELECTOR) ?? []).filter(
        (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1 && element.getClientRects().length > 0
      );

    // Maintient le focus dans le menu mobile ouvert jusqu’à sa fermeture.
    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpand(false);
        toggleButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableItems = getFocusableMenuItems();
      if (focusableItems.length === 0) {
        return;
      }

      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => { if (desktop.matches) setExpand(false); };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) setExpand(false);
    };
    window.addEventListener("keydown", handleMenuKeyDown);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    const frame = window.requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus());

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleMenuKeyDown);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [expand]);

  // Construit les éléments de navigation selon la langue actuelle pour synchroniser les libellés et les chemins.
  const navItems = [
    { to: getLocalizedPath(currentLocale, "/project"), label: t("project"), ariaLabel: t("project_aria") },
    { to: getLocalizedPath(currentLocale, "/about"), label: t("about"), ariaLabel: t("about_aria") },
    {
      to: getLocalizedPath(currentLocale, "/experience"),
      label: t("experience"),
      ariaLabel: t("about_experience"),
    },
  ];

  return (
    <nav
      ref={navRef}
      className={`navbar navbar-polished navbar-expand-md fixed-top ${navColour ? "sticky" : ""} ${expand ? "menu-open" : ""}`}
      aria-label={t("a11y.main_navigation")}
    >
      <div className="container">
        <div className="navbar-brand">
          <Logo
            isAnimating={isAnimating}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            handleMouseLeave={handleMouseLeave}
            t={t}
          />
          <Link
            to={getLocalizedPath(currentLocale, "/")}
            className="navbar-brand-text navbar-brand-home-btn"
            aria-label={t("home_aria")}
            onClick={(event) => {
              setExpand(false);
              if (location.pathname === getLocalizedPath(currentLocale, "/") && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }
            }}
          >
            {SITE_PROFILE.brandName}
          </Link>
        </div>

        <button
          ref={toggleButtonRef}
          type="button"
          className={`navbar-toggler ${expand ? "" : "collapsed"}`}
          aria-controls="responsive-navbar-nav"
          aria-label={t("a11y.nav_menu_toggle")}
          aria-expanded={expand}
          onClick={() => setExpand(!expand)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div id="responsive-navbar-nav" className={`collapse navbar-collapse${expand ? " show" : ""}`} ref={menuRef}>
          <ul className="navbar-nav navbar-menu-items">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                label={item.label}
                onClick={() => setExpand(false)}
                ariaLabel={item.ariaLabel}
              />
            ))}
            <NavItem
              to={getLocalizedPath(currentLocale, "/contact")}
              label={t("social")}
              ariaLabel={t("social")}
              onClick={() => setExpand(false)}
              prominent
            />
            <li className="nav-item">
              <LanguageSelector />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
