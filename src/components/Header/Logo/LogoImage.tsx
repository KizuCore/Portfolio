import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import logo from "@image/logodev.svg";
import '../../../assets/styles/Easter/style_easter.css';
import '../../../assets/styles/Header/Navigation.css';

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
    <m.div
      className="logo-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <m.img
        src={logo}
        width={64}
        height={64}
        alt={t('brand')}
        className={`img-fluid logo ${showWhiteLogo ? "logo-turn-white" : ""}`}
        loading="eager"
        decoding="async"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </m.div>
  );
}

export default LogoImage;
