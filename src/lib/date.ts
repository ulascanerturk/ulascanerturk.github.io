// Date helpers for user-facing text (e.g. the profile page "last updated" line).

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Formats an ISO calendar date (`YYYY-MM-DD`) as a long Turkish date,
 * e.g. `2026-10-17` → `17 Ekim 2026`. Evaluated in UTC so the build machine's
 * time zone cannot shift the day.
 */
export function formatDate(iso: string, locale = 'tr-TR'): string {
  if (!ISO_DATE.test(iso) || Number.isNaN(Date.parse(iso))) {
    throw new RangeError(`Invalid ISO date: ${iso}`);
  }
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
