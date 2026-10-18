import { useTranslation } from "react-i18next";
import { getContentLocale, getShortLocale } from "../../config/seo";
import { getBusinessLabels, getBusinessPage, getBusinessPages } from "../../data/businessPages";
import { PROJECTS } from "../Projects/data/projects";

type CaseStudySlug = "la-maree-malouine" | "les-portes-de-montafilan" | "a-table";

export function useCaseStudy(slug: CaseStudySlug) {
  const { i18n } = useTranslation();
  const path = `/realisations/${slug}`;
  const locale = getContentLocale(getShortLocale(i18n.resolvedLanguage ?? i18n.language), path);
  const page = getBusinessPage(path, locale);
  const project = PROJECTS.find((item) => item.caseStudyPath === `/fr${path}`);
  if (!page || !project) throw new Error(`Étude de cas introuvable : ${slug} (${locale})`);
  return {
    page,
    project,
    locale,
    labels: getBusinessLabels(locale),
    relatedCases: getBusinessPages(locale).filter((item) => item.kind === "case-study" && item.path !== path),
    t: i18n.getFixedT(locale),
    section(id: string) {
      const section = page.sections.find((item) => item.id === id);
      if (!section) throw new Error(`Section d’étude de cas introuvable : ${slug}/${id} (${locale})`);
      return { ...section, id };
    },
  };
}

export type CaseStudy = ReturnType<typeof useCaseStudy>;
