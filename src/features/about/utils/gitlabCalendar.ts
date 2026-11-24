import type { Activity } from "react-activity-calendar";

/** GitLab omet les jours sans contribution, que le calendrier rétablit sur les douze derniers mois. */
export function toGitLabActivities(payload: unknown, today = new Date()): Activity[] {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid calendar");
  const counts = payload as Record<string, unknown>;
  for (const [date, count] of Object.entries(counts)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isSafeInteger(count) || Number(count) < 0
      || new Date(date).toISOString().slice(0, 10) !== date) throw new Error("Invalid calendar entry");
  }
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const start = new Date(end);
  start.setUTCFullYear(start.getUTCFullYear() - 1);
  start.setUTCDate(start.getUTCDate() + 1);
  const activities: Activity[] = [];
  for (const day = new Date(start); day <= end; day.setUTCDate(day.getUTCDate() + 1)) {
    const date = day.toISOString().slice(0, 10);
    const count = Number(counts[date] ?? 0);
    // La couleur correspond à une tranche de contributions quotidiennes, toutes activités GitLab confondues.
    const level = count === 0 ? 0 : count <= 9 ? 1 : count <= 19 ? 2 : count <= 29 ? 3 : 4;
    activities.push({ date, count, level });
  }
  return activities;
}
