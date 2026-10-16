import { describe, expect, it } from 'vitest';

import { formatDate } from './date';

describe('formatDate', () => {
  it('formats an ISO date as a long Turkish date', () => {
    expect(formatDate('2026-10-17')).toBe('17 Ekim 2026');
    expect(formatDate('2018-01-01')).toBe('1 Ocak 2018');
  });

  it('does not shift the day across time zones', () => {
    expect(formatDate('2026-12-31')).toBe('31 Aralık 2026');
  });

  it('supports another locale', () => {
    expect(formatDate('2026-10-17', 'en-GB')).toBe('17 October 2026');
  });

  it('rejects values that are not ISO calendar dates', () => {
    expect(() => formatDate('17.10.2026')).toThrow(RangeError);
    expect(() => formatDate('2026-13-01')).toThrow(RangeError);
    expect(() => formatDate('')).toThrow(RangeError);
  });
});
