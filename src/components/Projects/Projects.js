import React from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Utils/Particle";
import lemonmaze from "../../Assets/Projects/LemonMaze.webp";
import cosmiclink from "../../Assets/Projects/CosmicLink.webp";
import chrono from "../../Assets/Projects/chrono.webp";
import tboi from "../../Assets/Projects/TBOI.webp";
import breizhcoin from "../../Assets/Projects/breizhcoin.webp";
import portfolio from "../../Assets/Projects/portfolio.webp";
import portfoliov2 from "../../Assets/Projects/portfoliov2.webp";
import apibook from "../../Assets/Projects/apibook.webp";
import ReactTooltip from "react-tooltip";
import { useInView } from 'react-intersection-observer';

function Projects() {
  const { t } = useTranslation();

  // Hook pour observer quand les cartes deviennent visibles
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref7, inView7] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref8, inView8] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref9, inView9] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading title-font pb-4">
          {t('my_projects')} <strong className="blue-title">{t('projects')}</strong>
        </h1>
        <p style={{ fontSize: "1.2em", color: "white" }}>
          {t('projects_description')}
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          
          <Col md={4} className={`project-card ${inView1 ? 'fade-in' : ''}`} ref={ref1}>
            <ProjectCard
              imgPath={lemonmaze}
              altText={t('lemonmaze_image_alt')}
              title={t('lemonmaze_api_title')}
              description={t('lemonmaze_api_description')}
              ghLink="https://github.com/Theo22100/APILemonMaze"
              techStack={["Express", "Swagger", "MySQL"]}
            />
          </Col>

          <Col md={4} className={`project-card ${inView2 ? 'fade-in' : ''}`} ref={ref2}>
            <ProjectCard
              imgPath={lemonmaze}
              altText={t('lemonmaze_image_alt')}
              title={t('lemonmaze_title')}
              description={t('lemonmaze_description')}
              ghLink="https://github.com/Theo22100/Lemon_Maze"
              techStack={["Flutter"]}
            />
          </Col>

          <Col md={4} className={`project-card ${inView3 ? 'fade-in' : ''}`} ref={ref3}>
            <ProjectCard
              imgPath={cosmiclink}
              altText={t('cosmiclink_image_alt')}
              title={t('cosmiclink_title')}
              description={t('cosmiclink_description')}
              ghLink="https://github.com/Theo22100/CosmicLink"
              youtubeLink="https://youtube.com/watch?v=3yVybmKT5d0"
              techStack={["Php", "Javascript", "Html", "Css"]}
            />
          </Col>

          <Col md={4} className={`project-card ${inView4 ? 'fade-in' : ''}`} ref={ref4}>
            <ProjectCard
              imgPath={chrono}
              altText={t('chrono_image_alt')}
              title={t('minuteur_mobile_title')}
              description={t('minuteur_mobile_description')}
              ghLink="https://github.com/Theo22100/MDS-ExamMobile2024"
              techStack={["Kotlin"]}
            />
          </Col>

          <Col md={4} className={`project-card ${inView5 ? 'fade-in' : ''}`} ref={ref5}>
            <ProjectCard
              imgPath={breizhcoin}
              altText={t('breizhcoin_image_alt')}
              title={t('breizhcoin_title')}
              description={t('breizhcoin_description')}
              ghLink="https://github.com/Theo22100/BreizhCoin"
              youtubeLink="https://youtu.be/OqgS7SW_8tU"
              techStack={["Php", "Javascript", "Html", "Css"]}
            />
          </Col>

          <Col md={4} className={`project-card ${inView6 ? 'fade-in' : ''}`} ref={ref6}>
            <ProjectCard
              imgPath={tboi}
              altText={t('tboi_image_alt')}
              title={t('thebindingofisaac_title')}
              description={t('thebindingofisaac_description')}
              ghLink="https://github.com/Theo22100/TheBindingOfIsaac"
              techStack={["Java"]}
            />
          </Col>

          <Col md={4} className={`project-card ${inView7 ? 'fade-in' : ''}`} ref={ref7}>
            <ProjectCard
              imgPath={portfolio}
              altText={t('portfolio_image_alt')}
              title={t('portfolio_v1_title')}
              description={t('portfolio_v1_description')}
              ghLink="https://github.com/Theo22100/PortFolio"
              techStack={["Vuejs", "Javascript", "Html", "Css"]}
            />
          </Col>

          <Col md={4} className={`project-card ${inView8 ? 'fade-in' : ''}`} ref={ref8}>
            <ProjectCard
              imgPath={portfoliov2}
              altText={t('portfoliov2_image_alt')}
              title={t('portfolio_v2_title')}
              description={t('portfolio_v2_description')}
              ghLink="https://github.com/Theo22100/Portfolio-v2"
              techStack={["React", "Bootstrap", "Css"]}
            />
          </Col>

          <Col md={4} className={`project-card ${inView9 ? 'fade-in' : ''}`} ref={ref9}>
            <ProjectCard
              imgPath={apibook}
              altText={t('apibook_image_alt')}
              title={t('library_title')}
              description={t('library_description')}
              ghLink="https://github.com/Theo22100/MDS-M1-Librairie"
              techStack={["Express", "Swagger", "MySQL", "React", "Bootstrap", "Sequelize"]}
            />
          </Col>

        </Row>
      </Container>
      <ReactTooltip />
    </Container>
  );
}

export default Projects;
