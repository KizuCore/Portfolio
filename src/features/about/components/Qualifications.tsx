import type { JSX } from "react";
import type { TFunction } from "i18next";
import { FaGraduationCap } from "@react-icons/all-files/fa/FaGraduationCap";

export default function Qualifications({ t }: { t: TFunction }): JSX.Element {
  const degrees = [
    { key: 'degree5', date: '2024 — 2026', field: 'Full-Stack · RNCP 7', href: 'https://www.francecompetences.fr/recherche/RNCP/40150/' },
    { key: 'degree2', date: '2023 — 2024', field: 'Web · MyDigitalSchool', href: 'https://www.mydigitalschool.com/bachelor-1-2-web' },
    { key: 'degree1', date: '2020 — 2023', field: t('about_interactions.computing') + ' · ISTIC', href: 'https://istic.univ-rennes.fr/licence-informatique-parcours-informatique' },
    { key: 'degree3', date: 'RNCP', field: t('about_interactions.applications'), href: 'https://www.francecompetences.fr/recherche/rncp/37873/' },
    { key: 'degree4', date: 'ANSSI', field: t('about_interactions.security'), href: 'https://cyber.gouv.fr/offre-de-service/formations-entrainement-et-decouverte-des-metiers/formations/formations-delivrees-par-lanssi/mooc-secnumacademie/' },
  ];
  return <ul className="profile-degree-grid">{degrees.map(({ key, date, field, href }) => <li key={key}>
    <a className="profile-degree-card" href={href} target="_blank" rel="noopener noreferrer">
      <span className="profile-degree-meta"><span>{date}</span><FaGraduationCap aria-hidden="true" /></span>
      <strong>{t(key)}</strong><span className="profile-degree-field">{field}<span aria-hidden="true">↗</span></span>
    </a>
  </li>)}</ul>;
}
