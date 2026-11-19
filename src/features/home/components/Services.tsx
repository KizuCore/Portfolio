import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SERVICE_ITEMS } from "../data/services";
import { getLocalizedPath, getShortLocale, splitLocalizedPath } from "@/shared/config/seo";
import "../styles/Services.css";

export default function Services() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const locale = splitLocalizedPath(pathname).locale ?? getShortLocale(i18n.language);
  return <section className="home-services" id="services" aria-labelledby="services-title">
    <header className="home-services-header">
      <div>
        <p className="business-eyebrow">02 / {t("services.eyebrow")}</p>
        <h2 id="services-title">{t("services.title")}</h2>
        <p>{t("services.subtitle")}</p>
      </div>
      <Link className="business-text-link" to={getLocalizedPath(locale, "/contact")}>{t("services.cta")} ↗</Link>
    </header>
    <div className="home-services-grid">
      {SERVICE_ITEMS.map((item) => {
        const Icon = item.icon;
        const serviceTitle = t(`services.items.${item.key}.title`);
        return <article className="service-tile" key={item.key}>
          <Icon className="service-tile-icon" aria-hidden="true" />
          <h3>{serviceTitle}</h3>
          <span className="service-tile-technology">{item.technology}</span>
          <p>{t(`services.items.${item.key}.description`)}</p>
          {item.path && <Link
            className="business-text-link"
            to={item.path}
            hrefLang="fr"
            aria-label={`${t("home_offer.service_link")} : ${serviceTitle}`}
          >{t("home_offer.service_link")} <span aria-hidden="true">↗</span></Link>}
        </article>;
      })}
    </div>
  </section>;
}
