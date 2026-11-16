import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { splitLocalizedPath } from "@/shared/config/seo";
import "../styles/RouteSkeleton.css";

function TextPlaceholder() {
  return <div className="route-skeleton-copy">
    <div className="route-skeleton-bar" />
    <div className="route-skeleton-bar" />
    <div className="route-skeleton-bar" />
  </div>;
}

function ContentPlaceholder() {
  return <div className="route-skeleton-section">
    <div className="route-skeleton-bar route-skeleton-heading" />
    <TextPlaceholder />
  </div>;
}

function RouteSkeleton() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const path = splitLocalizedPath(pathname).pathname;
  const layout = path === "/project" ? "gallery"
    : path === "/contact" ? "form"
      : ["/about", "/cv"].includes(path) ? "split" : "reading";

  return (
    <div
      className={`route-skeleton route-skeleton--${layout}`}
      role="status"
      aria-live="polite"
    >
      <div className="site-container">
        <p className="route-skeleton-status">{t("a11y.loading_content")}</p>
        <div className="route-skeleton-shapes" aria-hidden="true">
          <div className="route-skeleton-header">
            <div className="route-skeleton-bar route-skeleton-title" />
            <TextPlaceholder />
          </div>
          <div className="route-skeleton-body">
            {layout === "gallery" ? [0, 1].map(index => (
              <div className="route-skeleton-project" key={index}>
                <div className="route-skeleton-cover" />
                <ContentPlaceholder />
              </div>
            )) : <>
              <div className="route-skeleton-main">
                {layout === "form" ? <div className="route-skeleton-form">
                  <div className="route-skeleton-bar route-skeleton-heading" />
                  {[0, 1, 2].map(index => <div className="route-skeleton-field" key={index}>
                    <div className="route-skeleton-bar" />
                    <div className="route-skeleton-input" />
                  </div>)}
                </div> : <><ContentPlaceholder /><ContentPlaceholder /></>}
              </div>
              {layout !== "reading" && <div className="route-skeleton-aside">
                <ContentPlaceholder />
                <ContentPlaceholder />
              </div>}
            </>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteSkeleton;
