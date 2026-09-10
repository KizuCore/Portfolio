import { lazy, Suspense, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineDownload } from "@react-icons/all-files/ai/AiOutlineDownload";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "@react-icons/all-files/fi/FiArrowUpRight";
import { FiMapPin } from "@react-icons/all-files/fi/FiMapPin";
import { getLocalizedPath, getShortLocale } from "../../config/seo";
import { SITE_PROFILE, SOCIAL_LINKS, RESUME_SKILL_GROUPS, RESUME_EDUCATION_IDS, PORTFOLIO_PROJECTS } from "../../data/portfolio";
import "../../assets/styles/Resume/Resume.css";

const ResumePreview = lazy(() => import("./ResumePreview"));
const flambowVideo = PORTFOLIO_PROJECTS.find(project => project.imageKey === "flambowFrontend")?.youtubeLink;

function Resume() {
  const { t, i18n } = useTranslation();
  const [previewOpen, setPreviewOpen] = useState(false);
  const locale = getShortLocale(i18n.resolvedLanguage || "fr");
  // Breton uses the French document, as there is no translated PDF.
  const language = i18n.resolvedLanguage?.startsWith("en") ? "EN" : "FR";
  const pdf = `/pdf/CV-Guerin-Theo-${language}.pdf`;
  const highlights = t("resume_page.missions").split("||").map(value => value.trim()).filter(Boolean);

  return (
    <Container fluid className="resume-section">
      <Container>
        <header className="resume-header">
          <div className="resume-identity">
            <p className="resume-eyebrow">{t("resume_page.eyebrow")}</p>
            <h1 className="resume-title">{SITE_PROFILE.displayName}</h1>
            <p className="resume-role">{t("resume_page.role")}</p>
            <p className="resume-intro">{t("resume_page.intro")}</p>
            <p className="resume-location"><FiMapPin aria-hidden="true" />{t("contact_meta_location_value")}</p>
          </div>
          <div className="resume-header-actions">
            <a href={pdf} download className="resume-download">
              <AiOutlineDownload aria-hidden="true" />
              {t("downloadcv")} <span className="resume-file-type">PDF · {language}</span>
            </a>
            <Link to={getLocalizedPath(locale, "/contact")} className="resume-contact-link">{t("resume_page.contact")} <FiArrowUpRight aria-hidden="true" /></Link>
          </div>
        </header>

        <div className="resume-layout">
          <div className="resume-main">
            <section aria-labelledby="resume-work-title">
              <h2 id="resume-work-title" className="resume-section-title"><span aria-hidden="true">01</span>{t("career.work")}</h2>
              <article className="resume-work-card">
                <p className="resume-date">{t("experience_1_date")}</p>
                <h3>{t("experience_1_title")}</h3>
                <p className="resume-organization">{t("experience_1_subtitle")}</p>
                <div className="resume-impact">
                  <p><span>10 min</span><span aria-hidden="true">→</span><strong>~10 s</strong></p>
                  <span>{t("resume_page.impact")}</span>
                </div>
                <ul className="resume-missions">{highlights.map(point => <li key={point}>{point}</li>)}</ul>
                <Link to={getLocalizedPath(locale, "/experience")} className="resume-text-link">{t("resume_page.full_journey")} <FiArrowUpRight aria-hidden="true" /></Link>
              </article>
              <article className="resume-project-card">
                <p className="resume-date">{t("resume_page.project_label")}</p>
                <h3>Flambow</h3>
                <p>{t("resume_page.flambow")}</p>
                <div className="resume-project-links">
                  {flambowVideo && <a href={flambowVideo} target="_blank" rel="noopener noreferrer" className="resume-text-link">{t("resume_page.watch_demo")} <FiArrowUpRight aria-hidden="true" /></a>}
                  <a href="https://gitlab.com/Theo22100/flambow-front" target="_blank" rel="noopener noreferrer" className="resume-text-link">{t("resume_page.source")} <FiArrowUpRight aria-hidden="true" /></a>
                </div>
              </article>
            </section>
            <section className="resume-education" aria-labelledby="resume-education-title">
              <h2 id="resume-education-title" className="resume-section-title"><span aria-hidden="true">02</span>{t("career.education")}</h2>
              <ol className="resume-education-list">
                {RESUME_EDUCATION_IDS.map(id => <li key={id}>
                  <p className="resume-date">{t(`experience_${id}_date`)}</p>
                  <h3>{t(`experience_${id}_title`)}</h3>
                  <p className="resume-organization">{t(`experience_${id}_subtitle`)}</p>
                  {id !== 4 && <p className="resume-diploma">{t(`experience_${id}_diplome`)}</p>}
                </li>)}
              </ol>
              <p className="resume-certification">{t("degree4")}</p>
            </section>
          </div>
          <aside className="resume-sidebar">
            <section className="resume-skills" aria-labelledby="resume-skills-title">
              <h2 id="resume-skills-title" className="resume-section-title"><span aria-hidden="true">03</span>{t("professional_skills")}</h2>
              {RESUME_SKILL_GROUPS.map(group => <div className="resume-skill-group" key={group.key}>
                <h3>{t(group.key)}</h3>
                <ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
              </div>)}
              <Link className="resume-text-link resume-all-skills" to={`${getLocalizedPath(locale, "/about")}#about-skills-title`}>{t("resume_page.all_skills")} <FiArrowUpRight aria-hidden="true" /></Link>
              <div className="resume-languages">
                <h3>{t("resume_page.languages")}</h3>
                <dl><div><dt>{t("language_options.en")}</dt><dd>B2</dd></div><div><dt>{t("language_options.es")}</dt><dd>B1</dd></div></dl>
              </div>
            </section>
            <section className="resume-connect" aria-labelledby="resume-connect-title">
              <h2 id="resume-connect-title">{t("resume_page.connect")}</h2>
              <p className="resume-availability"><span aria-hidden="true" />{t("resume_page.availability")}</p>
              <p className="resume-mobility">{t("resume_page.mobility")}</p>
              <a className="resume-email" href={`mailto:${SITE_PROFILE.email}`}>{SITE_PROFILE.email}<FiArrowUpRight aria-hidden="true" /></a>
              <div className="resume-socials">
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <FiArrowUpRight aria-hidden="true" /></a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">GitHub <FiArrowUpRight aria-hidden="true" /></a>
              </div>
              <Link className="resume-text-link" to={getLocalizedPath(locale, "/project")}>{t("resume_page.projects")} <FiArrowUpRight aria-hidden="true" /></Link>
            </section>
          </aside>
        </div>

        <details className="resume-document" onToggle={event => setPreviewOpen(event.currentTarget.open)}>
          <summary>
            <span className="resume-document-symbol" aria-hidden="true">PDF</span>
            <span className="resume-document-label"><strong>{t("cv_alt_description")}</strong><span>{t("resume_page.pdf_hint")}</span></span>
            <span className="resume-document-toggle" aria-hidden="true">+</span>
          </summary>
          <div className="resume-viewer">
            <div className="resume-toolbar">
              <span className="resume-format">PDF <span aria-hidden="true">/</span> {language}</span>
              <a href={pdf} target="_blank" rel="noopener noreferrer">{t("resume_page.open_pdf")} <FiArrowUpRight aria-hidden="true" /></a>
            </div>
            {previewOpen && <Suspense fallback={<p role="status">{t("a11y.loading_content")}</p>}><ResumePreview key={pdf} file={pdf} /></Suspense>}
          </div>
        </details>
      </Container>
    </Container>
  );
}

export default Resume;
