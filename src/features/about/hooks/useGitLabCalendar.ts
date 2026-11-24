import { useEffect, useState } from "react";
import type { Activity } from "react-activity-calendar";
import { loadGitLabActivities } from "../api/gitlabCalendar";

type CalendarState =
  | { status: "loading" | "error" }
  | { status: "ready"; data: Activity[] };

export function useGitLabCalendar() {
  const [state, setState] = useState<CalendarState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    let active = true;
    loadGitLabActivities(controller.signal)
      .then((data) => { if (active) setState({ status: "ready", data }); })
      .catch(() => { if (active) setState({ status: "error" }); })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [attempt]);

  function retry() {
    setState({ status: "loading" });
    setAttempt((value) => value + 1);
  }
  return { state, retry };
}
