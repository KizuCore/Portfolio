import React, { useState, Suspense } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCards";
import Particle from "../Utils/Particle";
import "../../assets/styles/About/About.css";
import "../../assets/styles/Projet/Projet.css";
import { Tooltip } from "react-tooltip";

// Images
import lemonmaze from "@image/Projects/LemonMaze.webp";
import cosmiclink from "@image/Projects/CosmicLink.webp";
import chrono from "@image/Projects/chrono.webp";
import tboi from "@image/Projects/TBOI.webp";
import breizhcoin from "@image/Projects/breizhcoin.webp";
import portfolio from "@image/Projects/portfolio.webp";
import portfoliov2 from "@image/Projects/portfoliov2.webp";
import apibook from "@image/Projects/apibook.webp";

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
  { imgPath: portfoliov2, altTextKey: "portfoliov2_image_alt", titleKey: "portfolio_v2_title", descriptionKey: "portfolio_v2_description", ghLink: "https://github.com/Theo22100/Portfolio", techStack: ["React", "Bootstrap", "Css", "NodeJS", "Axios"] },
  { imgPath: apibook, altTextKey: "apibook_image_alt", titleKey: "library_title", descriptionKey: "library_description", ghLink: "https://github.com/Theo22100/MDS-M1-Librairie", techStack: ["Express", "Swagger", "MySQL", "React", "Bootstrap", "Sequelize"] },
  { imgPath: lemonmaze, altTextKey: "lemonmaze_image_alt", titleKey: "lemonmaze_api_title", descriptionKey: "lemonmaze_api_description", ghLink: "https://github.com/Theo22100/APILemonMaze", techStack: ["Express", "Swagger", "MySQL"] },
  { imgPath: lemonmaze, altTextKey: "lemonmaze_image_alt", titleKey: "lemonmaze_title", descriptionKey: "lemonmaze_description", ghLink: "https://github.com/Theo22100/Lemon_Maze", techStack: ["Flutter"] },
  { imgPath: cosmiclink, altTextKey: "cosmiclink_image_alt", titleKey: "cosmiclink_title", descriptionKey: "cosmiclink_description", ghLink: "https://github.com/Theo22100/CosmicLink", youtubeLink: "https://youtube.com/watch?v=3yVybmKT5d0", techStack: ["Php", "Javascript", "Html", "Css"] },
  { imgPath: chrono, altTextKey: "chrono_image_alt", titleKey: "minuteur_mobile_title", descriptionKey: "minuteur_mobile_description", ghLink: "https://github.com/Theo22100/MDS-ExamMobile2024", techStack: ["Kotlin"] },
  { imgPath: breizhcoin, altTextKey: "breizhcoin_image_alt", titleKey: "breizhcoin_title", descriptionKey: "breizhcoin_description", ghLink: "https://github.com/Theo22100/BreizhCoin", youtubeLink: "https://youtu.be/OqgS7SW_8tU", techStack: ["Php", "Javascript", "Html", "Css"] },
  { imgPath: tboi, altTextKey: "tboi_image_alt", titleKey: "thebindingofisaac_title", descriptionKey: "thebindingofisaac_description", ghLink: "https://github.com/Theo22100/TheBindingOfIsaac", techStack: ["Java"] },
  { imgPath: portfolio, altTextKey: "portfolio_image_alt", titleKey: "portfolio_v1_title", descriptionKey: "portfolio_v1_description", ghLink: "https://github.com/Theo22100/Old-PortFolio", techStack: ["Vuejs", "Javascript", "Html", "Css"] }
];

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const techFilters = ["All", ...Array.from(new Set(projects.flatMap(p => p.techStack)))];

  const filteredProjects = selectedFilter === "All" ? projects : projects.filter(p => p.techStack.includes(selectedFilter));

  return (
    <Container fluid className="project-section">
      {/* Tu peux commenter Particle ici pour test de perf */}
      <Particle />
      <Container>
        <motion.h1 className="custom-title pb-5 pt-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          {t("my_projects")} {t("projects")}
        </motion.h1>

        {/* Filtres */}
        <div className="filter-buttons d-flex flex-wrap gap-2 justify-content-center mb-5">
          {techFilters.map((filter, index) => (
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Button
                variant={selectedFilter === filter ? "primary" : "outline-light"}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Cartes de projets */}
        <Row className="justify-content-center align-items-stretch">
          {filteredProjects.map((project, index) => (
            <Col xs={12} sm={6} md={4} key={index} className="project-card px-3 py-4">
              <motion.div
                whileHover={{ scale: 1.03, rotateZ: 0.3 }}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
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

      {/* Tooltip chargé une seule fois */}
      <Suspense fallback={<Spinner animation="border" role="status" />}>
        <Tooltip id="tooltip" anchorSelect=".tech-icons2" place="top" />
      </Suspense>
    </Container>
  );
};

export default Projects;
