import React from "react";
import { useTranslation } from 'react-i18next';
import Typewriter from "typewriter-effect";
import '../../Assets/style/Home/Home.css'; 

function Type() {
  const { t } = useTranslation();

  return (
    <div aria-live="polite">
      {/* SEO */}
      <span style={{ display: "none" }}>
        Fullstack Developer, Frontend Developer, Backend Developer
      </span>

      <Typewriter
        options={{
          strings: [
            t('fullstack_developer'),
            t('frontend_developer'),
            t('backend_developer'),
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      />
    </div>
  );
}

export default Type;
