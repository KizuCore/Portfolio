import type fr from "@/locales/fr.json";


// La rédaction propre à cette présentation reste traduite, sans alourdir le modèle des autres projets.
export function getMareePresentation(cases: typeof fr.business_pages.cases) {
  return cases["la-maree-malouine"].presentation;
}

export type MareePresentation = ReturnType<typeof getMareePresentation>;
