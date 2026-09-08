import { useTranslation } from "react-i18next";
import { SITE_PROFILE, SOCIAL_LINKS } from "../../config/site";

const DETAIL_KEYS = ["response", "location", "rate"] as const;

// Supporting information stays secondary to the form, with one readable definition list.
export default function ContactAside() {
  const { t } = useTranslation();
  return <aside className="contact-aside" aria-labelledby="contact-aside-title">
    <p className="contact-availability"><span aria-hidden="true" />{t("contact_meta_availability_value")}</p>
    <h2 id="contact-aside-title">{t("contact_panel_title")}</h2>
    <p className="contact-panel-description">{t("contact_panel_description")}</p>
    <ol className="contact-steps">
      {[1, 2, 3].map((step) => <li key={step}>{t(`contact_point_${step}`)}</li>)}
    </ol>
    <dl className="contact-details">
      {DETAIL_KEYS.map((key) => <div key={key}>
        <dt>{t(`contact_meta_${key}_label`)}</dt>
        <dd>{t(`contact_meta_${key}_value`)}</dd>
      </div>)}
    </dl>
    <div className="contact-direct">
      <a className="contact-email-link" href={`mailto:${SITE_PROFILE.email}`}>{SITE_PROFILE.email} <span aria-hidden="true">↗</span></a>
      <div className="contact-social-links">
        <a href={SOCIAL_LINKS.linkedin}>{t("contact_cta_linkedin")} <span aria-hidden="true">↗</span></a>
        <a href={SOCIAL_LINKS.github}>GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </aside>;
}
