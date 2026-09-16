import {describe, expect, test} from 'vitest';
import {toIsoDatetime} from '../app/utils/toIsoDatetime';

describe('toIsoDatetime', () => {
  test('returns undefined for empty values', () => {
    expect(toIsoDatetime(null)).toBeUndefined();
    expect(toIsoDatetime(undefined)).toBeUndefined();
    expect(toIsoDatetime('')).toBeUndefined();
  });

  test('serializes a Date to ISO', () => {
    expect(toIsoDatetime(new Date('2026-09-16T00:00:00.000Z'))).toBe(
      '2026-09-16T00:00:00.000Z',
    );
  });

  test('returns undefined for invalid dates', () => {
    expect(toIsoDatetime('not-a-date')).toBeUndefined();
  });
});
