import type { ContactFormFieldName } from "../types/contact.types";

type ContactFormField = {
  name: ContactFormFieldName;
  controlId: string;
  labelKey: string;
  placeholderKey: string;
  type?: string;
  autoComplete?: string;
  halfWidth?: boolean;
  as?: "textarea";
  rows?: number;
};

export const CONTACT_FORM_FIELDS: ContactFormField[] = [
  {
    name: "name",
    controlId: "formName",
    labelKey: "name",
    placeholderKey: "name_placeholder",
    type: "text",
    autoComplete: "name",
    halfWidth: true,
  },
  {
    name: "email",
    controlId: "formEmail",
    labelKey: "email",
    placeholderKey: "email_placeholder",
    type: "email",
    autoComplete: "email",
    halfWidth: true,
  },
  {
    name: "subject",
    controlId: "formSubject",
    labelKey: "subject",
    placeholderKey: "subject_placeholder",
    type: "text",
  },
  {
    name: "message",
    controlId: "formMessage",
    labelKey: "message",
    placeholderKey: "message_placeholder",
    as: "textarea",
    rows: 5,
  },
];
