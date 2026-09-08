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
      {/* DOM and visual order agree: the form comes first, including on mobile. */}
      <div className="contact-columns">
        <ContactForm />
        <ContactAside />
      </div>
    </div>
  </section>;
}
