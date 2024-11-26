import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from "@image/logo.webp";
import logoWhite from "@image/logo_white.webp"; 
import '@style/Easter/style_easter.css'; 
import '@style/Header/header.css';

function LogoImage({ isAnimating, t }) {
  const [showWhiteLogo, setShowWhiteLogo] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      // Change l'image après 5 secondes
      const logoTimeout = setTimeout(() => {
        setShowWhiteLogo(true);
      }, 5000);

      // Nettoie le timeout lorsque le composant est démonté
      return () => clearTimeout(logoTimeout);
    } else {
      // Si isAnimating est désactivé, remet le logo noir
      setShowWhiteLogo(false);
    }
  }, [isAnimating]);

  return (
    <motion.div
      className="logo-container"
      style={{ position: 'relative' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.img
        src={showWhiteLogo ? logoWhite : logo}
        alt={t('brand')}
        className="img-fluid logo"
        loading="lazy"
        decoding="async"
        style={{ width: '100%', height: 'auto' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export default LogoImage;
