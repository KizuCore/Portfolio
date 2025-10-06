import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getConsent, updateConsent } from "../Utils/consent";

export default function CookiePreferencesModal() {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const [analyticsOn, setAnalyticsOn] = useState(false);

    useEffect(() => {
        // expose un "hook" global simple
        window.openCookiePreferences = () => {
            const current = getConsent(); // "granted" | "denied" | null
            setAnalyticsOn(current === "granted");
            setShow(true);
        };
        return () => { delete window.openCookiePreferences; };
    }, []);

    const handleSave = () => {
        updateConsent(analyticsOn);
        setShow(false);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} centered aria-labelledby="cookie-prefs-title">
            <Modal.Header closeButton>
                <Modal.Title id="cookie-prefs-title">
                    {t("cookie_prefs.title")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="mb-3">
                    {t("cookie_prefs.intro_1")}{" "}
                    <strong>Google Analytics (GA4)</strong> {t("cookie_prefs.intro_2")}
                </p>

                <Form>
                    <Form.Check
                        type="switch"
                        id="consent-analytics"
                        label={t("cookie_prefs.analytics_label")}
                        checked={analyticsOn}
                        onChange={(e) => setAnalyticsOn(e.currentTarget.checked)}
                    />
                    <Form.Text className="text-muted">
                        {t("cookie_prefs.note")}
                    </Form.Text>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => setShow(false)}>
                    {t("common.cancel")}
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    {t("common.save")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
