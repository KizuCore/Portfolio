import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import "../../Assets/style/Footer/Footer.css";

function Footer() {
  const { t } = useTranslation();
  let date = new Date();
  let year = date.getFullYear();

  return (
    <footer className="footer">
      <Container fluid>
        <Row className="text-center text-md-left">
          <Col xs="12" md="4" className="footer-copywright py-2">
            <h3>
              {t("bytheo1")}{" "}
              <a
                href="https://github.com/Theo22100"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("github_profile_link")}
              >
                Theo22100
              </a>
            </h3>
          </Col>
          <Col xs="12" md="4" className="footer-copywright py-2">
            <h3>
              Copyright © {year} - {t("portfolio_theo")}
            </h3>
          </Col>
          <Col xs="12" md="4" className="footer-body py-2">
            <ul className="footer-icons">
              <li className="social-icons-footer">
                <a
                  href="https://github.com/Theo22100"
                  style={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("github_profile_link")}
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons-footer">
                <a
                  href="https://www.linkedin.com/in/théo-guérin-b20630192/"
                  style={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("linkedin_profile_link")}
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons-footer">
                <a
                  href="mailto:theo.guerin35000@gmail.com"
                  style={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("email_link")}
                >
                  <AiOutlineMail />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
