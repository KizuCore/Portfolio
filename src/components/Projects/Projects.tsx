import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Tilt from "react-parallax-tilt";
import ProjectCard from "./ProjectCards";
import Particle from "../Utils/Particle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "../../assets/styles/About/About.css";
import "../../assets/styles/Projet/Projet.css";

import '../../assets/styles/swiper-global.css';

// Images
import lemonmaze from "@image/Projects/LemonMaze.webp";
import cosmiclink from "@image/Projects/CosmicLink.webp";
import chrono from "@image/Projects/chrono.webp";
import tboi from "@image/Projects/TBOI.webp";
import breizhcoin from "@image/Projects/breizhcoin.webp";
import portfolio from "@image/Projects/portfolio.webp";
import portfoliov2 from "@image/Projects/portfoliov2.webp";
import apibook from "@image/Projects/apibook.webp";
import { easeOut, motion } from "framer-motion";

const projects = [
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
    techStack: [
      "Express",
      "Swagger",
      "MySQL",
      "React",
      "Bootstrap",
      "Sequelize",
    ],
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
    imgPath: lemonmaze,
    altTextKey: "lemonmaze_image_alt",
    titleKey: "lemonmaze_api_title",
    descriptionKey: "lemonmaze_api_description",
    ghLink: "https://github.com/Theo22100/APILemonMaze",
    techStack: ["Express", "Swagger", "MySQL"],
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
    <Container fluid className="project-section text-center">
      <Particle />

      <Container>
        <motion.h1
          className="custom-title pt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {t("my_projects")} {t("projects")}
        </motion.h1>


        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <Tilt className="py-5 px-3" glareEnable={true} glareMaxOpacity={0.1} scale={1.01}>
                <ProjectCard
                  imgPath={project.imgPath}
                  altText={t(project.altTextKey)}
                  title={t(project.titleKey)}
                  description={t(project.descriptionKey)}
                  ghLink={project.ghLink}
                  youtubeLink={project.youtubeLink}
                  techStack={project.techStack}
                />
              </Tilt>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Container>
  );
};

export default Projects;
