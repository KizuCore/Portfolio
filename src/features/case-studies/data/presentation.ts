import type fr from "@/locales/fr.json";


// La page choisit son projet ; ce module résout uniquement la rédaction dans la langue active.
export function getCasePresentations(cases: typeof fr.business_pages.cases) {
  return {
    "a-table": cases["a-table"].presentation,
    "les-portes-de-montafilan": cases["les-portes-de-montafilan"].presentation,
  };
}
