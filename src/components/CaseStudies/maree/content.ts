import type fr from "../../../locales/fr.json";
import i18n from "../../../i18n";

// La rédaction propre à cette présentation reste traduite, sans alourdir le modèle des autres projets.
export function getMareePresentation(locale: string) {
  const translations = (i18n.getResourceBundle(locale, "translation") ?? i18n.getResourceBundle("fr", "translation")) as typeof fr;
  return translations.business_pages.cases["la-maree-malouine"].presentation;
}

export type MareePresentation = ReturnType<typeof getMareePresentation>;
