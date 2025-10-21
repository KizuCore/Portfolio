import { JSX } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "../../assets/styles/Legals/Legals.css";
import Particle from "../../utils/Particle";

function PolitiqueConfidentialite(): JSX.Element {
  const { t } = useTranslation();

  // Date d'affichage lisible + dateTime normalisée pour <time>
  const lastUpdateHuman = "06/10/2025";
  const lastUpdateISO = "2025-10-06";

  const email = "theo.guerin35000@gmail.com";

  return (
    <Container fluid className="about-section pt-5 mb-4" id="politique-confidentialite">
      {/* Lien d'évitement pour clavier/lecteurs d'écran */}
      <a
        href="#main-content"
        className="skip-link"
      >
        {t("common.skip_to_content", "Aller au contenu")}
      </a>

      {/* Effet décoratif non vocalisable */}
      <div aria-hidden="true" role="presentation">
        <Particle />
      </div>

      <Container className="home-content pt-md-0 pt-5 mt-3 mt-md-0">
        <main id="main-content" role="main" aria-labelledby="page-title">
          <Row className="justify-content-center p-0">
            <h1 id="page-title" className="custom-title pb-5 pt-5 mt-5">
              {t("politique_confidentialite.title")}
            </h1>

            <Col md={10} lg={9}>
              <div className="background-box-2">
                <div className="contact-info-box">
                  {/* 1. Responsable */}
                  <section className="mb-4" aria-labelledby="pc-controller-title">
                    <h2 id="pc-controller-title" className="h4">
                      {t("politique_confidentialite.controller.title")}
                    </h2>
                    <p>{t("politique_confidentialite.controller.intro")}</p>

                    <p>
                      <strong>{t("politique_confidentialite.controller.name_line")}</strong>
                    </p>

                    <address>
                      <p>
                        {t("politique_confidentialite.controller.email_label")}:{" "}
                        <a href={`mailto:${email}`}>{email}</a>
                      </p>
                      <p>
                        {t("politique_confidentialite.controller.site_label")}:{" "}
                        <strong>theo-guerin.fr</strong>
                      </p>
                    </address>
                  </section>

                  {/* 2. Données collectées */}
                  <section className="mb-4" aria-labelledby="pc-data-title">
                    <h2 id="pc-data-title" className="h4">
                      {t("politique_confidentialite.data.title")}
                    </h2>
                    <p>{t("politique_confidentialite.data.intro")}</p>
                    <ul>
                      <li>{t("politique_confidentialite.data.contact_form")}</li>
                      <li>{t("politique_confidentialite.data.analytics")}</li>
                    </ul>
                    <p>{t("politique_confidentialite.data.legal_basis_intro")}</p>
                    <ul>
                      <li>{t("politique_confidentialite.data.legal_basis_contact")}</li>
                      <li>{t("politique_confidentialite.data.legal_basis_analytics")}</li>
                    </ul>
                  </section>

                  {/* 3. Google Analytics */}
                  <section className="mb-4" aria-labelledby="pc-ga4-title">
                    <h2 id="pc-ga4-title" className="h4">
                      {t("politique_confidentialite.ga4.title")}
                    </h2>
                    <p>{t("politique_confidentialite.ga4.p1")}</p>
                    <p>{t("politique_confidentialite.ga4.p2")}</p>

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      // Nom accessible explicite si le libellé est générique
                      aria-label={t("politique_confidentialite.ga4.manage_button_aria", "Gérer les préférences de cookies")}
                      onClick={() => window.openCookiePreferences?.()}
                    >
                      {t("politique_confidentialite.ga4.manage_button")}
                    </button>
                  </section>

                  {/* 4. Destinataires */}
                  <section className="mb-4" aria-labelledby="pc-recipients-title">
                    <h2 id="pc-recipients-title" className="h4">
                      {t("politique_confidentialite.recipients.title")}
                    </h2>
                    <p>{t("politique_confidentialite.recipients.text")}</p>
                  </section>

                  {/* 5. Droits */}
                  <section className="mb-4" aria-labelledby="pc-rights-title">
                    <h2 id="pc-rights-title" className="h4">
                      {t("politique_confidentialite.rights.title")}
                    </h2>
                    <p>{t("politique_confidentialite.rights.intro")}</p>
                    <ul>
                      <li>{t("politique_confidentialite.rights.access")}</li>
                      <li>{t("politique_confidentialite.rights.rectification")}</li>
                      <li>{t("politique_confidentialite.rights.erasure")}</li>
                      <li>{t("politique_confidentialite.rights.restriction")}</li>
                      <li>{t("politique_confidentialite.rights.objection")}</li>
                      <li>{t("politique_confidentialite.rights.portability")}</li>
                    </ul>
                    <p>
                      {t("politique_confidentialite.rights.exercise")}{" "}
                      <a href={`mailto:${email}`}>{email}</a>.
                    </p>
                  </section>

                  {/* 6. Sécurité */}
                  <section className="mb-4" aria-labelledby="pc-security-title">
                    <h2 id="pc-security-title" className="h4">
                      {t("politique_confidentialite.security.title")}
                    </h2>
                    <p>{t("politique_confidentialite.security.text")}</p>
                  </section>

                  {/* 7. Modifications */}
                  <section className="mb-4" aria-labelledby="pc-changes-title">
                    <h2 id="pc-changes-title" className="h4">
                      {t("politique_confidentialite.changes.title")}
                    </h2>
                    <p>{t("politique_confidentialite.changes.text")}</p>
                  </section>

                  {/* 8. Contact & MAJ */}
                  <section className="mb-2" aria-labelledby="pc-contact-update-title">
                    <h2 id="pc-contact-update-title" className="h4">
                      {t("politique_confidentialite.contact_update.title")}
                    </h2>
                    <p>
                      {t("politique_confidentialite.contact_update.text")}{" "}
                      <a href={`mailto:${email}`}>{email}</a>.
                    </p>

                    <p className="text-muted">
                      <time dateTime={lastUpdateISO}>
                        {t("politique_confidentialite.last_update", { date: lastUpdateHuman })}
                      </time>
                    </p>
                  </section>
                </div>
              </div>
            </Col>
          </Row>
        </main>
      </Container>
    </Container>
  );
}

export default PolitiqueConfidentialite;
