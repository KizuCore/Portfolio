import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { FiBriefcase } from "@react-icons/all-files/fi/FiBriefcase";
import { FiFileText } from "@react-icons/all-files/fi/FiFileText";
import { FiFolder } from "@react-icons/all-files/fi/FiFolder";
import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiMail } from "@react-icons/all-files/fi/FiMail";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import LanguageSelector from "../LanguageSelector";
import Logo from "../Logo/LogoContainer";
import NavItem from "./NavItem";
import { getLocalizedPath, getShortLocale, splitLocalizedPath } from "../../../config/seo";
import { SITE_PROFILE } from "../../../config/site";
import "../../../assets/styles/Easter/style_easter.css";
import "../../../assets/styles/Header/header.css";

// Timing values for the hidden long-press logo interaction.
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

// Keeps the hidden logo interaction isolated from the visual navbar state.
function useLogoNavigation(navigate: ReturnType<typeof useNavigate>) {
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
      navigate("/");
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
  const [navColour, setNavColour] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const localizedPath = splitLocalizedPath(location.pathname);
  const currentLocale = localizedPath.locale ?? getShortLocale(i18n.resolvedLanguage ?? i18n.language ?? "fr");

  const { isAnimating, handleMouseDown, handleMouseUp, handleMouseLeave } = useLogoNavigation(navigate);

  useEffect(() => {
    const scrollHandler = () => {
      const shouldUseStickyStyle = window.scrollY >= 20;
      setNavColour((previous) => (previous === shouldUseStickyStyle ? previous : shouldUseStickyStyle));
    };

    scrollHandler();
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    setExpand(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!expand) {
      return;
    }

    const getFocusableMenuItems = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>(MENU_FOCUSABLE_SELECTOR) ?? []).filter(
        (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1
      );

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

    window.addEventListener("keydown", handleMenuKeyDown);
    window.requestAnimationFrame(() => getFocusableMenuItems()[0]?.focus());

    return () => window.removeEventListener("keydown", handleMenuKeyDown);
  }, [expand]);

  const navItems = [
    { to: getLocalizedPath(currentLocale, "/"), icon: <FiHome />, label: t("home"), ariaLabel: t("home_aria") },
    { to: getLocalizedPath(currentLocale, "/about"), icon: <FiUser />, label: t("about"), ariaLabel: t("about_aria") },
    {
      to: getLocalizedPath(currentLocale, "/experience"),
      icon: <FiBriefcase />,
      label: t("experience"),
      ariaLabel: t("about_experience"),
    },
    { to: getLocalizedPath(currentLocale, "/project"), icon: <FiFolder />, label: t("project"), ariaLabel: t("project_aria") },
    { to: getLocalizedPath(currentLocale, "/contact"), icon: <FiMail />, label: t("social"), ariaLabel: t("social") },
    { to: getLocalizedPath(currentLocale, "/cv"), icon: <FiFileText />, label: t("cv"), ariaLabel: t("cv_aria") },
  ];

  return (
    <nav
      className={`navbar navbar-expand-md fixed-top ${navColour ? "sticky" : ""} ${expand ? "menu-open" : ""}`}
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
          <button
            type="button"
            className="navbar-brand-text navbar-brand-home-btn"
            aria-label={t("home_aria")}
            onClick={() => {
              setExpand(false);
              navigate(getLocalizedPath(currentLocale, "/"));
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
          >
            {SITE_PROFILE.brandName}
          </button>
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
                icon={item.icon}
                label={item.label}
                onClick={() => setExpand(false)}
                ariaLabel={item.ariaLabel}
              />
            ))}
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
