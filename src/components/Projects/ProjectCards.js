import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsGithub, BsYoutube } from "react-icons/bs";
import { Row, Col } from "react-bootstrap";
import { DiBootstrap, DiCss3, DiHtml5, DiJavascript1, DiMysql, DiPhp, DiReact } from "react-icons/di";
import { SiExpress, SiFlutter, SiKotlin, SiSwagger, SiVuedotjs, SiGoogle, SiSequelize } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const techIcons = {
  Flutter: <SiFlutter />,
  MySQL: <DiMysql />,
  Express: <SiExpress />,
  Kotlin: <SiKotlin />,
  Php: <DiPhp />,
  Java: <FaJava />,
  Html: <DiHtml5 />,
  Css: <DiCss3 />,
  Javascript: <DiJavascript1 />,
  Vuejs: <SiVuedotjs />,
  React: <DiReact />,
  Bootstrap: <DiBootstrap />,
  Swagger: <SiSwagger />,
  ApiGoogleBooks: <SiGoogle />,
  Sequelize: <SiSequelize />
};

function ProjectCards(props) {
  const { t } = useTranslation();
  
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt={`${props.title} project image`} />
      
      <Card.Body>
        <Card.Title><h3><strong className="blue">{props.title}</strong></h3></Card.Title>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {props.techStack.map((tech, index) => (
            <Col key={index} xs={4} md={2} className="tech-icons2" data-tip={`${tech}`}>
              {React.cloneElement(techIcons[tech], { 'aria-label': tech })}
            </Col>
          ))}
        </Row>

        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>

        <Button className="button-cv" href={props.ghLink} target="_blank" rel="noopener noreferrer">
          <BsGithub /> &nbsp;
          {props.isGitLab ? "GitLab" : "GitHub"}
        </Button>
        
        {"\n"}
        {"\n"}
        {/* Bouton YouTube si disponible */}
        {!props.isGitLab && props.youtubeLink && (
          <Button
            className="button-youtube"
            href={props.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "10px" }}
          >
            <BsYoutube /> &nbsp;
            {t('video')}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
