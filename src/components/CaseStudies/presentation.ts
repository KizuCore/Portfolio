import fr from "../../locales/fr.json";
import en from "../../locales/en.json";
import bzh from "../../locales/bzh.json";

// La page choisit son projet ; ce module résout uniquement la rédaction dans la langue active.
export function getCasePresentations(locale: string) {
  const translations = { fr, en, bzh };
  const cases = (translations[locale as keyof typeof translations] ?? fr).business_pages.cases;
  return {
    "a-table": cases["a-table"].presentation,
    "les-portes-de-montafilan": cases["les-portes-de-montafilan"].presentation,
  };
}
