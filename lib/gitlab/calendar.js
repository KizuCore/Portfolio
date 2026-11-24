const calendarUrl = 'https://gitlab.com/users/Theo35000/calendar.json';
const cacheDuration = 60 * 60 * 1000;

async function fetchPublicCalendar() {
  const response = await fetch(calendarUrl, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error('GitLab unavailable');
  const data = await response.json();
  if (!data || typeof data !== 'object' || Array.isArray(data)
    || !Object.entries(data).every(([date, count]) =>
      /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isSafeInteger(count) && count >= 0)) {
    throw new Error('Invalid GitLab calendar');
  }
  return data;
}

export function createCalendarReader() {
  let cached = null;
  let cachedAt = 0;
  return async function readCalendar() {
    if (!cached || Date.now() - cachedAt >= cacheDuration) {
      cached = await fetchPublicCalendar();
      cachedAt = Date.now();
    }
    return cached;
  };
}
