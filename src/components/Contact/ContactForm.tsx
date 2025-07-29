// Import des hooks React et types
import { useState, ChangeEvent, FormEvent } from "react";

// Styles et dépendances
import '../../assets/styles/Contact/Contact.css';
import {
  Form,
  Button,
  Alert,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { AiOutlineMail } from "react-icons/ai";

// Définition du type pour les champs du formulaire
interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function ContactForm() {
  const { t } = useTranslation();

  // État pour les champs du formulaire
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // État pour savoir si le formulaire est en cours de soumission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // États pour le message de retour et son type (succès/erreur)
  const [responseMessage, setResponseMessage] = useState("");
  const [responseVariant, setResponseVariant] = useState<"success" | "danger" | "">("");

  // État pour le token hCaptcha
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);

  // Clé publique hCaptcha
  const hcaptchaSiteKey = "b016c3fe-2d68-429c-a918-c6801962237c";

  // MAJ des champs du formulaire
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Récupère le token hCaptcha après validation
  const handleHcaptchaVerify = (token: string) => {
    setHcaptchaToken(token);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérifie que le captcha est validé
    if (!hcaptchaToken) {
      setResponseMessage(t("captcha_required"));
      setResponseVariant("danger");
      return;
    }

    setIsSubmitting(true); // Désactive le bouton pour éviter les doubles clics

    try {
      // Appel à l’API backend avec les données du formulaire
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, hcaptchaToken }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Succès : affiche message + réinitialise le formulaire
        setResponseMessage(data.message || t("message_success"));
        setResponseVariant("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setHcaptchaToken(null);
      } else {
        // Échec côté backend : affiche le message retourné
        setResponseMessage(data.message || t("message_fail"));
        setResponseVariant("danger");
      }
    } catch (error: any) {
      // Erreur inattendue (réseau, serveur planté, etc.)
      console.error("Erreur lors de l’envoi du formulaire :", error);
      setResponseMessage(error?.message || t("message_error"));
      setResponseVariant("danger");
    } finally {
      setIsSubmitting(false); // Réactive le bouton d’envoi
    }
  };


  return (
    <Container>
      {/* Message de retour (succès ou erreur) */}
      {responseMessage && (
        <Alert
          variant={responseVariant}
          onClose={() => setResponseMessage("")}
          dismissible
        >
          {responseMessage}
        </Alert>
      )}

      <Row className="justify-content-center pb-5">
        <Col md={8} className="p-0 m-0">

          {/* Formulaire principal */}
          <Form onSubmit={handleSubmit} className="background-box">
            <Row>
              {/* Champ Nom */}
              <Col md={6} className="mb-3">
                <Form.Group controlId="formName">
                  <Form.Label>{t("name")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t("name_placeholder")}
                    className="custom-form"
                  />
                </Form.Group>
              </Col>

              {/* Champ Email */}
              <Col md={6} className="mb-3">
                <Form.Group controlId="formEmail">
                  <Form.Label>{t("email")}</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t("email_placeholder")}
                    className="custom-form"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Champ Sujet */}
            <Form.Group controlId="formSubject" className="mb-3">
              <Form.Label>{t("subject")}</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder={t("subject_placeholder")}
                className="custom-form"
              />
            </Form.Group>

            {/* Champ Message */}
            <Form.Group controlId="formMessage" className="mb-4">
              <Form.Label>{t("message")}</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                placeholder={t("message_placeholder")}
                className="custom-form"
              />
            </Form.Group>

            {/* hCaptcha */}
            <div className="captcha-container mb-4">
              <HCaptcha
                sitekey={hcaptchaSiteKey}
                onVerify={handleHcaptchaVerify}
              />
            </div>

            {/* Bouton d'envoi */}
            <div>
              <Button
                type="submit"
                className="button-cv p-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    {t("sending")}
                  </>
                ) : (
                  <>
                    <AiOutlineMail style={{ marginRight: "5px" }} className="mb-1" />
                    {t("send_message")}
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactForm;
