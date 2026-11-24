import { toGitLabActivities } from "../utils/gitlabCalendar";

export async function loadGitLabActivities(signal: AbortSignal) {
  const response = await fetch("/api/gitlab-calendar", { signal, credentials: "omit" });
  if (!response.ok) throw new Error("Calendar unavailable");
  return toGitLabActivities(await response.json());
}
