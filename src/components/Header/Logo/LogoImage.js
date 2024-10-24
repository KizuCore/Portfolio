import React, { useEffect, useState } from 'react';
import logo from "../../../Assets/images/logo.webp";
import logoWhite from "../../../Assets/images/logo_white.webp"; 
import '../../Easter/style/style_easter.css'

function LogoImage({ isAnimating, t }) {
  const [isLogoWhite, setIsLogoWhite] = useState(false);

  useEffect(() => {
    let logoTimeout;

    if (isAnimating) {
      logoTimeout = setTimeout(() => {
        setIsLogoWhite(true); // Affiche logo blanc après 5s
      }, 5000);
    } else {
      // Remettre logo noir
      setIsLogoWhite(false);
    }

    return () => {
      if (logoTimeout) {
        clearTimeout(logoTimeout);
      }
    };
  }, [isAnimating]); 

  return (
    <>
      {/* Logo noir */}
      <img src={logo} className={`img-fluid logo ${isLogoWhite ? 'fade-out' : 'fade-in'}`} alt={t('brand')} />
      {/* Logo blanc */}
      <img src={logoWhite} className={`img-fluid logo logo-white ${isLogoWhite ? 'fade-in' : 'fade-out'}`} alt={t('brand')} />
    </>
  );
}

export default LogoImage;
