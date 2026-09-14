import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import "../../assets/styles/About/GitHubActivity.css";
import { FaGitlab } from "@react-icons/all-files/fa/FaGitlab";
import { SiGithub } from "@react-icons/all-files/si/SiGithub";

const GitHubCalendar = React.lazy(() => import("react-github-calendar"));

const GitHubActivity: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="about-code-section" aria-labelledby="code-profiles-title">
      <div className="code-activity-card">
        <header className="code-activity-header">
          <div className="code-activity-identity">
            <SiGithub size={28} aria-hidden="true" />
            <div>
              <h2 id="code-profiles-title">GitHub &amp; GitLab</h2>
              <p>KizuCore</p>
            </div>
          </div>
          <div className="code-profile-links">
            <a href="https://github.com/KizuCore/" target="_blank" rel="noreferrer" aria-label={t("github_profile_seo")}>
              GitHub <span aria-hidden="true">&#8599;</span>
            </a>
            <a href="https://gitlab.com/Theo35000" target="_blank" rel="noreferrer" aria-label={t("gitlab_profile_seo")}>
              <FaGitlab aria-hidden="true" /> GitLab <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </header>
        {/* Place le calendrier sur sa propre ligne pour le séparer des liens des profils. */}
        <div className="code-activity-calendar">
          <Suspense fallback={<div className="code-activity-loading" role="status"><Spinner animation="border" aria-hidden="true" /><span>{t("a11y.loading_content")}</span></div>}>
            <GitHubCalendar
              username="KizuCore"
              blockSize={13}
              blockMargin={4}
              theme={{
                light: ["#16283f", "#26466d", "#356aab", "#528fe1", "#a1cbff"],
                dark: ["#16283f", "#26466d", "#356aab", "#528fe1", "#a1cbff"],
              }}
              colorScheme="dark"
              fontSize={13}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
