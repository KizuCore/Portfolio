import { useTranslation } from "react-i18next";
import ContactForm from "./ContactForm";
import ContactAside from "./ContactAside";
import "../../assets/styles/Contact/Contact.css";

export default function Contact() {
  const { t } = useTranslation();
  return <section className="contact-page" aria-labelledby="contact-title">
    <div className="contact-layout">
      <header className="contact-header">
        <h1 id="contact-title">{t("social")}</h1>
        <p className="contact-lead">{t("contact_intro")}</p>
      </header>
      {/* L’ordre du DOM correspond à l’ordre visuel : le formulaire vient en premier, y compris sur mobile. */}
      <div className="contact-columns">
        <ContactForm />
        <ContactAside />
      </div>
    </div>
  </section>;
}
