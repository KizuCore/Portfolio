import { useState, ChangeEvent, FormEvent } from "react";
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

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseVariant, setResponseVariant] = useState<"success" | "danger" | "">("");
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const hcaptchaSiteKey = "b016c3fe-2d68-429c-a918-c6801962237c";

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleHcaptchaVerify = (token: string) => {
    setHcaptchaToken(token);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hcaptchaToken) {
      setResponseMessage(t("captcha_required"));
      setResponseVariant("danger");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, hcaptchaToken }),
      });

      const data = await response.json();
      if (data.success) {
        setResponseMessage(t("message_success"));
        setResponseVariant("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setHcaptchaToken(null);
      } else {
        setResponseMessage(t("message_fail"));
        setResponseVariant("danger");
      }
    } catch (error) {
      setResponseMessage(t("message_error"));
      setResponseVariant("danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center pb-5">
        <Col md={7}>
          <p style={{ fontSize: "1.5em" }} className="pb-5">
            {t("contact")}{" "}<span className="blue">{t("contact_me")}</span> !
          </p>

          {responseMessage && (
            <Alert
              variant={responseVariant}
              onClose={() => setResponseMessage("")}
              dismissible
            >
              {responseMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="background-box">
            <Row>
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

            <div className="captcha-container mb-4">
              <HCaptcha
                sitekey={hcaptchaSiteKey}
                onVerify={handleHcaptchaVerify}
              />
            </div>

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
                    <AiOutlineMail style={{ marginRight: "5px" }} className="mb-1" />{t("send_message")}
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
