import { Container } from "react-bootstrap";
import { AiOutlineDownload } from "@react-icons/all-files/ai/AiOutlineDownload";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import ResumePreview from "./ResumePreview";
import "../../assets/styles/Resume/Resume.css";

function Resume() {
  const { t, i18n } = useTranslation();
  const reduceMotion = useReducedMotion();
  // Breton uses the French document, as there is no translated PDF.
  const language = i18n.resolvedLanguage?.startsWith("en") ? "EN" : "FR";
  const pdf = `/pdf/CV-Guerin-Theo-${language}.pdf`;

  return (
    <Container fluid className="resume-section">
      <Container>
        <motion.header
          className="resume-header"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div>
            <h1 className="resume-title">{t("my")} {t("cv")}</h1>
            <p className="resume-intro">{t("seo_routes.cv_description")}</p>
          </div>
          <a href={pdf} download className="resume-download">
            <AiOutlineDownload aria-hidden="true" />
            {t("downloadcv")} <span className="resume-file-type">PDF</span>
          </a>
        </motion.header>

        <section className="resume-viewer" aria-label={t("cv_alt_description")}>
          <div className="resume-toolbar">
            <span>{t("cv_alt_description")}</span>
            <span className="resume-format">PDF <span aria-hidden="true">/</span> {language}</span>
          </div>
          <ResumePreview key={pdf} file={pdf} />
        </section>
      </Container>
    </Container>
  );
}

export default Resume;
