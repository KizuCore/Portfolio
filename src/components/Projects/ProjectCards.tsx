import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import '../../assets/styles/Projet/Projet.css';
import { BsGithub, BsYoutube } from "react-icons/bs";
import {
  SiFlutter, SiExpress, SiKotlin, SiSwagger, SiVuedotjs,
  SiGoogle, SiSequelize, SiAxios, SiTypescript
} from "react-icons/si";
import {
  DiMysql, DiPhp, DiHtml5, DiCss3, DiJavascript1,
  DiReact, DiBootstrap, DiNodejs
} from "react-icons/di";
import { FaJava } from "react-icons/fa";

// Dictionnaire des icônes par techno
const techIcons: Record<string, React.ComponentType<any>> = {
  Flutter: SiFlutter,
  MySQL: DiMysql,
  Express: SiExpress,
  Kotlin: SiKotlin,
  Php: DiPhp,
  Java: FaJava,
  Html: DiHtml5,
  Css: DiCss3,
  Javascript: DiJavascript1,
  Typescript: SiTypescript,
  Vuejs: SiVuedotjs,
  React: DiReact,
  Bootstrap: DiBootstrap,
  Swagger: SiSwagger,
  ApiGoogleBooks: SiGoogle,
  Sequelize: SiSequelize,
  NodeJS: DiNodejs,
  Axios: SiAxios,
};

interface ProjectCardProps {
  imgPath: string;
  altText: string;
  title: string;
  description: string;
  techStack: string[];
  ghLink: string;
  youtubeLink?: string;
  isGitLab?: boolean;
}

// Affichage des icônes technologiques
function TechStackIcons({ techStack }: { techStack: string[] }) {
  return (
    <Row className="pb-2 justify-content-center">
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
          loading="eager"
          className="project-img"
        />
      </div>

      <Card.Body>
        <Card.Title>
          <h3><strong className="blue">{props.title}</strong></h3>
        </Card.Title>

        <TechStackIcons techStack={props.techStack} />

        <Card.Text className="text-justify">
          {props.description}
        </Card.Text>

        <div className="button-group">
          <Button className="button-github" href={props.ghLink} target="_blank" rel="noopener noreferrer">
            <BsGithub style={{ marginRight: "5px", marginBottom: "2px" }} />
            {props.isGitLab ? "GitLab" : "GitHub"}
          </Button>

          {props.youtubeLink && (
            <Button
              className="button-youtube"
              href={props.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsYoutube style={{ marginRight: "5px", marginBottom: "2px" }} />
              {t('video')}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
