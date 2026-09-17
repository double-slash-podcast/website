import {describe, expect, test} from 'vitest';
import {buildDensitySrcset, toPx} from '../app/utils/appImg';

describe('toPx', () => {
  test('parses numbers and px strings', () => {
    expect(toPx(200)).toBe(200);
    expect(toPx('160px')).toBe(160);
    expect(toPx('')).toBeUndefined();
    expect(toPx(undefined)).toBeUndefined();
  });
});

describe('buildDensitySrcset', () => {
  test('emits NuxtImg-like 1x and 2x URLs when width is set', () => {
    const srcset = buildDensitySrcset(
      (width, height) => `img-${width}x${height ?? 0}`,
      100,
      80,
    );

    expect(srcset).toBe('img-100x80 1x, img-200x160 2x');
  });

  test('returns undefined without a width so <img> can omit srcset', () => {
    expect(buildDensitySrcset(() => 'x')).toBeUndefined();
  });
});
