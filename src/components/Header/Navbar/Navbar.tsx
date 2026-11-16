import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "@react-icons/all-files/fi/FiArrowUpRight";
import { FiArrowRight } from "@react-icons/all-files/fi/FiArrowRight";
import { FiGrid } from "@react-icons/all-files/fi/FiGrid";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { FiBriefcase } from "@react-icons/all-files/fi/FiBriefcase";
import { FiFileText } from "@react-icons/all-files/fi/FiFileText";
import { FiMail } from "@react-icons/all-files/fi/FiMail";
import { FiGlobe } from "@react-icons/all-files/fi/FiGlobe";
import { FiHome } from "@react-icons/all-files/fi/FiHome";
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnDesktop = () => { if (desktop.matches) setExpand(false); };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setExpand(false);
        toggleButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleMenuKeyDown);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    const frame = window.requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleMenuKeyDown);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [expand]);

  // Construit les éléments de navigation selon la langue actuelle pour synchroniser les libellés et les chemins.
  const navItems = [
    { to: getLocalizedPath(currentLocale, "/"), label: t("home"), ariaLabel: t("home_aria"), icon: <FiHome /> },
    { to: getLocalizedPath(currentLocale, "/project"), label: t("project"), ariaLabel: t("project_aria"), icon: <FiGrid /> },
    { to: getLocalizedPath(currentLocale, "/about"), label: t("about"), ariaLabel: t("about_aria"), icon: <FiUser /> },
    {
      to: getLocalizedPath(currentLocale, "/experience"),
      label: t("experience"),
      ariaLabel: t("about_experience"),
      icon: <FiBriefcase />,
    },
  ];

  return (
    <>
    {expand && <div className="site-nav-backdrop" aria-hidden="true" />}
    <nav
      ref={navRef}
      className={`site-nav site-container ${navColour ? "is-scrolled" : ""} ${expand ? "menu-open" : ""}`}
      aria-label={t("a11y.main_navigation")}
    >
      <div className="site-nav-inner">
        <div className="site-nav-brand">
          <Logo
            isAnimating={isAnimating}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            handleMouseLeave={handleMouseLeave}
            t={t}
          />
          <Link
            to={getLocalizedPath(currentLocale, "/")}
            className="site-nav-brand-text site-nav-brand-home-btn"
            aria-label={t("home_aria")}
            onClick={(event) => {
              setExpand(false);
              if (location.pathname === getLocalizedPath(currentLocale, "/") && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }
            }}
          >
            <span>{SITE_PROFILE.brandName}</span>
            <span className="site-nav-brand-caption">{SITE_PROFILE.displayName}</span>
          </Link>
        </div>

        <button
          ref={toggleButtonRef}
          type="button"
          className="site-nav-toggle min-[900px]:hidden"
          aria-controls="responsive-site-nav-list"
          aria-label={t(expand ? "navigation_menu.close_label" : "navigation_menu.open_label")}
          aria-expanded={expand}
          onClick={() => setExpand(!expand)}
        >
          <span className="site-nav-toggle-label">{t(expand ? "navigation_menu.close" : "navigation_menu.label")}</span>
          <span className="site-nav-toggle-icon" aria-hidden="true"><span /><span /></span>
        </button>

        <div id="responsive-site-nav-list" className={`site-nav-menu min-[900px]:contents ${expand ? "block" : "hidden"}`} ref={menuRef}>
          <ul className="site-nav-links">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                label={item.label}
                onClick={() => setExpand(false)}
                ariaLabel={item.ariaLabel}
                icon={item.icon}
              />
            ))}
          </ul>
          <div className="site-nav-actions">
            <Link
              to={getLocalizedPath(currentLocale, "/cv")}
              className="site-nav-resume"
              aria-current={localizedPath.pathname === "/cv" ? "page" : undefined}
              onClick={() => setExpand(false)}
            ><span className="site-nav-mobile-icon" aria-hidden="true"><FiFileText /></span>{t("cv")}<FiArrowRight className="site-nav-mobile-arrow" aria-hidden="true" /></Link>
            <Link
              to={getLocalizedPath(currentLocale, "/contact")}
              className={`site-nav-link site-nav-contact${localizedPath.pathname === "/contact" ? " active" : ""}`}
              aria-current={localizedPath.pathname === "/contact" ? "page" : undefined}
              onClick={() => setExpand(false)}
            ><span className="site-nav-mobile-icon" aria-hidden="true"><FiMail /></span>{t("social")} <FiArrowUpRight size={16} aria-hidden="true" /></Link>
            <div className="site-nav-language">
              <span className="site-nav-language-label"><FiGlobe aria-hidden="true" />{t("navigation_menu.language")}</span>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}

export default NavBar;
