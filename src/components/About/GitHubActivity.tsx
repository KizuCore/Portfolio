import React, { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../Common/LoadingSpinner";
import "../../assets/styles/About/GitHubActivity.css";
import { FaGitlab } from "@react-icons/all-files/fa/FaGitlab";
import { SiGithub } from "@react-icons/all-files/si/SiGithub";
import { useInView } from "react-intersection-observer";
import type { Props as CalendarProps } from "react-activity-calendar";
import { SOCIAL_LINKS } from "../../data/portfolio";

const GitHubCalendar = React.lazy(() => import("react-github-calendar"));
const GitLabCalendar = React.lazy(() => import("./GitLabCalendar"));
const theme = { dark: ["#16283f", "#26466d", "#356aab", "#528fe1", "#a1cbff"] };

const GitHubActivity: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [platform, setPlatform] = useState<"github" | "gitlab">("github");
  const [gitlabVisited, setGitlabVisited] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px 0px" });
  const locale = i18n.resolvedLanguage === "bzh" ? "br" : i18n.resolvedLanguage ?? "fr";
  const monthFormat = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" });
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" });
  const calendarProps: Omit<CalendarProps, "data"> = {
    blockSize: 13, blockMargin: 4, theme, colorScheme: "dark", fontSize: 13,
    labels: {
      months: Array.from({ length: 12 }, (_, index) => monthFormat.format(new Date(Date.UTC(2026, index, 1)))),
      // The calendar replaces {{count}} after summing the selected platform.
      totalCount: t("code_activity.total", { interpolation: { prefix: "[[", suffix: "]]" } }),
      legend: { less: t("code_activity.less"), more: t("code_activity.more") },
    },
    renderBlock: (block, activity) => React.cloneElement(block, {}, <title>{t("code_activity.day", { count: activity.count, date: dateFormat.format(new Date(activity.date)) })}</title>),
  };
  const loading = <div className="code-activity-loading" role="status"><LoadingSpinner /><span>{t("a11y.loading_content")}</span></div>;

  return (
    <section className="about-code-section" aria-labelledby="code-profiles-title">
      <div className="code-activity-card">
        <header className="code-activity-header">
          <div className="code-activity-identity">
            {platform === "github" ? <SiGithub size={28} aria-hidden="true" /> : <FaGitlab size={28} aria-hidden="true" />}
            <div>
              <h2 id="code-profiles-title">GitHub &amp; GitLab</h2>
              <p>{platform === "github" ? "KizuCore" : "Theo35000"}</p>
            </div>
          </div>
          <div className="code-profile-links">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" aria-label={t("github_profile_seo")}>
              <SiGithub aria-hidden="true" /> GitHub <span aria-hidden="true">&#8599;</span>
            </a>
            <a href={SOCIAL_LINKS.gitlab} target="_blank" rel="noreferrer" aria-label={t("gitlab_profile_seo")}>
              <FaGitlab aria-hidden="true" /> GitLab <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </header>
        <div className="code-activity-calendar" ref={ref}>
          <div className="code-activity-selector" role="group" aria-label={t("code_activity.select")}>
            <button type="button" aria-pressed={platform === "github"} aria-controls="github-calendar-panel" onClick={() => setPlatform("github")}><SiGithub aria-hidden="true" />GitHub</button>
            <button type="button" aria-pressed={platform === "gitlab"} aria-controls="gitlab-calendar-panel" onClick={() => { setGitlabVisited(true); setPlatform("gitlab"); }}><FaGitlab aria-hidden="true" />GitLab</button>
          </div>
          <div className="code-activity-calendar-content">
            <div id="github-calendar-panel" hidden={platform !== "github"} role="region" aria-label={t("code_activity.calendar", { platform: "GitHub" })}>
              {inView ? <Suspense fallback={loading}><GitHubCalendar username="KizuCore" {...calendarProps} errorMessage={t("code_activity.unavailable")} /></Suspense> : loading}
            </div>
            <div id="gitlab-calendar-panel" hidden={platform !== "gitlab"} role="region" aria-label={t("code_activity.calendar", { platform: "GitLab" })}>
              {inView && gitlabVisited ? <Suspense fallback={loading}><GitLabCalendar {...calendarProps} /></Suspense> : loading}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
