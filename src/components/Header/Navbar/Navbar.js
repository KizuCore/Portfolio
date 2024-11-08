import React, { useState, useEffect, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { AiOutlineHome, AiOutlineFundProjectionScreen, AiOutlineUser } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import LanguageSelector from "../LanguageSelector";
import Logo from "../Logo/LogoContainer";
import NavItem from "./NavItem";
import '../../../Assets/style/Easter/style_easter.css'; 
import '../../../Assets/style/Header/header.css';

// Constantes de timing
const FAST_CLICK_THRESHOLD = 500; // 0.5s = clic rapide
const LONG_CLICK_REDIRECT_DELAY = 9500; // 9.5 sec = long clic

// Hook personnalisé pour gérer les clics sur le logo
function useLogoNavigation(navigate) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLongClick, setIsLongClick] = useState(false);
  const redirectTimeoutRef = useRef(null); // Réf pour tempo de redirection
  const clickTimeoutRef = useRef(null);    // Réf pour détecter clics rapides

  useEffect(() => {
    // Nettoyage automatique
    return () => {
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const handleMouseDown = () => {
    setIsAnimating(true);
    setIsLongClick(false);

    // Démarre tempo pour différencier clic rapide / clic maintenu
    clickTimeoutRef.current = setTimeout(() => {
      setIsLongClick(true); // Clic maintenu
      redirectTimeoutRef.current = setTimeout(() => {
        navigate("/route"); // Redirection après 9.5s pour long clic
      }, LONG_CLICK_REDIRECT_DELAY);
    }, FAST_CLICK_THRESHOLD);
  };

  const handleMouseUp = () => {
    setIsAnimating(false);

    // Annule les tempo pour long clic
    if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    // Accueil si clic rapide
    if (!isLongClick) navigate("/");
  };

  return { isAnimating, handleMouseDown, handleMouseUp };
}

function NavBar() {
  const { t } = useTranslation();
  const [expand, setExpand] = useState(false); // Etat du menu hamburger
  const [navColour, setNavColour] = useState(false); // Change la couleur navbar en fonction du scroll
  const navigate = useNavigate();
  
  // Hook personnalisé pour gérer clics sur le logo
  const { isAnimating, handleMouseDown, handleMouseUp } = useLogoNavigation(navigate);

  useEffect(() => {
    // Gère couleur navbar lors du défilement
    const scrollHandler = () => setNavColour(window.scrollY >= 20);
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Liste éléments navigation
  const navItems = [
    { to: "/", icon: <AiOutlineHome />, label: t('home'), ariaLabel: t('home_aria') },
    { to: "/about", icon: <AiOutlineUser />, label: t('about'), ariaLabel: t('about_aria') },
    { to: "/project", icon: <AiOutlineFundProjectionScreen />, label: t('project'), ariaLabel: t('project_aria') },
    { to: "/cv", icon: <CgFileDocument />, label: t('cv'), ariaLabel: t('cv_aria') }
  ];

  return (
    <Navbar expanded={expand} fixed="top" expand="md" className={navColour ? "sticky" : "navbar"}>
      <Container>
        {/* Logo avec animation et gestion clic */}
        <Navbar.Brand>
          <Logo
            isAnimating={isAnimating}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            t={t}
          />
        </Navbar.Brand>

        {/* Bouton menu hamburger */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpand(!expand)}>
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        {/* Menu navigation */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
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
            {/* Sélecteur langue */}
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
