import { JSX } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "../../assets/styles/Legals/Legals.css";
import Particle from "../../utils/Particle";

function PolitiqueCookies(): JSX.Element {
    const { i18n } = useTranslation();
    const lastUpdateHuman = "13/03/2026";
    const lastUpdateISO = "2026-03-13";
    const currentLang = (i18n.resolvedLanguage ?? i18n.language ?? "fr").split("-")[0].toLowerCase();
    const legalLang = currentLang === "es" ? "en" : currentLang === "bzh" ? "fr" : currentLang === "en" ? "en" : "fr";
    const tx = i18n.getFixedT(legalLang);

    return (
        <Container fluid className="legal-page legal-cookie-page py-5 mb-4" id="politique-cookies">
            <div aria-hidden="true" role="presentation">
                <Particle />
            </div>

            <Container className="legal-content-container pt-4 pt-md-5 mt-3 mt-md-0">
                <main id="main-content" role="main" aria-labelledby="cookie-policy-title">
                    <Row className="justify-content-center p-0">
                        <h1 id="cookie-policy-title" className="custom-title legal-title pb-4 pt-4 mt-4">
                            {tx("cookie_policy.title")}
                        </h1>

                        <Col md={10} lg={9}>
                            <div className="background-box-2">
                                <div className="legal-info-box">
                                    <section className="mb-4" aria-labelledby="cp-what-title">
                                        <h2 id="cp-what-title" className="h4">
                                            {tx("cookie_policy.what.title")}
                                        </h2>
                                        <p>{tx("cookie_policy.what.p1")}</p>
                                        <p>{tx("cookie_policy.what.p2")}</p>
                                    </section>

                                    <section className="mb-4" aria-labelledby="cp-types-title">
                                        <h2 id="cp-types-title" className="h4">
                                            {tx("cookie_policy.types.title")}
                                        </h2>
                                        <ul>
                                            <li>{tx("cookie_policy.types.necessary")}</li>
                                            <li>{tx("cookie_policy.types.analytics")}</li>
                                        </ul>
                                    </section>

                                    <section className="mb-4" aria-labelledby="cp-use-title">
                                        <h2 id="cp-use-title" className="h4">
                                            {tx("cookie_policy.use.title")}
                                        </h2>
                                        <p>{tx("cookie_policy.use.p1")}</p>
                                        <p>{tx("cookie_policy.use.p2")}</p>
                                    </section>

                                    <section className="mb-4" aria-labelledby="cp-duration-title">
                                        <h2 id="cp-duration-title" className="h4">
                                            {tx("cookie_policy.duration.title")}
                                        </h2>
                                        <p>{tx("cookie_policy.duration.p1")}</p>
                                    </section>

                                    <section className="mb-4" aria-labelledby="cp-manage-title">
                                        <h2 id="cp-manage-title" className="h4">
                                            {tx("cookie_policy.manage.title")}
                                        </h2>
                                        <p>{tx("cookie_policy.manage.p1")}</p>
                                        <button
                                            type="button"
                                            className="btn btn-sm cookie-policy-manage-btn"
                                            onClick={() => window.openCookiePreferences?.()}
                                            aria-label={tx("cookie_policy.manage.button")}
                                        >
                                            {tx("cookie_policy.manage.button")}
                                        </button>
                                    </section>

                                    <section className="mb-2" aria-labelledby="cp-update-title">
                                        <h2 id="cp-update-title" className="h4">
                                            {tx("cookie_policy.update.title")}
                                        </h2>
                                        <p>{tx("cookie_policy.update.p1")}</p>
                                        <p className="legal-updated-text">
                                            <time dateTime={lastUpdateISO}>
                                                {tx("cookie_policy.last_update", { date: lastUpdateHuman })}
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

export default PolitiqueCookies;
