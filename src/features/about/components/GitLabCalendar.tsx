import { useTranslation } from "react-i18next";
import ActivityCalendar, { type Props } from "react-activity-calendar";
import { useGitLabCalendar } from "../hooks/useGitLabCalendar";

export default function GitLabCalendar(props: Omit<Props, "data">) {
  const { t } = useTranslation();
  const { state, retry } = useGitLabCalendar();

  if (state.status === "error") {
    return <div className="code-activity-error" role="status">
      <p>{t("code_activity.unavailable")}</p>
      <button type="button" onClick={retry}>{t("code_activity.retry")}</button>
    </div>;
  }

  const loading = state.status === "loading";
  return <div aria-busy={loading}>
    {loading && <span className="sr-only" role="status">{t("a11y.loading_content")}</span>}
    <ActivityCalendar {...props} data={state.status === "ready" ? state.data : []} loading={loading} />
  </div>;
}
