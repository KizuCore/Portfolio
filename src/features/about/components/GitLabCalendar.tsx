import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ActivityCalendar, { type Activity, type Props } from "react-activity-calendar";
import { toGitLabActivities } from "../utils/gitlabCalendar";

export default function GitLabCalendar(props: Omit<Props, "data">) {
  const { t } = useTranslation();
  const [data, setData] = useState<Activity[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    let disposed = false;
    setFailed(false);
    void fetch("/api/gitlab-calendar", { signal: controller.signal, credentials: "omit" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Calendar unavailable");
        return toGitLabActivities(await response.json());
      })
      .then((activities) => { if (!disposed) setData(activities); })
      .catch(() => { if (!disposed) setFailed(true); })
      .finally(() => window.clearTimeout(timeout));
    return () => { disposed = true; controller.abort(); window.clearTimeout(timeout); };
  }, [attempt]);

  if (failed) return <div className="code-activity-error" role="status">
    <p>{t("code_activity.unavailable")}</p>
    <button type="button" onClick={() => setAttempt((value) => value + 1)}>{t("code_activity.retry")}</button>
  </div>;
  return <div aria-busy={!data}>
    {!data && <span className="sr-only" role="status">{t("a11y.loading_content")}</span>}
    <ActivityCalendar {...props} data={data ?? []} loading={!data} />
  </div>;
}
