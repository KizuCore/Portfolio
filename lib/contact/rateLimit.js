const RATE_LIMIT_WINDOW_MS = 30 * 1000;
const RATE_LIMIT_MAX_ENTRIES = 500;

const rateLimitMap = new Map();

export function isRateLimited(ip) {
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip);

  if (rateLimitMap.size > RATE_LIMIT_MAX_ENTRIES) {
    for (const [storedIp, timestamp] of rateLimitMap) {
      if (now - timestamp > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(storedIp);
      }
    }
  }

  if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return true;
  }

  rateLimitMap.set(ip, now);
  return false;
}
