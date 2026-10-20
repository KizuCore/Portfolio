import type fr from "../../locales/fr.json";
import i18n from "../../i18n";

// La page choisit son projet ; ce module résout uniquement la rédaction dans la langue active.
export function getCasePresentations(locale: string) {
  const translations = (i18n.getResourceBundle(locale, "translation") ?? i18n.getResourceBundle("fr", "translation")) as typeof fr;
  const cases = translations.business_pages.cases;
  return {
    "a-table": cases["a-table"].presentation,
    "les-portes-de-montafilan": cases["les-portes-de-montafilan"].presentation,
  };
}
