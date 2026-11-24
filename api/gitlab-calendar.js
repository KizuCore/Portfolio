import { createCalendarReader } from '../lib/gitlab/calendar.js';

const readCalendar = createCalendarReader();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const calendar = await readCalendar();
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(calendar);
  } catch {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ error: 'GitLab calendar temporarily unavailable' });
  }
}
