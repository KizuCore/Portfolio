import fr from "../../../locales/fr.json";
import en from "../../../locales/en.json";
import bzh from "../../../locales/bzh.json";

// La rédaction propre à cette présentation reste traduite, sans alourdir le modèle des autres projets.
export function getMareePresentation(locale: string) {
  const translations = { fr, en, bzh };
  return (translations[locale as keyof typeof translations] ?? fr).business_pages.cases["la-maree-malouine"].presentation;
}

export type MareePresentation = ReturnType<typeof getMareePresentation>;
