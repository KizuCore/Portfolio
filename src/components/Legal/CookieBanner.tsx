import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { updateConsent } from "../Utils/consent";

const LS_KEY = "cookie-consent";

export default function CookieBanner() {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(LS_KEY);
        if (!saved) setVisible(true);
    }, []);

    if (!visible) return null;

    return (
        <div
            className="cookie-banner"
            role="dialog"
            aria-live="polite"
            style={{
                position: "fixed",
                left: 0, right: 0, bottom: 0,
                zIndex: 1000,
                background: "rgba(0,0,0,0.92)",
                color: "#fff",
                padding: "12px 0"
            }}
        >
            <Container className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
                <div>
                    {t("cookie_banner.text")}
                    <a
                        href="/politique-de-confidentialite"
                        className="ms-2 text-decoration-underline"
                        style={{ color: "#ddd" }}
                    >
                        {t("cookie_banner.learn_more")}
                    </a>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <button
                        className="btn btn-light btn-sm"
                        onClick={() => { updateConsent(false); setVisible(false); }}
                    >
                        {t("cookie_banner.decline")}
                    </button>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => { updateConsent(true); setVisible(false); }}
                    >
                        {t("cookie_banner.accept")}
                    </button>

                    <button
                        type="button"
                        className="btn btn-link btn-sm ms-2 p-0 align-baseline text-decoration-underline"
                        style={{ color: "#ddd" }}
                        onClick={() => window.openCookiePreferences?.()}
                        aria-label={t("cookie_banner.manage")}
                    >
                        {t("cookie_banner.manage")}
                    </button>
                </div>
            </Container>
        </div>
    );
}
