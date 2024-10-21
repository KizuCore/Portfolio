import React from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import lemonmaze from "../../Assets/Projects/LemonMaze.webp";
import cosmiclink from "../../Assets/Projects/CosmicLink.webp";
import chrono from "../../Assets/Projects/chrono.webp";
import tboi from "../../Assets/Projects/TBOI.webp";
import breizhcoin from "../../Assets/Projects/breizhcoin.webp";
import portfolio from "../../Assets/Projects/portfolio.webp";
import portfoliov2 from "../../Assets/Projects/portfoliov2.webp";
import apibook from "../../Assets/Projects/apibook.webp";
import ReactTooltip from "react-tooltip";

function Projects() {
  const { t } = useTranslation();

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          {t('my_projects')} <strong className="blue">{t('projects')}</strong>
        </h1>
        <p style={{ color: "white" }}>
          {t('projects_description')}
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={lemonmaze}
              title={t('lemonmaze_api_title')}
              description={t('lemonmaze_api_description')}
              ghLink="https://github.com/Theo22100/APILemonMaze"
              techStack={["Express","Swagger","MySQL"]}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={lemonmaze}
              title={t('lemonmaze_title')}
              description={t('lemonmaze_description')}
              ghLink="https://github.com/Theo22100/Lemon_Maze"
              techStack={["Flutter"]}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={cosmiclink}
              title={t('cosmiclink_title')}
              description={t('cosmiclink_description')}
              ghLink="https://github.com/Theo22100/CosmicLink"
              youtubeLink="https://youtube.com/watch?v=3yVybmKT5d0"
              techStack={["Php", "Javascript", "Html", "Css"]}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chrono}
              title={t('minuteur_mobile_title')}
              description={t('minuteur_mobile_description')}
              ghLink="https://github.com/Theo22100/MDS-ExamMobile2024"
              techStack={["Kotlin"]}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={breizhcoin}
              title={t('breizhcoin_title')}
              description={t('breizhcoin_description')}
              ghLink="https://github.com/Theo22100/BreizhCoin"
              youtubeLink="https://youtu.be/OqgS7SW_8tU"
              techStack={["Php", "Javascript", "Html", "Css"]}
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={tboi}
              title={t('thebindingofisaac_title')}
              description={t('thebindingofisaac_description')}
              ghLink="https://github.com/Theo22100/TheBindingOfIsaac"
              techStack={["Java"]}
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={portfolio}
              title={t('portfolio_v1_title')}
              description={t('portfolio_v1_description')}
              ghLink="https://github.com/Theo22100/PortFolio"
              techStack={["Vuejs", "Javascript", "Html", "Css"]}
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={portfoliov2}
              title={t('portfolio_v2_title')}
              description={t('portfolio_v2_description')}
              ghLink="https://github.com/Theo22100/Portfolio-v2"
              techStack={["React", "Bootstrap", "Css"]}
            />
          </Col>
          
          <Col md={4} className="project-card">
              <ProjectCard
                imgPath={apibook}
                title={t('library_title')}
                description={t('library_description')}
                ghLink="https://github.com/Theo22100/MDS-M1-Librairie"
                techStack={["Express", "Swagger","MySQL", "React", "Bootstrap", "Sequelize"]}
              />
            </Col>
        </Row>
      </Container>
      <ReactTooltip />
    </Container>
  );
}

export default Projects;
