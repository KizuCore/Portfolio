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

type SupportedLang = "fr" | "en" | "es" | "bzh";

const sectionLabels: Record<
  SupportedLang,
  {
    context: string;
    stack: string;
    result: string;
    githubOnly: string;
    liveAndCode: string;
    videoAndCode: string;
    liveVideoAndCode: string;
  }
> = {
  fr: {
    context: "Contexte",
    stack: "Stack",
    result: "Resultat",
    githubOnly: "Code source disponible et versionne sur GitHub.",
    liveAndCode: "Application en ligne accessible, avec code source public.",
    videoAndCode: "Demonstration video disponible avec code source public.",
    liveVideoAndCode: "Demo en ligne et video disponibles, avec code source public.",
  },
  en: {
    context: "Context",
    stack: "Stack",
    result: "Outcome",
    githubOnly: "Source code is available and versioned on GitHub.",
    liveAndCode: "Live demo is available, with public source code.",
    videoAndCode: "Video walkthrough is available, with public source code.",
    liveVideoAndCode: "Live demo and video walkthrough are available, with public source code.",
  },
  es: {
    context: "Contexto",
    stack: "Stack",
    result: "Resultado",
    githubOnly: "Codigo fuente disponible y versionado en GitHub.",
    liveAndCode: "Demo en linea disponible, con codigo fuente publico.",
    videoAndCode: "Demo en video disponible, con codigo fuente publico.",
    liveVideoAndCode: "Demo en linea y video disponibles, con codigo fuente publico.",
  },
  bzh: {
    context: "Kenderc'hel",
    stack: "Stack",
    result: "Disoc'h",
    githubOnly: "Ar c'hod orin a zo hegerz war GitHub.",
    liveAndCode: "Ur demo enlinenn a zo hegerz, gant ar c'hod orin foran.",
    videoAndCode: "Ur video demo a zo hegerz, gant ar c'hod orin foran.",
    liveVideoAndCode: "Demo enlinenn ha video a zo hegerz, gant ar c'hod orin foran.",
  },
};

function resolveResultText(labels: (typeof sectionLabels)[SupportedLang], hasLiveDemo: boolean, hasVideo: boolean) {
  if (hasLiveDemo && hasVideo) {
    return labels.liveVideoAndCode;
  }

  if (hasLiveDemo) {
    return labels.liveAndCode;
  }

  if (hasVideo) {
    return labels.videoAndCode;
  }

  return labels.githubOnly;
}

function ProjectCard(props: ProjectCardProps) {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const labels = sectionLabels[(currentLang as SupportedLang) || "en"] || sectionLabels.en;
  const resultText = resolveResultText(labels, Boolean(props.seeLink), Boolean(props.youtubeLink));

  return (
    <Card className={`project-card-view ${props.featured ? "project-card-featured" : ""}`}>
      <div className="project-img-wrapper">
        <Card.Img
          variant="top"
          src={props.imgPath}
          alt={props.altText}
          decoding="async"
          loading="lazy"
          className={`project-img ${props.imageMode === "contain" ? "project-img-contain" : ""}`}
        />
      </div>

      <Card.Body className="project-card-body">
        {props.featured && (
          <span className="project-featured-pill">{props.featuredLabel || "Top Pick"}</span>
        )}

        <Card.Title className="project-card-title">
          <h2 className="project-title-text">
            <strong className="blue">{props.title}</strong>
          </h2>
        </Card.Title>

        <div className="project-panel">
          <h3 className="project-panel-title">{labels.context}</h3>
          <Card.Text className="project-description">{props.description}</Card.Text>
        </div>

        <div className="project-panel">
          <h3 className="project-panel-title">{labels.stack}</h3>
          <div className="project-tech-badges">
            {props.techStack.map((tech) => (
              <span key={`${props.title}-${tech}`} className="project-tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="project-panel">
          <h3 className="project-panel-title">{labels.result}</h3>
          <p className="project-result">{resultText}</p>
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

