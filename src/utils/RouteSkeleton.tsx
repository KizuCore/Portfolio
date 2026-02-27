import { useTranslation } from "react-i18next";

function RouteSkeleton() {
  const { t } = useTranslation();

  return (
    <div
      className="route-skeleton"
      role="status"
      aria-live="polite"
      aria-label={t("a11y.loading_content", { defaultValue: "Chargement du contenu" })}
    >
      <div className="route-skeleton-line route-skeleton-title skeleton-shimmer" />
      <div className="route-skeleton-line route-skeleton-subtitle skeleton-shimmer" />
      <div className="route-skeleton-grid">
        <div className="route-skeleton-card skeleton-shimmer" />
        <div className="route-skeleton-card skeleton-shimmer" />
        <div className="route-skeleton-card skeleton-shimmer" />
      </div>
      <span className="visually-hidden">
        {t("a11y.loading_content", { defaultValue: "Chargement du contenu" })}
      </span>
    </div>
  );
}

export default RouteSkeleton;
