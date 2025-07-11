import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { easeOut, motion } from "framer-motion";
import ProjectCard from "./ProjectCards";
import Particle from "../Utils/Particle";
import "../../assets/styles/About/About.css";

import lemonmaze from "@image/Projects/LemonMaze.webp";
import cosmiclink from "@image/Projects/CosmicLink.webp";
import chrono from "@image/Projects/chrono.webp";
import tboi from "@image/Projects/TBOI.webp";
import breizhcoin from "@image/Projects/breizhcoin.webp";
import portfolio from "@image/Projects/portfolio.webp";
import portfoliov2 from "@image/Projects/portfoliov2.webp";
import apibook from "@image/Projects/apibook.webp";

const Tooltip = React.lazy(() => import("react-tooltip").then(module => ({ default: module.Tooltip })));

interface Project {
  imgPath: string;
  altTextKey: string;
  titleKey: string;
  descriptionKey: string;
  ghLink: string;
  youtubeLink?: string;
  techStack: string[];
}

const projects: Project[] = [
  {
    imgPath: portfoliov2,
    altTextKey: "portfoliov2_image_alt",
    titleKey: "portfolio_v2_title",
    descriptionKey: "portfolio_v2_description",
    ghLink: "https://github.com/Theo22100/Portfolio",
    techStack: ["React", "Bootstrap", "Css", "NodeJS", "Axios"],
  },
  {
    imgPath: apibook,
    altTextKey: "apibook_image_alt",
    titleKey: "library_title",
    descriptionKey: "library_description",
    ghLink: "https://github.com/Theo22100/MDS-M1-Librairie",
    techStack: ["Express", "Swagger", "MySQL", "React", "Bootstrap", "Sequelize"],
  },
  {
    imgPath: lemonmaze,
    altTextKey: "lemonmaze_image_alt",
    titleKey: "lemonmaze_api_title",
    descriptionKey: "lemonmaze_api_description",
    ghLink: "https://github.com/Theo22100/APILemonMaze",
    techStack: ["Express", "Swagger", "MySQL"],
  },
  {
    imgPath: lemonmaze,
    altTextKey: "lemonmaze_image_alt",
    titleKey: "lemonmaze_title",
    descriptionKey: "lemonmaze_description",
    ghLink: "https://github.com/Theo22100/Lemon_Maze",
    techStack: ["Flutter"],
  },
  {
    imgPath: cosmiclink,
    altTextKey: "cosmiclink_image_alt",
    titleKey: "cosmiclink_title",
    descriptionKey: "cosmiclink_description",
    ghLink: "https://github.com/Theo22100/CosmicLink",
    youtubeLink: "https://youtube.com/watch?v=3yVybmKT5d0",
    techStack: ["Php", "Javascript", "Html", "Css"],
  },
  {
    imgPath: chrono,
    altTextKey: "chrono_image_alt",
    titleKey: "minuteur_mobile_title",
    descriptionKey: "minuteur_mobile_description",
    ghLink: "https://github.com/Theo22100/MDS-ExamMobile2024",
    techStack: ["Kotlin"],
  },
  {
    imgPath: breizhcoin,
    altTextKey: "breizhcoin_image_alt",
    titleKey: "breizhcoin_title",
    descriptionKey: "breizhcoin_description",
    ghLink: "https://github.com/Theo22100/BreizhCoin",
    youtubeLink: "https://youtu.be/OqgS7SW_8tU",
    techStack: ["Php", "Javascript", "Html", "Css"],
  },
  {
    imgPath: tboi,
    altTextKey: "tboi_image_alt",
    titleKey: "thebindingofisaac_title",
    descriptionKey: "thebindingofisaac_description",
    ghLink: "https://github.com/Theo22100/TheBindingOfIsaac",
    techStack: ["Java"],
  },
  {
    imgPath: portfolio,
    altTextKey: "portfolio_image_alt",
    titleKey: "portfolio_v1_title",
    descriptionKey: "portfolio_v1_description",
    ghLink: "https://github.com/Theo22100/Old-PortFolio",
    techStack: ["Vuejs", "Javascript", "Html", "Css"],
  },
];

const Projects: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>

        <motion.h1
          className="custom-title py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.8, ease: easeOut }}
        >
          {t("my_projects")}{" "}{t("projects")}
        </motion.h1>
        <p className="pb-3" style={{ fontSize: "1.2em", color: "white", textDecoration: "underline" }}>{t("projects_description")}</p>
        <Row className="pb-1" style={{ justifyContent: "center", alignItems: "stretch" }}>
          {projects.map((project, index) => (
            <Col
              md={4}
              key={index}
              className="project-card py-4 px-4"
              style={{ display: "flex", height: "100%" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <ProjectCard
                  imgPath={project.imgPath}
                  altText={t(project.altTextKey)}
                  title={t(project.titleKey)}
                  description={t(project.descriptionKey)}
                  ghLink={project.ghLink}
                  youtubeLink={project.youtubeLink}
                  techStack={project.techStack}
                />
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
      <Suspense fallback={<Spinner animation="border" role="status" />}>
        <Tooltip id="tooltip" anchorSelect=".tech-icons2" place="top" />
      </Suspense>
    </Container>
  );
};

export default Projects;
