import React from "react";
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home/home-main.webp";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  const { t } = useTranslation();

  return (
    <section>
      <Container fluid className="home-section pt-5" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center">
            
            <Col md={7} className="home-header slide-in-left text-center text-md-left py-5">
              <h1 className="heading mb-3">
                {t('hello')}{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name mb-3">
                {t('iam')}
                <strong className="blue-title"> {t('name')}</strong>
              </h1>

              <div className="pt-3 blue-title">
                <Type />
              </div>
            </Col>

            
            <Col md={5} className="d-flex justify-content-center py-5">
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "90%" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
