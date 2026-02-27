import { JSX } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "../../assets/styles/Legals/Legals.css";
import Particle from "../../utils/Particle";

function MentionsLegales(): JSX.Element {
  const { t } = useTranslation();
  const lastUpdate = "10/10/2025";

  return (
    <Container fluid className="legal-page py-5 mb-4" id="mentions-legales">
      <Particle />
      <Container className="legal-content-container pt-4 pt-md-5 mt-3 mt-md-0">
        <Row className="justify-content-center p-0">
          <h1 className="custom-title legal-title pb-4 pt-4 mt-4">{t("mentions_legales.title")}</h1>

          <Col md={10} lg={9} className="order-1">
            <div className="background-box-2">
              <div className="legal-info-box">
                <section className="mb-4">
                  <h2 className="h4">{t("mentions_legales.editor.title")}</h2>
                  <p>{t("mentions_legales.editor.site")}</p>
                  <p>{t("mentions_legales.editor.publisher")}</p>
                  <p>{t("mentions_legales.editor.address")}</p>
                  <p>{t("mentions_legales.editor.contact")}</p>
                  <p>{t("mentions_legales.editor.director")}</p>
                </section>

                <section className="mb-4">
                  <h2 className="h4">{t("mentions_legales.host.title")}</h2>
                  <p>{t("mentions_legales.host.name")}</p>
                  <p>{t("mentions_legales.host.address")}</p>
                  <p>{t("mentions_legales.host.website")}</p>
                  <p>{t("mentions_legales.host.email")}</p>
                </section>

                <section className="mb-4">
                  <h2 className="h4">{t("mentions_legales.domain.title")}</h2>
                  <p>{t("mentions_legales.domain.registrar")}</p>
                  <p>{t("mentions_legales.domain.registrar_address")}</p>
                  <p>{t("mentions_legales.domain.registrar_site")}</p>
                </section>

                <section className="mb-4">
                  <h2 className="h4">{t("mentions_legales.status.title")}</h2>
                  <p>{t("mentions_legales.status.text")}</p>
                </section>

                <section className="mb-4">
                  <h2 className="h4">{t("mentions_legales.ip.title")}</h2>
                  <p>{t("mentions_legales.ip.text")}</p>
                </section>

                <section className="mb-4">
                  <h2 className="h4">{t("mentions_legales.links.title")}</h2>
                  <p>{t("mentions_legales.links.text")}</p>
                </section>

                <section className="mb-4">
                  <h2 className="h4">{t("mentions_legales.privacy.title")}</h2>
                  <p>{t("mentions_legales.privacy.p1")}</p>
                  <p>{t("mentions_legales.privacy.p2")}</p>
                  <p>{t("mentions_legales.privacy.p3")}</p>
                </section>

                <section className="mb-4">
                  <h2 className="h4">{t("mentions_legales.cookies.title")}</h2>
                  <p>{t("mentions_legales.cookies.p1")}</p>
                  <p>{t("mentions_legales.cookies.p2")}</p>
                  <p>{t("mentions_legales.cookies.p3")}</p>
                </section>

                <section className="mb-4">
                  <h2 className="h4">{t("mentions_legales.security.title")}</h2>
                  <p>{t("mentions_legales.security.text")}</p>
                </section>

                <section className="mb-4">
                  <h2 className="h4">{t("mentions_legales.law.title")}</h2>
                  <p>{t("mentions_legales.law.text")}</p>
                </section>

                <section className="mb-2">
                  <h2 className="h4">{t("mentions_legales.contact.title")}</h2>
                  <p>{t("mentions_legales.contact.text")}</p>
                </section>

                <p className="mt-5">{t("mentions_legales.business_info")}</p>
                <p className="mt-3">
                  <em>{t("mentions_legales.reference_clause")}</em>
                </p>
                <p className="text-muted legal-updated-text">
                  {t("mentions_legales.last_update", { date: lastUpdate })}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default MentionsLegales;
