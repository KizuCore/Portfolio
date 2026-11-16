import LoadingImage from "@/shared/ui/LoadingImage";
import { useTranslation } from "react-i18next";
import { getShortLocale, getLocalizedPath, getContentLocale, getHtmlLang, splitLocalizedPath } from "@/shared/config/seo";
import { Link, useLocation } from "react-router-dom";
import type { ProjectCategory } from "@/shared/data/projects";

interface ProjectCardProps {
  imgPath: string;
  srcSet?: string;
  altText: string;
  title: string;
  description: string;
  techStack: string[];
  category: ProjectCategory;
  ghLink?: string;
  youtubeLink?: string;
  seeLink?: string;
  caseStudyPath?: string;
  isGitLab?: boolean;
  featured?: boolean;
  imageMode?: "cover" | "contain";
}

export default function ProjectCard(props: ProjectCardProps) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const locale = splitLocalizedPath(pathname).locale ?? getShortLocale(i18n.language);
  const contentLocale = props.caseStudyPath ? getContentLocale(locale, splitLocalizedPath(props.caseStudyPath).pathname) : locale;
  const casePath = props.caseStudyPath ? getLocalizedPath(contentLocale, props.caseStudyPath) : undefined;
  const externalLink = props.seeLink ?? props.youtubeLink ?? props.ghLink;
  const coverClass = `project-cover${props.imageMode === "contain" ? " project-cover-contain" : ""}`;
  const image = <LoadingImage src={props.imgPath} srcSet={props.srcSet}
    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1232px) calc((100vw - 80px) / 2), 568px"
    alt={props.altText} width="1600" height="1000" decoding="async" loading="lazy" />;

  return <article className="project-card-view">
    {casePath ? <Link to={casePath} hrefLang={getHtmlLang(contentLocale)} className={coverClass} aria-label={`${t("home_offer.case_link")} — ${props.title}`}>{image}<span aria-hidden="true">↗</span></Link>
      : externalLink ? <a href={externalLink} target="_blank" rel="noopener noreferrer" className={coverClass} aria-label={`${t("see")} — ${props.title}`}>{image}<span aria-hidden="true">↗</span></a>
      : <div className={coverClass}>{image}</div>}
    <div className="project-card-body">
      <div className="project-card-meta"><span>{t(`project_filters.${props.category}`)}</span>{props.featured && <span>{t("project_featured_label")}</span>}</div>
      <h2 className="project-card-title">{props.title}</h2>
      <p className="project-description">{props.description}</p>
      <ul className="project-tech-badges" aria-label={t("project_card.stack")}>{props.techStack.map(tech => <li key={tech}>{tech}</li>)}</ul>
      <div className="project-card-links">
        {casePath && <Link className="project-main-link" to={casePath} hrefLang={getHtmlLang(contentLocale)}>{t("home_offer.case_link")} <span aria-hidden="true">↗</span></Link>}
        {props.seeLink && <a href={props.seeLink} target="_blank" rel="noopener noreferrer">{t("see")} <span aria-hidden="true">↗</span></a>}
        {props.youtubeLink && <a href={props.youtubeLink} target="_blank" rel="noopener noreferrer">{t("video")} <span aria-hidden="true">↗</span></a>}
        {props.ghLink && <a href={props.ghLink} target="_blank" rel="noopener noreferrer">{props.isGitLab ? "GitLab" : "GitHub"} <span aria-hidden="true">↗</span></a>}
      </div>
    </div>
  </article>;
}
