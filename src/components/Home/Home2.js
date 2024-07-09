import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              <span className="blue"> INTRODUCTION </span>
            </h1>
            <p className="home-about-body">
              Je suis un jeune développeur qui adore programmer, et découvrir de nouvelles fonctionnalités afin d'approfondir mes connaissances techniques !
              <br />
              <br />Je parle couramment des classiques comme
              <i>
                <b className="blue"> Java, Flutter, PHP et Node.js. </b>
              </i>
              <br />
              <br />
              Mes centres d'intérêt sont la construction de nouveaux&nbsp;
                <b className="blue">Projets et la découverte de nouveaux langages !</b>
              <br />
              <br />
              Dans la mesure du possible, j'applique également ma passion pour le développement de projets 
              avec <b className="blue">Node.js </b>(&nbsp;
              <i>
                <b className="blue">
                  Librairie & Framework de Javascript&nbsp;
                </b>
              </i>
              )&nbsp; comme
                <b className="blue"> React.js</b>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" style={{ height: "16em" }} />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>RÉSEAUX</h1>
            <p>
            N'hésitez pas à me <span className="blue">contacter </span> !
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Theo22100"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/théo-guérin-b20630192/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
