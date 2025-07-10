import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from "@image/logodev.svg";
import logoWhite from "@image/logodevwhite.svg"; 
import '../../../assets/styles/Easter/style_easter.css'; 
import '../../../assets/styles/Header/header.css';

interface LogoImageProps {
  isAnimating: boolean;
  t: (key: string) => string;
}

function LogoImage({ isAnimating, t }: LogoImageProps) {
  const [showWhiteLogo, setShowWhiteLogo] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const logoTimeout = setTimeout(() => {
        setShowWhiteLogo(true);
      }, 5000);
      return () => clearTimeout(logoTimeout);
    } else {
      setShowWhiteLogo(false);
    }
  }, [isAnimating]);

  return (
    <motion.div
      className="logo-container"
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export default LogoImage;
