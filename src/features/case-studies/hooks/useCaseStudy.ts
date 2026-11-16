import type fr from "@/locales/fr.json";
import { useTranslation } from "react-i18next";
import { getContentLocale, getShortLocale } from "@/shared/config/seo";
import { getBusinessLabels, getBusinessPage, getBusinessPages, getRelatedBusinessPages } from "@/content/businessPages";
import { PROJECTS } from "@/shared/data/projects";

type CaseStudySlug = "la-maree-malouine" | "les-portes-de-montafilan" | "a-table";

export function useCaseStudy(slug: CaseStudySlug) {
  const { i18n } = useTranslation();
  const path = `/realisations/${slug}`;
  const locale = getContentLocale(getShortLocale(i18n.resolvedLanguage ?? i18n.language), path);
  const dictionary = (i18n.getResourceBundle(locale, "translation") ?? i18n.getResourceBundle("fr", "translation")) as typeof fr;
  const translations = dictionary.business_pages;
  const page = getBusinessPage(path, translations);
  const project = PROJECTS.find((item) => item.caseStudyPath === `/fr${path}`);
  if (!page || !project) throw new Error(`Étude de cas introuvable : ${slug} (${locale})`);
  return {
    page,
    presentations: translations.cases,
    project,
    locale,
    labels: getBusinessLabels(translations),
    relatedPages: getRelatedBusinessPages(path, getBusinessPages(translations)),
    t: i18n.getFixedT(locale),
    section(id: string) {
      const section = page.sections.find((item) => item.id === id);
      if (!section) throw new Error(`Section d’étude de cas introuvable : ${slug}/${id} (${locale})`);
      return { ...section, id };
    },
  };
}

export type CaseStudy = ReturnType<typeof useCaseStudy>;
