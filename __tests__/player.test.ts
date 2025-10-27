import { describe, expect, test } from 'vitest';
import { useCalculateTotalValue } from '../app/composables/useCalculateTotalValue';

describe('test duration detail', () => {
  test('get object with detailed duration 1:08:55', () => {
    const t = useCalculateTotalValue(4135);
    expect(t).toMatchSnapshot();
  });

  test('get object with detailed duration 0:51:10', () => {
    const t = useCalculateTotalValue(3070);
    expect(t).toMatchSnapshot();
  });
});
