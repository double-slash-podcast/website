import {describe, expect, test} from 'vitest';
import {
  isValidDuration,
  isValidFileSize,
  parseMediaNumber,
} from '../app/utils/mediaMeta';

describe('parseMediaNumber', () => {
  test('parses positive integers', () => {
    expect(parseMediaNumber(3375)).toBe(3375);
    expect(parseMediaNumber('5724')).toBe(5724);
  });

  test('strips unicode whitespace', () => {
    expect(parseMediaNumber('2\u202f627')).toBe(2627);
    expect(parseMediaNumber('3 375')).toBe(3375);
  });

  test('rejects invalid values', () => {
    expect(parseMediaNumber(undefined)).toBeUndefined();
    expect(parseMediaNumber(null)).toBeUndefined();
    expect(parseMediaNumber('')).toBeUndefined();
    expect(parseMediaNumber('xxxx')).toBeUndefined();
    expect(parseMediaNumber(0)).toBeUndefined();
    expect(parseMediaNumber(-1)).toBeUndefined();
  });
});

describe('isValidDuration', () => {
  test('accepts valid durations', () => {
    expect(isValidDuration(4135)).toBe(true);
    expect(isValidDuration('3012')).toBe(true);
  });

  test('rejects invalid durations', () => {
    expect(isValidDuration('xxxx')).toBe(false);
    expect(isValidDuration('')).toBe(false);
  });
});

describe('isValidFileSize', () => {
  test('accepts valid file sizes', () => {
    expect(isValidFileSize(54321012)).toBe(true);
    expect(isValidFileSize('12345678')).toBe(true);
  });

  test('rejects invalid file sizes', () => {
    expect(isValidFileSize('')).toBe(false);
    expect(isValidFileSize('unknown')).toBe(false);
  });
});
