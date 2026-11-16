import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";
import "../../assets/styles/Projects/Projects.css";
import { PROJECT_FILTERS, PROJECTS, type ProjectFilter } from "./data/projects";

export default function Projects() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const sortedProjects = useMemo(() => [...PROJECTS].sort((a, b) =>
    Number(Boolean(b.pinTop)) - Number(Boolean(a.pinTop)) ||
    Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  ), []);
  const projects = activeFilter === "all" ? sortedProjects : sortedProjects.filter(project => project.category === activeFilter);

  return <section className="project-section" aria-labelledby="projects-title">
    <div className="projects-container site-container">
      <header className="projects-header">
        <p className="business-eyebrow">Portfolio / {t("project")}</p>
        <h1 className="projects-title" id="projects-title">{t("my_projects")} {t("projects")}</h1>
        <p className="projects-intro">{t("projects_description")}</p>
      </header>
      <div className="project-filter-shell">
        <div className="project-filter-bar" role="group" aria-label={t("project_aria")}>
          {PROJECT_FILTERS.map(filter => <button type="button" key={filter}
            className={`project-filter-chip${activeFilter === filter ? " active" : ""}`}
            aria-pressed={activeFilter === filter} aria-controls="project-gallery"
            onClick={() => setActiveFilter(filter)}>{t(`project_filters.${filter}`)}</button>)}
        </div>
        <p className="project-filter-count" role="status">{projects.length} {t("projects")}</p>
      </div>
      <div className="project-gallery" id="project-gallery">
        {projects.map(project => <ProjectCard key={project.titleKey} {...project}
          altText={t(project.altTextKey)} title={t(project.titleKey)} description={t(project.descriptionKey)} />)}
      </div>
      {projects.length === 0 && <p className="project-empty">{t("project_explorer.empty")}</p>}
    </div>
  </section>;
}
