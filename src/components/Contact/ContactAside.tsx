import { useTranslation } from "react-i18next";
import { SITE_PROFILE, SOCIAL_LINKS } from "../../config/site";
import { FiMail } from "@react-icons/all-files/fi/FiMail";
import { FiArrowUpRight } from "@react-icons/all-files/fi/FiArrowUpRight";
import { FiClock } from "@react-icons/all-files/fi/FiClock";
import { FiMapPin } from "@react-icons/all-files/fi/FiMapPin";
import { FiBriefcase } from "@react-icons/all-files/fi/FiBriefcase";
import { FiLinkedin } from "@react-icons/all-files/fi/FiLinkedin";
import { FiGithub } from "@react-icons/all-files/fi/FiGithub";

const DETAILS = [
  { key: "response", Icon: FiClock },
  { key: "location", Icon: FiMapPin },
  { key: "rate", Icon: FiBriefcase },
] as const;

// Direct contact and practical details share the same visual hierarchy.
export default function ContactAside() {
  const { t } = useTranslation();
  return <aside className="contact-aside" aria-labelledby="contact-aside-title">
    <section className="contact-direct-card">
      <div className="contact-card-heading">
        <span className="contact-card-icon"><FiMail aria-hidden="true" size={19} /></span>
        <h2 id="contact-aside-title">{t("contact_refresh.direct_title")}</h2>
      </div>
      <p className="contact-panel-description">{t("contact_refresh.direct_description")}</p>
      <a className="contact-email-link" href={`mailto:${SITE_PROFILE.email}`}><span>{SITE_PROFILE.email}</span><FiArrowUpRight aria-hidden="true" size={18} /></a>
      <div className="contact-social-links">
        <a href={SOCIAL_LINKS.linkedin}><FiLinkedin aria-hidden="true" />LinkedIn<FiArrowUpRight aria-hidden="true" /></a>
        <a href={SOCIAL_LINKS.github}><FiGithub aria-hidden="true" />GitHub<FiArrowUpRight aria-hidden="true" /></a>
      </div>
      <p className="contact-availability"><span aria-hidden="true" />{t("contact_meta_availability_value")}</p>
    </section>
    <section className="contact-details-card" aria-labelledby="contact-details-title">
      <h2 id="contact-details-title">{t("contact_refresh.details_title")}</h2>
      <dl className="contact-details">
        {DETAILS.map(({ key, Icon }) => <div key={key}>
          <dt><Icon aria-hidden="true" size={17} />{t(`contact_meta_${key}_label`)}</dt>
          <dd>{t(`contact_meta_${key}_value`)}</dd>
        </div>)}
      </dl>
    </section>
  </aside>;
}
