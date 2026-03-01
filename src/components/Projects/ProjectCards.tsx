import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import '../../assets/styles/Projet/Projet.css';
import type { IconType } from "react-icons";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { FaExchangeAlt } from "@react-icons/all-files/fa/FaExchangeAlt";
import { SiFlutter } from "@react-icons/all-files/si/SiFlutter";
import { SiKotlin } from "@react-icons/all-files/si/SiKotlin";
import { SiSwagger } from "@react-icons/all-files/si/SiSwagger";
import { SiVueDotJs } from "@react-icons/all-files/si/SiVueDotJs";
import { SiGoogle } from "@react-icons/all-files/si/SiGoogle";
import { SiTypescript } from "@react-icons/all-files/si/SiTypescript";
import { SiGraphql } from "@react-icons/all-files/si/SiGraphql";
import { DiMysql } from "@react-icons/all-files/di/DiMysql";
import { DiPhp } from "@react-icons/all-files/di/DiPhp";
import { DiHtml5 } from "@react-icons/all-files/di/DiHtml5";
import { DiCss3 } from "@react-icons/all-files/di/DiCss3";
import { DiJavascript1 } from "@react-icons/all-files/di/DiJavascript1";
import { DiReact } from "@react-icons/all-files/di/DiReact";
import { DiBootstrap } from "@react-icons/all-files/di/DiBootstrap";
import { DiNodejs } from "@react-icons/all-files/di/DiNodejs";
import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaJava } from "@react-icons/all-files/fa/FaJava";

// Dictionnaire des icônes par techno
const techIcons: Record<string, IconType> = {
  Flutter: SiFlutter,
  MySQL: DiMysql,
  Kotlin: SiKotlin,
  Php: DiPhp,
  Java: FaJava,
  Html: DiHtml5,
  Css: DiCss3,
  Javascript: DiJavascript1,
  Typescript: SiTypescript,
  Vuejs: SiVueDotJs,
  React: DiReact,
  Bootstrap: DiBootstrap,
  Swagger: SiSwagger,
  ApiGoogleBooks: SiGoogle,
  Sequelize: DiMysql,
  NodeJS: DiNodejs,
  Axios: FaExchangeAlt,
  GraphQL: SiGraphql,
};

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
}

// Affichage des icônes technologiques
function TechStackIcons({ techStack }: { techStack: string[] }) {
  return (
    <Row className="project-tech-row pb-2 justify-content-center">
      {techStack.map((tech, index) => {
        const IconComponent = techIcons[tech];
        return IconComponent ? (
          <Col
            key={index}
            xs={4}
            md={2}
            className="tech-icons2"
            data-tooltip-id="tooltip"
            data-tooltip-content={tech}
          >
            <IconComponent
              title={tech}
              aria-label={tech}
              role="img"
              tabIndex={0}
            />
          </Col>
        ) : null;
      })}
    </Row>
  );
}

// Carte de projet
function ProjectCard(props: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="project-card-view">
      <div className="project-img-wrapper">
        <Card.Img
          variant="top"
          src={props.imgPath}
          alt={props.altText}
          decoding="async"
          loading="lazy"
          fetchPriority="low"
          className="project-img"
        />
      </div>

      <Card.Body className="project-card-body">
        <Card.Title className="project-card-title">
          <h3 className="project-title-text">
            <strong className="blue">{props.title}</strong>
          </h3>
        </Card.Title>

        <TechStackIcons techStack={props.techStack} />

        <Card.Text className="project-description text-justify">
          {props.description}
        </Card.Text>

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
              {t('video')}
            </Button>
          )}

          {props.seeLink && (
            <Button
              className="button-see"
              href={props.seeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEye style={{ marginRight: "5px", marginBottom: "2px" }} />
              {t('see')}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
