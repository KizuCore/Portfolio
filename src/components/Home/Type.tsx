import { JSX, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Typewriter from "typewriter-effect";
import '../../assets/styles/Home/Home.css'; 

function TypeDev(): JSX.Element {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const strings = [
    isMobile ? t('fullstack_developer_phone') : t('fullstack_developer'),
    t('frontend_developer'),
    t('backend_developer'),
  ];

  return (
    <div aria-live="polite" className="typedev">
      <span style={{ display: "none" }}>
        Fullstack Developer, Frontend Developer, Backend Developer
      </span>

      <Typewriter
        options={{
          strings,
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      />
    </div>
  );
}

export default TypeDev;
