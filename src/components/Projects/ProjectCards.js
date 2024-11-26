import React, { Suspense } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row, Col, Spinner } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import '@style/Projet/Projet.css';

// Chargement différé des icônes
const BsGithub = React.lazy(() => import("react-icons/bs").then(module => ({ default: module.BsGithub })));
const BsYoutube = React.lazy(() => import("react-icons/bs").then(module => ({ default: module.BsYoutube })));
const techIcons = {
  Flutter: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiFlutter }))),
  MySQL: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiMysql }))),
  Express: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiExpress }))),
  Kotlin: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiKotlin }))),
  Php: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiPhp }))),
  Java: React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaJava }))),
  Html: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiHtml5 }))),
  Css: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiCss3 }))),
  Javascript: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiJavascript1 }))),
  Vuejs: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiVuedotjs }))),
  React: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiReact }))),
  Bootstrap: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiBootstrap }))),
  Swagger: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiSwagger }))),
  ApiGoogleBooks: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiGoogle }))),
  Sequelize: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiSequelize }))),
  NodeJS: React.lazy(() => import("react-icons/di").then(module => ({ default: module.DiNodejs }))),
  Axios: React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiAxios }))),
};

function ProjectCards(props) {
  const { t } = useTranslation();

  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt={`${props.title} project image`} loading="lazy" decoding="async"/>
      <Card.Body>
        <Card.Title><h3><strong className="blue">{props.title}</strong></h3></Card.Title>

        <Row className="pb-2" style={{ justifyContent: "center" }}>
          {props.techStack.map((tech, index) => {
            const IconComponent = techIcons[tech];
            return (
              <Col key={index} xs={4} md={2} className="tech-icons2" data-tip={`${tech}`}>
                <Suspense fallback={<Spinner animation="border" role="status" />}>
                  <IconComponent aria-label={tech} />
                </Suspense>
              </Col>
            );
          })}
        </Row>

        <Card.Text className="text-justify">
          {props.description}
        </Card.Text>

        <div className="button-group">
          <Suspense fallback={<Spinner animation="border" role="status" />}>
            <Button className="button-cv" href={props.ghLink} target="_blank" rel="noopener noreferrer">
              <BsGithub /> &nbsp;
              {props.isGitLab ? "GitLab" : "GitHub"}
            </Button>
          </Suspense>

          {!props.isGitLab && props.youtubeLink && (
            <Suspense fallback={<Spinner animation="border" role="status" />}>
              <Button
                className="button-youtube"
                href={props.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsYoutube /> &nbsp;
                {t('video')}
              </Button>
            </Suspense>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
