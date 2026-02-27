import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineArrowUp } from "react-icons/ai";

function BackToTop() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 520);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("a11y.back_to_top", { defaultValue: "Retour en haut" })}
    >
      <AiOutlineArrowUp aria-hidden="true" />
    </button>
  );
}

export default BackToTop;
