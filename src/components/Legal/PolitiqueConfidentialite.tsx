import { JSX } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "../../assets/styles/Legals/Legals.css";
import Particle from "../../utils/Particle";

function PolitiqueConfidentialite(): JSX.Element {
    const { t } = useTranslation();
    const lastUpdate = "06/10/2025";
    const email = "theo.guerin35000@gmail.com";

    return (
        <Container fluid className="about-section mt-5" id="politique-confidentialite">
            <Particle />
            <div className="background-dim" />
            <Container className="home-content pt-md-0 pt-5 mt-3 mt-md-0">
                <Row className="justify-content-center p-0">
                    <Col md={10} lg={9}>
                        <div className="background-box-2">
                            <h1 className="custom-title pb-3">
                                {t("politique_confidentialite.title")}
                            </h1>

                            <div className="contact-info-box">
                                {/* 1. Responsable */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("politique_confidentialite.controller.title")}</h2>
                                    <p>{t("politique_confidentialite.controller.intro")}</p>
                                    <p><strong>{t("politique_confidentialite.controller.name_line")}</strong></p>
                                    <p>
                                        {t("politique_confidentialite.controller.email_label")}:{" "}
                                        <a href={`mailto:${email}`}>{email}</a>
                                    </p>
                                    <p>
                                        {t("politique_confidentialite.controller.site_label")}:{" "}
                                        <strong>theo-guerin.fr</strong>
                                    </p>
                                </section>

                                {/* 2. Données collectées */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("politique_confidentialite.data.title")}</h2>
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
                                <section className="mb-4">
                                    <h2 className="h4">{t("politique_confidentialite.ga4.title")}</h2>
                                    <p>{t("politique_confidentialite.ga4.p1")}</p>
                                    <p>{t("politique_confidentialite.ga4.p2")}</p>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => window.openCookiePreferences?.()}
                                    >
                                        {t("politique_confidentialite.ga4.manage_button")}
                                    </button>
                                </section>

                                {/* 4. Destinataires */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("politique_confidentialite.recipients.title")}</h2>
                                    <p>{t("politique_confidentialite.recipients.text")}</p>
                                </section>

                                {/* 5. Droits */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("politique_confidentialite.rights.title")}</h2>
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
                                <section className="mb-4">
                                    <h2 className="h4">{t("politique_confidentialite.security.title")}</h2>
                                    <p>{t("politique_confidentialite.security.text")}</p>
                                </section>

                                {/* 7. Modifications */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("politique_confidentialite.changes.title")}</h2>
                                    <p>{t("politique_confidentialite.changes.text")}</p>
                                </section>

                                {/* 8. Contact & MAJ */}
                                <section className="mb-2">
                                    <h2 className="h4">{t("politique_confidentialite.contact_update.title")}</h2>
                                    <p>
                                        {t("politique_confidentialite.contact_update.text")}{" "}
                                        <a href={`mailto:${email}`}>{email}</a>.
                                    </p>
                                    <p className="text-muted">
                                        {t("politique_confidentialite.last_update", { date: lastUpdate })}
                                    </p>
                                </section>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default PolitiqueConfidentialite;
