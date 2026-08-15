import type { ContactFormFieldName } from "./contact.types";

type ContactFormField = {
  name: ContactFormFieldName;
  controlId: string;
  labelKey: string;
  placeholderKey: string;
  type?: string;
  autoComplete?: string;
  colMd?: number;
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
    colMd: 6,
  },
  {
    name: "email",
    controlId: "formEmail",
    labelKey: "email",
    placeholderKey: "email_placeholder",
    type: "email",
    autoComplete: "email",
    colMd: 6,
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
