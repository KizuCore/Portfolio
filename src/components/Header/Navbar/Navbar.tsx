import { JSX, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from "@react-icons/all-files/ai/AiOutlineHome";
import { AiOutlineFundProjectionScreen } from "@react-icons/all-files/ai/AiOutlineFundProjectionScreen";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { AiOutlineIdcard } from "@react-icons/all-files/ai/AiOutlineIdcard";
import { CgFileDocument } from "@react-icons/all-files/cg/CgFileDocument";
import LanguageSelector from "../LanguageSelector";
import Logo from "../Logo/LogoContainer";
import NavItem from "./NavItem";
import '../../../assets/styles/Easter/style_easter.css';
import '../../../assets/styles/Header/header.css';
import { FaRegEnvelope } from "@react-icons/all-files/fa/FaRegEnvelope";

// Constantes de timing
const FAST_CLICK_THRESHOLD = 500; // 0.5s = clic rapide
const LONG_CLICK_REDIRECT_DELAY = 9500; // 9.5 sec = long clic

// Hook personnalisé pour gérer les clics sur le logo
function useLogoNavigation(navigate: ReturnType<typeof useNavigate>) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLongClick, setIsLongClick] = useState(false);
  const [isClickValid, setIsClickValid] = useState(false); // Nouveau flag

  const redirectTimeoutRef = useRef<number | null>(null);
  const clickTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const handleMouseDown = () => {
    setIsAnimating(true);
    setIsClickValid(true); // Marque le clic comme valide
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

    if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    if (!isLongClick && isClickValid) {
      navigate("/");
    }

    setIsClickValid(false);
  };

  return { isAnimating, handleMouseDown, handleMouseUp };
}

function NavBar(): JSX.Element {
  const { t } = useTranslation();
  const [expand, setExpand] = useState(false);
  const [navColour, setNavColour] = useState(false);
  const navigate = useNavigate();

  const { isAnimating, handleMouseDown, handleMouseUp } = useLogoNavigation(navigate);

  useEffect(() => {
    const scrollHandler = () => {
      const shouldUseStickyStyle = window.scrollY >= 20;
      setNavColour((previous) => (previous === shouldUseStickyStyle ? previous : shouldUseStickyStyle));
    };

    scrollHandler();
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const navItems = [
    { to: "/", icon: <AiOutlineHome style={{ transform: "translateY(-2px)" }} />, label: t('home'), ariaLabel: t('home_aria') },
    { to: "/about", icon: <AiOutlineUser style={{ transform: "translateY(-2px)" }} />, label: t('about'), ariaLabel: t('about_aria') },
    { to: "/experience", icon: <AiOutlineIdcard style={{ transform: "translateY(-2px)" }} />, label: t('experience'), ariaLabel: t('about_experience') },
    { to: "/project", icon: <AiOutlineFundProjectionScreen style={{ transform: "translateY(-2px)" }} />, label: t('project'), ariaLabel: t('project_aria') },
    { to: "/contact", icon: <FaRegEnvelope style={{ transform: "translateY(-2px)" }} />, label: t('social'), ariaLabel: t('social') },
    { to: "/cv", icon: <CgFileDocument style={{ transform: "translateY(-2px)" }} />, label: t('cv'), ariaLabel: t('cv_aria') }
  ];

  return (
    <nav
      className={`navbar navbar-expand-md fixed-top ${navColour ? "sticky" : ""} ${expand ? "menu-open" : ""}`}
      aria-label={t("a11y.nav_menu_toggle", { defaultValue: "Navigation principale" })}
    >
      <div className="container">
        {/* Logo */}
        <div className="navbar-brand">
          <Logo
            isAnimating={isAnimating}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            t={t}
          />
        </div>

        {/* Burger menu */}
        <button
          type="button"
          className={`navbar-toggler ${expand ? "" : "collapsed"}`}
          aria-controls="responsive-navbar-nav"
          aria-label={t("a11y.nav_menu_toggle", { defaultValue: "Ouvrir ou fermer le menu" })}
          aria-expanded={expand}
          onClick={() => setExpand(!expand)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu */}
        <div id="responsive-navbar-nav" className={`collapse navbar-collapse${expand ? " show" : ""}`}>
          <ul className="navbar-nav ms-auto pt-2">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
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
