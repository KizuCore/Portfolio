import { JSX } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Particle from "../Utils/Particle";
import "../../assets/styles/Legals/Legals.css";

function MentionsLegales(): JSX.Element {
    const { t } = useTranslation();
    const lastUpdate = "06/10/2025"; // Date de dernière MAJ

    return (
        <Container fluid className="about-section pt-5 mb-4" id="mentions-legales">
            <Particle />
            <Container className="home-content pt-md-0 pt-5 mt-3 mt-md-0">
                <Row className="justify-content-center p-0">
                    <h1 className="custom-title pb-5 pt-5 mt-5">
                        {t("mentions_legales.title")}
                    </h1>

                    <Col md={10} lg={9} className="order-1">
                        <div className="background-box-2">
                            <div className="contact-info-box">
                                {/* 1. Éditeur */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("mentions_legales.editor.title")}</h2>
                                    <p>{t("mentions_legales.editor.site")}</p>
                                    <p>{t("mentions_legales.editor.publisher")}</p>
                                    <p>{t("mentions_legales.editor.address")}</p>
                                    <p>{t("mentions_legales.editor.contact")}</p>
                                    <p>{t("mentions_legales.editor.director")}</p>
                                </section>

                                {/* 2. Hébergeur */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("mentions_legales.host.title")}</h2>
                                    <p>{t("mentions_legales.host.name")}</p>
                                    <p>{t("mentions_legales.host.address")}</p>
                                    <p>{t("mentions_legales.host.website")}</p>
                                    <p>{t("mentions_legales.host.email")}</p>
                                </section>

                                {/* 3. Nom de domaine */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("mentions_legales.domain.title")}</h2>
                                    <p>{t("mentions_legales.domain.registrar")}</p>
                                    <p>{t("mentions_legales.domain.registrar_address")}</p>
                                    <p>{t("mentions_legales.domain.registrar_site")}</p>
                                </section>

                                {/* 4. Statut du site */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("mentions_legales.status.title")}</h2>
                                    <p>{t("mentions_legales.status.text")}</p>
                                </section>

                                {/* 5. Propriété intellectuelle */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("mentions_legales.ip.title")}</h2>
                                    <p>{t("mentions_legales.ip.text")}</p>
                                </section>

                                {/* 6. Liens externes */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("mentions_legales.links.title")}</h2>
                                    <p>{t("mentions_legales.links.text")}</p>
                                </section>

                                {/* 7. Données personnelles */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("mentions_legales.privacy.title")}</h2>
                                    <p>{t("mentions_legales.privacy.p1")}</p>
                                    <p>{t("mentions_legales.privacy.p2")}</p>
                                    <p>{t("mentions_legales.privacy.p3")}</p>
                                </section>

                                {/* 8. Cookies & Analytics */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("mentions_legales.cookies.title")}</h2>
                                    <p>{t("mentions_legales.cookies.p1")}</p>
                                    <p>{t("mentions_legales.cookies.p2")}</p>
                                    <p>{t("mentions_legales.cookies.p3")}</p>
                                </section>

                                {/* 9. Sécurité */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("mentions_legales.security.title")}</h2>
                                    <p>{t("mentions_legales.security.text")}</p>
                                </section>

                                {/* 10. Droit applicable */}
                                <section className="mb-4">
                                    <h2 className="h4">{t("mentions_legales.law.title")}</h2>
                                    <p>{t("mentions_legales.law.text")}</p>
                                </section>

                                {/* 11. Contact */}
                                <section className="mb-2">
                                    <h2 className="h4">{t("mentions_legales.contact.title")}</h2>
                                    <p>{t("mentions_legales.contact.text")}</p>
                                    <p className="text-muted">
                                        {t("mentions_legales.last_update", { date: lastUpdate })}
                                    </p>
                                </section>
                                {/* Clause de référence */}
                                <p className="mt-3">
                                    <em>{t("mentions_legales.reference_clause")}</em>
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
