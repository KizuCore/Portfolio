import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import "../../assets/styles/Projet/Projet.css";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { FaEye } from "@react-icons/all-files/fa/FaEye";

interface ProjectCardProps {
  imgPath: string;
  altText: string;
  title: string;
  description: string;
  techStack: string[];
  ghLink: string;
  youtubeLink?: string;
  seeLink?: string;
  isGitLab?: boolean;
  featured?: boolean;
  featuredLabel?: string;
  imageMode?: "cover" | "contain";
}

function resolveResultKey(hasLiveDemo: boolean, hasVideo: boolean) {
  // Texte resultat adapte selon les liens reels du projet.
  if (hasLiveDemo && hasVideo) {
    return "project_card.result_live_video_and_code";
  }

  if (hasLiveDemo) {
    return "project_card.result_live_and_code";
  }

  if (hasVideo) {
    return "project_card.result_video_and_code";
  }

  return "project_card.result_github_only";
}

function ProjectCard(props: ProjectCardProps) {
  const { t } = useTranslation();
  const resultText = t(resolveResultKey(Boolean(props.seeLink), Boolean(props.youtubeLink)));

  return (
    <Card className={`project-card-view ${props.featured ? "project-card-featured" : ""}`}>
      <div className={`project-img-wrapper ${props.imageMode === "contain" ? "project-img-wrapper-contain" : ""}`}>
        {/* imageMode permet un rendu "contain" pour les screenshots verticaux */}
        <Card.Img
          variant="top"
          src={props.imgPath}
          alt={props.altText}
          decoding="async"
          loading="eager"
          className={`project-img ${props.imageMode === "contain" ? "project-img-contain" : ""}`}
        />
      </div>

      <Card.Body className="project-card-body">
        {props.featured && (
          <span className="project-featured-pill">{props.featuredLabel || t("project_featured_label")}</span>
        )}

        <Card.Title className="project-card-title">
          <h2 className="project-title-text">
            <strong className="blue">{props.title}</strong>
          </h2>
        </Card.Title>

        <div className="project-panel project-context-panel">
          <h3 className="project-panel-title">{t("project_card.context")}</h3>
          <Card.Text className="project-description">{props.description}</Card.Text>
        </div>

        <div className="project-info-grid">
          <div className="project-panel">
            <h3 className="project-panel-title">{t("project_card.stack")}</h3>
            {/* Affichage lisible de la stack en badges texte */}
            <div className="project-tech-badges">
              {props.techStack.map((tech) => (
                <span key={`${props.title}-${tech}`} className="project-tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="project-panel">
            <h3 className="project-panel-title">{t("project_card.result")}</h3>
            <p className="project-result">{resultText}</p>
          </div>
        </div>

        <div className="button-group">
          <Button className="button-github" href={props.ghLink} target="_blank" rel="noopener noreferrer">
            <FaGithub style={{ marginRight: "5px", marginBottom: "2px" }} />
            {props.isGitLab ? "GitLab" : "GitHub"}
          </Button>

          {props.youtubeLink && (
            <Button
              className="button-youtube"
              href={props.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube style={{ marginRight: "5px", marginBottom: "2px" }} />
              {t("video")}
            </Button>
          )}

          {props.seeLink && (
            <Button className="button-see" href={props.seeLink} target="_blank" rel="noopener noreferrer">
              <FaEye style={{ marginRight: "5px", marginBottom: "2px" }} />
              {t("see")}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;

