import type { ContactFormFields } from "../components/Contact/contact.types";

export interface ContactApiPayload extends ContactFormFields {
  recaptchaToken: string;
}

export interface ContactApiResponse {
  success?: boolean;
  message?: string;
  errorCode?: string;
}

export interface ContactApiResult {
  ok: boolean;
  data: ContactApiResponse;
}

export async function sendContactEmail(payload: ContactApiPayload): Promise<ContactApiResult> {
  const response = await fetch("/api/sendEmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ContactApiResponse;

  return {
    ok: response.ok,
    data,
  };
}
