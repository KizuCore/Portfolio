import { useTranslation } from "react-i18next";

export type TimelineItem = {
  type: string;
  title: string;
  subtitle?: string;
  diplome?: string;
  date: string;
  description?: string;
  stack?: string;
};

export const useTimelineData = (): TimelineItem[] => {
  const { t } = useTranslation();

  return [
    {
      type: "T",
      title: t("experience_1_title"),
      date: t("experience_1_date"),
      subtitle: t("experience_1_subtitle"),
      description: t("experience_1_description"),
      stack: t("experience_1_stack"),
    },
    {
      type: "C",
      title: t("experience_2_title"),
      subtitle: t("experience_2_subtitle"),
      date: t("experience_2_date"),
    },
    {
      type: "C",
      title: t("experience_3_title"),
      subtitle: t("experience_3_subtitle"),
      diplome: t("experience_3_diplome"),
      date: t("experience_3_date"),
    },
    {
      type: "C",
      title: t("experience_4_title"),
      subtitle: t("experience_4_subtitle"),
      date: t("experience_4_date"),
    },
    {
      type: "C",
      title: t("experience_5_title"),
      subtitle: t("experience_5_subtitle"),
      date: t("experience_5_date"),
    },
    {
      type: "C",
      title: t("experience_6_title"),
      subtitle: t("experience_6_subtitle"),
      date: t("experience_6_date"),
    },
  ];
};
