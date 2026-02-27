import { JSX, useState, useEffect, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { AiOutlineHome, AiOutlineFundProjectionScreen, AiOutlineUser, AiOutlineIdcard } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import LanguageSelector from "../LanguageSelector";
import Logo from "../Logo/LogoContainer";
import NavItem from "./NavItem";
import '../../../assets/styles/Easter/style_easter.css';
import '../../../assets/styles/Header/header.css';
import { FaRegEnvelope } from "react-icons/fa";

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
    const scrollHandler = () => setNavColour(window.scrollY >= 20);
    window.addEventListener("scroll", scrollHandler);
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
    <Navbar expanded={expand} fixed="top" expand="md" className={`${navColour ? "sticky" : "navbar"} ${expand ? "menu-open" : ""}`}>
      <Container>
        {/* Logo */}
        <Navbar.Brand>
          <Logo
            isAnimating={isAnimating}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            t={t}
          />
        </Navbar.Brand>

        {/* Burger menu */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          aria-label={t("a11y.nav_menu_toggle", { defaultValue: "Ouvrir ou fermer le menu" })}
          aria-expanded={expand}
          onClick={() => setExpand(!expand)}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        {/* Menu */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto pt-2" defaultActiveKey="#home">
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
            <Nav.Item>
              <LanguageSelector />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
