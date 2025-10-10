import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Tilt from "react-parallax-tilt";
import ProjectCard from "./ProjectCards";
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
import flambow from "@image/Projects/flambowImg.webp";
import badmintonapi from "@image/Projects/badmintonapi.webp";
import { easeOut, motion } from "framer-motion";
import Particle from "../../utils/Particle";

const projects = [
  {
    imgPath: portfoliov2,
    altTextKey: "categories_projects.portfoliov2_image_alt",
    titleKey: "categories_projects.portfolio_v2_title",
    descriptionKey: "categories_projects.portfolio_v2_description",
    ghLink: "https://github.com/KizuCore/Portfolio",
    techStack: ["React", "Bootstrap", "Css", "NodeJS", "Axios", "Typescript"],
  },

  {
    imgPath: apibook,
    altTextKey: "categories_projects.apibook_image_alt",
    titleKey: "categories_projects.library_title",
    descriptionKey: "categories_projects.library_description",
    ghLink: "https://github.com/KizuCore/MDS-M1-Librairie",
    techStack: [
      "NodeJS",
      "Swagger",
      "MySQL",
      "React",
      "Bootstrap",
      "Sequelize",
    ],
  },
  {
    imgPath: lemonmaze,
    altTextKey: "categories_projects.lemonmaze_image_alt",
    titleKey: "categories_projects.lemonmaze_title",
    descriptionKey: "categories_projects.lemonmaze_description",
    ghLink: "https://github.com/KizuCore/Lemon_Maze",
    techStack: ["Flutter"],
  },
  {
    imgPath: lemonmaze,
    altTextKey: "categories_projects.lemonmaze_image_alt",
    titleKey: "categories_projects.lemonmaze_api_title",
    descriptionKey: "categories_projects.lemonmaze_api_description",
    ghLink: "https://github.com/KizuCore/APILemonMaze",
    techStack: ["NodeJS", "Swagger", "MySQL"],
  },
  {
    imgPath: badmintonapi,
    altTextKey: "categories_projects.badmintonapi_image_alt",
    titleKey: "categories_projects.badmintonapi_title",
    descriptionKey: "categories_projects.badmintonapi_description",
    ghLink: "https://github.com/KizuCore/projet-api-badminton",
    techStack: ["NodeJS", "Swagger", "MySQL", "GraphQL"],
  },
  {
    imgPath: cosmiclink,
    altTextKey: "categories_projects.cosmiclink_image_alt",
    titleKey: "categories_projects.cosmiclink_title",
    descriptionKey: "categories_projects.cosmiclink_description",
    ghLink: "https://github.com/KizuCore/CosmicLink",
    youtubeLink: "https://youtube.com/watch?v=3yVybmKT5d0",
    techStack: ["Php", "Javascript", "Html", "Css"],
  },
  {
    imgPath: flambow,
    altTextKey: "categories_projects.flambow_image_alt",
    titleKey: "categories_projects.flambow_title",
    descriptionKey: "categories_projects.flambow_description",
    ghLink: "https://github.com/KizuCore/Flambow",
    seeLink: "https://flambow-m7iu4q0gi-theo22100s-projects.vercel.app/",
    techStack: ["React", "Javascript", "Bootstrap", "Css"],
  },
  {
    imgPath: chrono,
    altTextKey: "categories_projects.chrono_image_alt",
    titleKey: "categories_projects.minuteur_mobile_title",
    descriptionKey: "categories_projects.minuteur_mobile_description",
    ghLink: "https://github.com/KizuCore/MDS-ExamMobile2024",
    techStack: ["Kotlin"],
  },
  {
    imgPath: breizhcoin,
    altTextKey: "categories_projects.breizhcoin_image_alt",
    titleKey: "categories_projects.breizhcoin_title",
    descriptionKey: "categories_projects.breizhcoin_description",
    ghLink: "https://github.com/KizuCore/BreizhCoin",
    youtubeLink: "https://youtu.be/OqgS7SW_8tU",
    techStack: ["Php", "Javascript", "Html", "Css"],
  },
  {
    imgPath: tboi,
    altTextKey: "categories_projects.tboi_image_alt",
    titleKey: "categories_projects.thebindingofisaac_title",
    descriptionKey: "categories_projects.thebindingofisaac_description",
    ghLink: "https://github.com/KizuCore/TheBindingOfIsaac",
    techStack: ["Java"],
  },
  {
    imgPath: portfolio,
    altTextKey: "categories_projects.portfolio_image_alt",
    titleKey: "categories_projects.portfolio_v1_title",
    descriptionKey: "categories_projects.portfolio_v1_description",
    ghLink: "https://github.com/KizuCore/Old-PortFolio",
    seeLink: "https://theo-guerin.netlify.app/",
    techStack: ["Vuejs", "Javascript", "Html", "Css"],
  },
];

const Projects: React.FC = () => {
  const { t } = useTranslation();
  React.useEffect(() => {
    projects.forEach((project) => {
      const img = new Image();
      img.src = project.imgPath;
      img.loading = "eager"; // Force le navigateur à ne pas différer
    });
  }, []);


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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }} // petit délai après le titre
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
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
                    seeLink={project.seeLink}
                    techStack={project.techStack}
                  />
                </Tilt>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </Container>
    </Container>
  );
};

export default Projects;
