import { JSX } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiCode, FiLayers, FiServer, FiTrendingUp } from "react-icons/fi";

type ServiceItem = {
  key: string;
  icon: JSX.Element;
};

const SERVICE_ITEMS: ServiceItem[] = [
  { key: "websites", icon: <FiCode aria-hidden="true" /> },
  { key: "apps", icon: <FiLayers aria-hidden="true" /> },
  { key: "api", icon: <FiServer aria-hidden="true" /> },
  { key: "optimization", icon: <FiTrendingUp aria-hidden="true" /> },
];

function Services() {
  const { t } = useTranslation();

  return (
    <section className="services-section" aria-labelledby="services-title">
      <div className="services-surface">
        <div className="services-header">
          <div className="services-intro">
            <span className="services-eyebrow">
              {t("services.eyebrow", { defaultValue: "Ce que je propose" })}
            </span>

            <motion.h2
              id="services-title"
              className="custom-title custom-title-2 services-title"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
            >
              {t("services.title")}
            </motion.h2>

            <p className="services-subtitle">{t("services.subtitle")}</p>
          </div>

          <div className="services-actions">
            <Link to="/contact" className="services-cta services-cta-primary">
              {t("services.cta")}
            </Link>
            <Link to="/project" className="services-cta services-cta-secondary">
              {t("projects")}
            </Link>
          </div>
        </div>

        <div className="services-grid">
          {SERVICE_ITEMS.map((item, index) => (
            <motion.article
              key={item.key}
              className="service-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
            >
              <div className="service-card-head">
                <span className="service-icon">{item.icon}</span>
                <span className="service-step">0{index + 1}</span>
              </div>
              <h3 className="service-card-title">{t(`services.items.${item.key}.title`)}</h3>
              <p className="service-card-description">{t(`services.items.${item.key}.description`)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
