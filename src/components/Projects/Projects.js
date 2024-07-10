import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import lemonmaze from "../../Assets/Projects/LemonMaze.png";
import cosmiclink from "../../Assets/Projects/CosmicLink.png";
import chrono from "../../Assets/Projects/chrono.png";
import tboi from "../../Assets/Projects/TBOI.png";
import breizhcoin from "../../Assets/Projects/breizhcoin.png";
import portfolio from "../../Assets/Projects/portfolio.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Mes <strong className="blue">Projets </strong>
        </h1>
        <p style={{ color: "white" }}>
          Voici quelques projets sur lesquels j'ai travaillé :
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={lemonmaze}
              title="LemonMaze API"
              description="API en RESTful sous express.js pour communiquer avec l'application mobile LemonMaze via requêtes HTTP."
              ghLink="https://github.com/Theo22100/APILemonMaze"
              techStack={["Express"]}
            />
            
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={lemonmaze}
              title="LemonMaze"
              description="LemonMaze est une application mobile sous Flutter, qui a pour but de faire découvrir Rennes sous une sorte de suites d'énigmes en fonction d'un parcours, avec des récompenses à la clé. "
              ghLink="https://github.com/Theo22100/Lemon_Maze"
              techStack={["Flutter", "Javascript"]}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={cosmiclink}
              title="CosmicLink"
              description="CosmicLink est un réseau social, avec panel d'administration sous le format d'étoiles / constellations, codé sous PHP natif."
              ghLink="https://github.com/Theo22100/CosmicLink"
              youtubeLink="https://youtube.com/watch?v=3yVybmKT5d0"
              techStack={["Php", "Javascript","Html","Css"]}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chrono}
              title="Minuteur mobile"
              description="Application mobile en Kotlin, propose trois minuteurs pour les œufs, qui peuvent être redémarrés et lancés, ainsi que des minuteurs personnalisables pouvant être modifiés et supprimés avec notification sonore. "
              ghLink="https://github.com/Theo22100/MDS-ExamMobile2024"
              techStack={["Kotlin"]}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={breizhcoin}
              title="BreizhCoin"
              description="Projet PhP de L2, où nous devions faire la partie Back d'un site web comme Leboncoin, ainsi qu'un peu de Front."
              ghLink="https://github.com/Theo22100/BreizhCoin"
              youtubeLink="https://youtu.be/OqgS7SW_8tU"
              techStack={["Php", "Javascript", "Html", "Css"]}
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={tboi}
              title="TheBindingOfIsaac"
              description="Projet de L2 qui était la création d'un jeu qui ressemble à TheBindingOfIsaac en Java."
              ghLink="https://github.com/Theo22100/TheBindingOfIsaac"
              techStack={["Java"]}
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={portfolio}
              title="Portfolio V1"
              description="Ancien Portfolio pour essayer Vue.js."
              ghLink="https://github.com/Theo22100/PortFolio"
              techStack={["Vuejs", "Javascript","Html","Css"]}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
