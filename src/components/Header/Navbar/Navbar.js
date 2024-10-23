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
import '../../Easter/style/style_easter.css';

function NavBar() {
  const { t } = useTranslation();
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const redirectTimeoutRef = useRef(null);

  useEffect(() => {
    function scrollHandler() {
      if (window.scrollY >= 20) {
        updateNavbar(true);
      } else {
        updateNavbar(false);
      }
    }

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const handleMouseDown = () => {
    setIsAnimating(true);
    redirectTimeoutRef.current = setTimeout(() => {
      navigate("/route");
    }, 10000);
  };

  const handleMouseUp = () => {
    setIsAnimating(false);
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }
  };

  return (
    <Navbar expanded={expand} fixed="top" expand="md" className={navColour ? "sticky" : "navbar"}>
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <Logo isAnimating={isAnimating} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} t={t} />
        </Navbar.Brand>
        { /* Menu Hamburger */ }
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => updateExpanded(!expand)}>
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            {/* Route */}
            <NavItem to="/" icon={<AiOutlineHome style={{ marginBottom: "2px" }} />} label={t('home')} onClick={() => updateExpanded(false)} ariaLabel={t('home_aria')} />
            <NavItem to="/about" icon={<AiOutlineUser style={{ marginBottom: "2px" }} />} label={t('about')} onClick={() => updateExpanded(false)} ariaLabel={t('about_aria')} />
            <NavItem to="/project" icon={<AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} />} label={t('project')} onClick={() => updateExpanded(false)} ariaLabel={t('project_aria')} />
            <NavItem to="/cv" icon={<CgFileDocument style={{ marginBottom: "2px" }} />} label={t('cv')} onClick={() => updateExpanded(false)} ariaLabel={t('cv_aria')} />

            {/* Langage */}
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
