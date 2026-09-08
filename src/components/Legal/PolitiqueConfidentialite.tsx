import { JSX } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../../assets/styles/Legals/Legals.css";
import { SITE_PROFILE, getSiteUrl } from "../../config/site";

function PolitiqueConfidentialite(): JSX.Element {
  const { i18n } = useTranslation();
  const lastUpdateHuman = "13/03/2026";
  const lastUpdateISO = "2026-03-13";
  const email = SITE_PROFILE.email;
  const siteHostname = new URL(getSiteUrl()).hostname;
  const currentLang = (i18n.resolvedLanguage ?? i18n.language ?? "fr").split("-")[0].toLowerCase();
  const legalLang = currentLang === "es" ? "en" : currentLang === "bzh" ? "fr" : currentLang === "en" ? "en" : "fr";
  const tx = i18n.getFixedT(legalLang);

  return (
    <Container fluid className="legal-page" id="politique-confidentialite">
      <Container className="legal-content-container">
        <section aria-labelledby="page-title">
          <Row className="justify-content-center p-0">
            <h1 id="page-title" className="legal-title">
              {tx("politique_confidentialite.title")}
            </h1>

            <Col xs={12}>
              <div className="legal-document">
                <div className="legal-info-box">
                  <section className="mb-4" aria-labelledby="pc-controller-title">
                    <h2 id="pc-controller-title" className="h4">
                      {tx("politique_confidentialite.controller.title")}
                    </h2>
                    <p>{tx("politique_confidentialite.controller.intro")}</p>

                    <p>
                      <strong>{tx("politique_confidentialite.controller.name_line")}</strong>
                    </p>

                    <address>
                      <p>
                        {tx("politique_confidentialite.controller.email_label")}: <a href={`mailto:${email}`}>{email}</a>
                      </p>
                      <p>
                        {tx("politique_confidentialite.controller.site_label")}: <strong>{siteHostname}</strong>
                      </p>
                    </address>
                  </section>

                  <section className="mb-4" aria-labelledby="pc-data-title">
                    <h2 id="pc-data-title" className="h4">
                      {tx("politique_confidentialite.data.title")}
                    </h2>
                    <p>{tx("politique_confidentialite.data.intro")}</p>
                    <ul>
                      <li>{tx("politique_confidentialite.data.contact_form")}</li>
                      <li>{tx("politique_confidentialite.data.analytics")}</li>
                    </ul>
                    <p>{tx("politique_confidentialite.data.legal_basis_intro")}</p>
                    <ul>
                      <li>{tx("politique_confidentialite.data.legal_basis_contact")}</li>
                      <li>{tx("politique_confidentialite.data.legal_basis_analytics")}</li>
                    </ul>
                  </section>

                  <section className="mb-4" aria-labelledby="pc-ga4-title">
                    <h2 id="pc-ga4-title" className="h4">
                      {tx("politique_confidentialite.ga4.title")}
                    </h2>
                    <p>{tx("politique_confidentialite.ga4.p1")}</p>
                    <p>{tx("politique_confidentialite.ga4.p2")}</p>
                    <p>
                      <Link to="/politique-des-cookies">{tx("footer_links.cookies_policy")}</Link>
                    </p>

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      aria-label={tx("politique_confidentialite.ga4.manage_button_aria")}
                      onClick={() => window.openCookiePreferences?.()}
                    >
                      {tx("politique_confidentialite.ga4.manage_button")}
                    </button>
                  </section>

                  <section className="mb-4" aria-labelledby="pc-recipients-title">
                    <h2 id="pc-recipients-title" className="h4">
                      {tx("politique_confidentialite.recipients.title")}
                    </h2>
                    <p>{tx("politique_confidentialite.recipients.text")}</p>
                  </section>

                  <section className="mb-4" aria-labelledby="pc-rights-title">
                    <h2 id="pc-rights-title" className="h4">
                      {tx("politique_confidentialite.rights.title")}
                    </h2>
                    <p>{tx("politique_confidentialite.rights.intro")}</p>
                    <ul>
                      <li>{tx("politique_confidentialite.rights.access")}</li>
                      <li>{tx("politique_confidentialite.rights.rectification")}</li>
                      <li>{tx("politique_confidentialite.rights.erasure")}</li>
                      <li>{tx("politique_confidentialite.rights.restriction")}</li>
                      <li>{tx("politique_confidentialite.rights.objection")}</li>
                      <li>{tx("politique_confidentialite.rights.portability")}</li>
                    </ul>
                    <p>
                      {tx("politique_confidentialite.rights.exercise")} <a href={`mailto:${email}`}>{email}</a>.
                    </p>
                  </section>

                  <section className="mb-4" aria-labelledby="pc-security-title">
                    <h2 id="pc-security-title" className="h4">
                      {tx("politique_confidentialite.security.title")}
                    </h2>
                    <p>{tx("politique_confidentialite.security.text")}</p>
                  </section>

                  <section className="mb-4" aria-labelledby="pc-changes-title">
                    <h2 id="pc-changes-title" className="h4">
                      {tx("politique_confidentialite.changes.title")}
                    </h2>
                    <p>{tx("politique_confidentialite.changes.text")}</p>
                  </section>

                  <section className="mb-2" aria-labelledby="pc-contact-update-title">
                    <h2 id="pc-contact-update-title" className="h4">
                      {tx("politique_confidentialite.contact_update.title")}
                    </h2>
                    <p>
                      {tx("politique_confidentialite.contact_update.text")} <a href={`mailto:${email}`}>{email}</a>.
                    </p>

                    <p className="legal-updated-text">
                      <time dateTime={lastUpdateISO}>
                        {tx("politique_confidentialite.last_update", { date: lastUpdateHuman })}
                      </time>
                    </p>
                  </section>
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </Container>
  );
}

export default PolitiqueConfidentialite;
