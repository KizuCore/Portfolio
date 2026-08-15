export interface ContactFormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormFieldName = keyof ContactFormFields;
export type ContactFieldErrors = Partial<Record<ContactFormFieldName, string>>;

export type ContactFormVariant = "success" | "danger";

export interface ContactFormStatus {
  variant: ContactFormVariant;
  translationKey: string;
  fallbackMessage?: string;
}
