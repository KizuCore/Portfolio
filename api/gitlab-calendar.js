// Only the public calendar of the portfolio owner's profile is proxied.
// No credentials or private project details are requested or returned.
const CALENDAR_URL = 'https://gitlab.com/users/Theo35000/calendar.json';
let cached = null;
let cachedAt = 0;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!cached || Date.now() - cachedAt >= 3600000) {
      const response = await fetch(CALENDAR_URL, {
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
      cached = data;
      cachedAt = Date.now();
    }
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(cached);
  } catch {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ error: 'GitLab calendar temporarily unavailable' });
  }
}
