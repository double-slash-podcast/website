import {describe, expect, test} from 'vitest';
import {calculateTotalValue} from '../helpers/player';

describe('test duration detail', () => {
  test('get object with detailed duration 1:08:55', () => {
    const t = calculateTotalValue(4135);
    expect(t).toMatchSnapshot();
  });

  test('get object with detailed duration 0:51:10', () => {
    const t = calculateTotalValue(3070);
    expect(t).toMatchSnapshot();
  });
});
